package main

import (
	"context"
	"fmt"
	"html/template"
	"net/http"
	"personal-web/connection"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

// First letter have uppercase for easily accesed by another package
type Blog struct {
	ID         int
	Title      string
	Content    string
	Author     string
	StartPost  time.Time
	EndPost    time.Time
	Image      string
	Duration   string
	NodeJs     bool
	ReactJs    bool
	NextJs     bool
	TypeScript bool
}
type User struct {
	Id         int
	Username   string
	Email      string
	HashPasswd string
	Experience []string
	Year       []string
}

type userSession struct {
	Sessions bool
	Username string
}

// var used for global/ outside function
var userLogged = userSession{}

// var used for global/ outside function
var dataBlogs = []Blog{}

func main() {
	e := echo.New()
	e.Static("/assets", "assets")
	e.Static("/css", "css")
	e.Static("/script", "script")

	e.Use(session.Middleware(sessions.NewCookieStore([]byte("secret"))))
	connection.DbConnect()

	e.GET("/", homePage)
	e.GET("/contact", contactPage)
	e.GET("/project", addPost)
	e.GET("/testimonial", testimonialPage)
	e.GET("/blog-detail/:id", blogDetail)
	e.GET("/blogs", viewBlog)
	e.GET("/edit-blog/:id", editBlog)
	e.GET("/registration", registForm)
	e.GET("/login", loginForm)

	e.POST("/add-post", addBlog)
	e.POST("/delete-blog/:id", deleteBlog)
	e.POST("/update-blog/:id", updateBlog)
	e.POST("/register", inputRegist)
	e.POST("/sign-in", signIn)
	e.POST("/logout", logOut)

	e.HTTPErrorHandler = func(err error, c echo.Context) {
		report, _ := err.(*echo.HTTPError)
		if report.Code == http.StatusNotFound {
			tmpl, _ := template.ParseFiles("pages/404.html")
			tmpl.Execute(c.Response(), nil)
		}
	}

	e.Logger.Fatal(e.Start("localhost:1142"))
}

// Note : You can remove some fmt.Println function if all progress clear

func homePage(c echo.Context) error {
	tmpl, err := template.ParseFiles("bootstrap/index.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	//For viewing from database into homepage

	rows, errQuery := connection.Conn.Query(context.Background(), `SELECT id, title, content, author, start_post, end_post, image, duration, nodejs, reactjs, nextjs, typescript
	FROM public.db_posts;`)
	if errQuery != nil {
		fmt.Println("Error getting data", errQuery)
		return c.JSON(http.StatusInternalServerError, errQuery.Error())
	}

	var dataBlogs []Blog
	for rows.Next() {
		var each Blog
		err := rows.Scan(&each.ID, &each.Title, &each.Content, &each.Author, &each.StartPost, &each.EndPost, &each.Image, &each.Duration, &each.NodeJs, &each.ReactJs, &each.NextJs, &each.TypeScript)
		if err != nil {
			fmt.Println("Error scanning data", err)
			return c.JSON(http.StatusInternalServerError, err.Error())
		}
		dataBlogs = append(dataBlogs, each)
	}

	session, errSess := session.Get("session", c)
	userLogged := session.Values["username"] != nil

	if errSess != nil {
		return c.JSON(http.StatusInternalServerError, errSess.Error())
	}

	flash := map[string]interface{}{
		"FlashMessage": session.Values["message"],
		"FlashStatus":  session.Values["status"],
	}

	delete(session.Values, "message")
	delete(session.Values, "status")
	session.Save(c.Request(), c.Response())

	data := map[string]interface{}{
		"Blogs":  dataBlogs,
		"Alert":  flash,
		"Logged": userLogged,
	}
	return tmpl.Execute(c.Response(), data)
}

func contactPage(c echo.Context) error {
	tmpl, err := template.ParseFiles("bootstrap/contact.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	session, errSess := session.Get("session", c)
	userLogged := session.Values["username"] != nil

	if errSess != nil {
		return c.JSON(http.StatusInternalServerError, errSess.Error())
	}

	data := map[string]interface{}{
		"Logged": userLogged,
	}

	return tmpl.Execute(c.Response(), data)
}

func addPost(c echo.Context) error {
	tmpl, err := template.ParseFiles("pages/project.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	data := map[string]interface{}{
		"Blogs": dataBlogs,
	}

	return tmpl.Execute(c.Response(), data)
}

func testimonialPage(c echo.Context) error {
	tmpl, err := template.ParseFiles("pages/testimoni.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), nil)
}

func blogDetail(c echo.Context) error {
	id := c.Param("id")

	tmpl, err := template.ParseFiles("pages/blog-detail.html")

	if err != nil {
		fmt.Println("Error template for detial blog")
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	idToInt, _ := strconv.Atoi(id)

	blogDetail := Blog{}

	errQuery := connection.Conn.QueryRow(context.Background(), `SELECT id, title, content, author, start_post, end_post, image, duration, nodejs, reactjs, nextjs, typescript
	FROM public.db_posts WHERE id=$1`, idToInt).Scan(&blogDetail.ID, &blogDetail.Title, &blogDetail.Content, &blogDetail.Author, &blogDetail.StartPost, &blogDetail.EndPost, &blogDetail.Image, &blogDetail.Duration, &blogDetail.NodeJs, &blogDetail.ReactJs, &blogDetail.NextJs, &blogDetail.TypeScript)

	fmt.Println(errQuery)

	data := map[string]interface{}{
		"Id":   id,
		"Blog": blogDetail,
	}

	return tmpl.Execute(c.Response(), data)
}

func viewBlog(c echo.Context) error {
	tmpl, err := template.ParseFiles("bootstrap/blogs-rn.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	rows, errQuery := connection.Conn.Query(context.Background(), `SELECT id, title, content, author, start_post, end_post, image, duration, nodejs, reactjs, nextjs, typescript
		FROM public.db_posts;`)
	if errQuery != nil {
		fmt.Println("Error getting data", errQuery)
		return c.JSON(http.StatusInternalServerError, errQuery.Error())
	}

	session, errSess := session.Get("session", c)
	userLogged := session.Values["username"] != nil

	if errSess != nil {
		return c.JSON(http.StatusInternalServerError, errSess.Error())
	}

	var blogs []Blog
	for rows.Next() {
		var each Blog
		err := rows.Scan(&each.ID, &each.Title, &each.Content, &each.Author, &each.StartPost, &each.EndPost, &each.Image, &each.Duration, &each.NodeJs, &each.ReactJs, &each.NextJs, &each.TypeScript)
		if err != nil {
			fmt.Println("Error scanning data", err)
			return c.JSON(http.StatusInternalServerError, err.Error())
		}
		blogs = append(blogs, each)
	}

	data := map[string]interface{}{
		"Blogs":  blogs,
		"Logged": userLogged,
	}

	return tmpl.Execute(c.Response(), data)
}

func addBlog(c echo.Context) error {
	title := c.FormValue("projectName")
	content := c.FormValue("konten")
	startDate := c.FormValue("startDate")
	endDate := c.FormValue("endDate")
	nodeJs := c.FormValue("nodeJs") == "on"
	reactJs := c.FormValue("reactJs") == "on"
	nextJs := c.FormValue("nextJs") == "on"
	typeScript := c.FormValue("typeScript") == "on"

	tstart, err := time.Parse("2006-01-02", startDate)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid date format")
	}

	tend, err := time.Parse("2006-01-02", endDate)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid date format")
	}

	duration := countDate(tstart, tend)

	fmt.Println("projectName", title)
	fmt.Println("startDate", startDate)
	fmt.Println("endDate", endDate)
	fmt.Println("konten", content)
	fmt.Println(duration)
	fmt.Println("nodeJs", nodeJs)
	fmt.Println("reactJs", reactJs)
	fmt.Println("nextJs", nextJs)
	fmt.Println("typeScript", typeScript)

	added, err := connection.Conn.Exec(context.Background(), `
		INSERT INTO public.db_posts (
			title, content, author, start_post, end_post, image, duration, nodejs, reactjs, nextjs, typescript
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
	`, title, content, "Wahyu Zero", tstart, tend, "assets/404.jpg", duration, nodeJs, reactJs, nextJs, typeScript)

	fmt.Println(added)

	if err != nil {
		fmt.Println("Can't add row")
		return c.JSON(http.StatusInternalServerError, "Error adding row")
	}

	return c.Redirect(http.StatusMovedPermanently, "/blogs")
}

func deleteBlog(c echo.Context) error {
	idData := c.Param("id")
	id, err := strconv.Atoi(idData)
	if err != nil {
		fmt.Println("Error getting ID")
		return c.JSON(http.StatusBadRequest, "Invalid ID")
	}

	_, err = connection.Conn.Exec(context.Background(), `
		DELETE FROM public.db_posts WHERE id = $1
	`, id)
	if err != nil {
		fmt.Println("Can't delete row:", err.Error())
		return c.JSON(http.StatusInternalServerError, "Error deleting blog")
	}

	return c.Redirect(http.StatusMovedPermanently, "/blogs")
}

func editBlog(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		fmt.Println("Error getting ID (Edit)")
		return c.Redirect(http.StatusMovedPermanently, "/")
	}

	tmpl, err := template.ParseFiles("pages/edit-blog.html")
	if err != nil {
		fmt.Println("Template page error")
		return c.JSON(http.StatusInternalServerError, "Error rendering page")
	}

	if err != nil {
		fmt.Println("Error getting ID (Edit)")
		return c.JSON(http.StatusBadRequest, "Invalid ID")
	}

	var blog = Blog{}
	err = connection.Conn.QueryRow(context.Background(), `
		SELECT id, title, content, author, start_post, end_post, image, duration, nodejs, reactjs, nextjs, typescript
		FROM public.db_posts WHERE id=$1`, id).Scan(&blog.ID, &blog.Title, &blog.Content, &blog.Author, &blog.StartPost, &blog.EndPost, &blog.Image, &blog.Duration, &blog.NodeJs, &blog.ReactJs, &blog.NextJs, &blog.TypeScript)
	if err != nil {
		fmt.Println("Error getting row data:", err.Error())
		return c.JSON(http.StatusInternalServerError, "Error getting row data")
	}

	session, errSess := session.Get("session", c)
	userLogged := session.Values["username"] != nil

	if errSess != nil {
		return c.JSON(http.StatusInternalServerError, errSess.Error())
	}
	data := map[string]interface{}{
		// "id":   id,
		"blog":   blog,
		"Logged": userLogged,
	}

	return tmpl.Execute(c.Response(), data)
}

func updateBlog(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		fmt.Println("Error getting ID (Update)")
		return c.JSON(http.StatusBadRequest, "Invalid ID")
	}

	title := c.FormValue("projectName")
	content := c.FormValue("konten")
	startDate := c.FormValue("startDate")
	endDate := c.FormValue("endDate")
	nodeJs := c.FormValue("nodeJs") != ""
	reactJs := c.FormValue("reactJs") != ""
	nextJs := c.FormValue("nextJs") != ""
	typeScript := c.FormValue("typeScript") != ""
	// Image := "assets/404.jpg"

	fmt.Println("startDate", startDate)
	fmt.Println("endDate", endDate)
	fmt.Println("nodeJs", nodeJs)
	fmt.Println("reactJs", reactJs)
	fmt.Println("nextJs", nextJs)
	fmt.Println("typeScript", typeScript)

	tstart, err := time.Parse("2006-01-02", startDate)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid date format")
	}

	tend, err := time.Parse("2006-01-02", endDate)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid date format")
	}

	duration := countDate(tstart, tend)

	_, err = connection.Conn.Exec(context.Background(), `
    UPDATE public.db_posts SET title=$2, content=$3, start_post=$4, end_post=$5, duration=$6, nodejs=$7, reactjs=$8, nextjs=$9, typescript=$10
    WHERE id=$1
`, id, title, content, tstart.Format("2006-01-02"), tend.Format("2006-01-02"), duration, nodeJs, reactJs, nextJs, typeScript)

	if err != nil {
		fmt.Println("Cannot update data into row:", err.Error())
		return c.JSON(http.StatusInternalServerError, "Error updating row")
	}
	fmt.Println("Row Updated")

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func countDate(startdate time.Time, enddate time.Time) string {
	difference := enddate.Sub(startdate)
	years := int(difference.Hours() / (24 * 365))
	months := int(difference.Hours() / (24 * 30))
	weeks := int(difference.Hours() / (24 * 7))
	days := int(difference.Hours()/24 + 1)
	if years >= 1 {
		return strconv.Itoa(years) + " years"
	} else if months >= 1 {
		return strconv.Itoa(months) + " months"
	} else if weeks >= 1 {
		return strconv.Itoa(weeks) + " weeks"
	}
	return strconv.Itoa(days) + " days"
}
func registForm(c echo.Context) error {
	tmpl, err := template.ParseFiles("bootstrap/regist.html")

	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
	}

	session, errSess := session.Get("session", c)
	if errSess != nil {
		return c.JSON(http.StatusInternalServerError, errSess.Error())
	}
	flash := map[string]interface{}{
		"FlashMessage": session.Values["message"],
		"FlashStatus":  session.Values["status"],
	}

	delete(session.Values, "message")
	delete(session.Values, "status")
	session.Save(c.Request(), c.Response())

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), flash)
}

func inputRegist(c echo.Context) error {
	Username := c.FormValue("Username")
	Email := c.FormValue("Email")
	Password := c.FormValue("Password")
	passHash, err := bcrypt.GenerateFromPassword([]byte(Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("Error generating password hash:", err)
		return c.JSON(http.StatusInternalServerError, "Error registering user")
	}
	fmt.Println(Username, Email, Password)
	user, err := connection.Conn.Exec(context.Background(), `
        INSERT INTO public.db_user(username, email, password)
        VALUES ($1, $2, $3);`, Username, Email, passHash)

	fmt.Println("Affected rows", user.RowsAffected())

	if err != nil {
		fmt.Println("Cannot insert new user")
		return c.JSON(http.StatusInternalServerError, "Error adding user")
	}

	session, errSession := session.Get("session", c)
	if errSession != nil {
		return c.JSON(http.StatusInternalServerError, errSession.Error())
	}
	session.Values["message"] = "Succesfuly Registred!"
	session.Values["color"] = true
	session.Save(c.Request(), c.Response())
	if err != nil {
		return redirMessage(c, "Registration Failed!", false, "/registration")
	}

	return redirMessage(c, "Successfully Registered!", true, "/login")
}

func loginForm(c echo.Context) error {
	tmpl, err := template.ParseFiles("bootstrap/login.html")

	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
	}

	// Prevent who already login to access this page
	sess, _ := session.Get("session", c)

	if sess.Values["Sessions"] == true {
		return c.Redirect(http.StatusMovedPermanently, "/")
	}

	session, errSess := session.Get("session", c)
	if errSess != nil {
		return c.JSON(http.StatusInternalServerError, errSess.Error())
	}
	flash := map[string]interface{}{
		"FlashMessage": session.Values["message"],
		"FlashStatus":  session.Values["status"],
	}

	delete(session.Values, "message")
	delete(session.Values, "status")
	session.Save(c.Request(), c.Response())

	return tmpl.Execute(c.Response(), flash)
}

func signIn(c echo.Context) error {
	UserOrEmail := c.FormValue("Username")
	Password := c.FormValue("Password")

	identy := User{}

	fmt.Println(UserOrEmail, Password)

	// For email and username checking
	var userOrEmail bool
	if strings.Contains(UserOrEmail, "@") {
		userOrEmail = true
	}

	var err error
	if userOrEmail {
		err = connection.Conn.QueryRow(context.Background(), "SELECT id, username, email, password FROM db_user WHERE email=$1", UserOrEmail).Scan(&identy.Id, &identy.Username, &identy.Email, &identy.HashPasswd)
	} else {
		err = connection.Conn.QueryRow(context.Background(), "SELECT id, username, email, password FROM db_user WHERE username=$1", UserOrEmail).Scan(&identy.Id, &identy.Username, &identy.Email, &identy.HashPasswd)
	}

	if err != nil {
		fmt.Println("Can't login")
	}

	passErr := bcrypt.CompareHashAndPassword([]byte(identy.HashPasswd), []byte(Password))
	if passErr != nil {
		fmt.Println("Password does not match!")
		return redirMessage(c, "Invalid username or password!", false, "/login")
	}

	sess, _ := session.Get("session", c)
	sess.Options.MaxAge = 172800 // Expired time in second
	sess.Values["message"] = "Login success!"
	sess.Values["status"] = true
	sess.Values["username"] = identy.Username
	sess.Values["email"] = identy.Email
	sess.Values["id"] = identy.Id
	sess.Values["Sessions"] = true
	sess.Save(c.Request(), c.Response())

	return redirMessage(c, "Successfully logged in!", true, "/")
}

func logOut(c echo.Context) error {
	sess, _ := session.Get("session", c)
	sess.Options.MaxAge = -1 // Remove session
	sess.Save(c.Request(), c.Response())

	return redirMessage(c, "You logged out!", true, "/")
}

func redirMessage(c echo.Context, message string, status bool, redirPath string) error {
	session, errSession := session.Get("session", c)

	if errSession != nil {
		return c.JSON(http.StatusInternalServerError, errSession.Error())
	}

	session.Values["message"] = message
	session.Values["status"] = status
	session.Save(c.Request(), c.Response())
	return c.Redirect(http.StatusMovedPermanently, redirPath)
}
