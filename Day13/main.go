package main

import (
	"context"
	"fmt"
	"html/template"
	"net/http"
	"personal-web/connection"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
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

// var used for global/ outside function
var dataBlogs = []Blog{}

func main() {
	e := echo.New()
	e.Static("/assets", "assets")
	e.Static("/css", "css")
	e.Static("/script", "script")
	connection.DbConnect()

	e.GET("/", homePage)
	e.GET("/contact", contactPage)
	e.GET("/project", blogPage)
	e.GET("/testimonial", testimonialPage)
	e.GET("/blog-detail/:id", blogDetail)
	e.GET("/blogs", viewBlog)
	e.GET("/edit-blog/:id", editBlog)

	e.POST("/add-post", addBlog)
	e.POST("/delete-blog/:id", deleteBlog)
	e.POST("/update-blog/", updateBlog)
	e.HTTPErrorHandler = func(err error, c echo.Context) {
		report, _ := err.(*echo.HTTPError)
		if report.Code == http.StatusNotFound {
			tmpl, _ := template.ParseFiles("pages/404.html")
			tmpl.Execute(c.Response(), nil)
		}
	}

	e.Logger.Fatal(e.Start("localhost:1142"))
}

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

	data := map[string]interface{}{
		"Blogs": dataBlogs,
	}
	return tmpl.Execute(c.Response(), data)
}

func contactPage(c echo.Context) error {
	tmpl, err := template.ParseFiles("bootstrap/contact.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), nil)
}

func blogPage(c echo.Context) error {
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

// Still error, don't go to this page. on console shows "memory address error"
// Maybe problem is coming from blog-detail.html but i'm very dizzy and go to sleep so i will fix this later

func blogDetail(c echo.Context) error {
	id := c.Param("id")

	tmpl, err := template.ParseFiles("pages/blog-detail.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	// rows, errQuery := connection.Conn.Query(context.Background(), `SELECT id, title, content, author, start_post, end_post, image, duration, nodejs, reactjs, nextjs, typescript
	// FROM public.db_posts;`)
	// if errQuery != nil {
	// 	fmt.Println("Error getting data", errQuery)
	// 	return c.JSON(http.StatusInternalServerError, errQuery.Error())
	// }

	// var dataBlogs []Blog
	// for rows.Next() {
	// 	var each Blog
	// 	err := rows.Scan(&each.ID, &each.Title, &each.Content, &each.Author, &each.StartPost, &each.EndPost, &each.Image, &each.Duration, &each.NodeJs, &each.ReactJs, &each.NextJs, &each.TypeScript)
	// 	if err != nil {
	// 		fmt.Println("Error scanning data", err)
	// 		return c.JSON(http.StatusInternalServerError, err.Error())
	// 	}
	// 	dataBlogs = append(dataBlogs, each)
	// }

	idToInt, _ := strconv.Atoi(id)

	blogDetail := Blog{}

	for index, data := range dataBlogs {
		if index == idToInt {
			blogDetail = Blog{
				ID:         data.ID,
				Title:      data.Title,
				Content:    data.Content,
				Author:     data.Author,
				StartPost:  data.StartPost,
				EndPost:    data.EndPost,
				Image:      data.Image,
				Duration:   data.Duration,
				NodeJs:     data.NodeJs,
				ReactJs:    data.ReactJs,
				NextJs:     data.NextJs,
				TypeScript: data.TypeScript,
			}
		}
	}

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
		"Blogs": blogs,
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

	tstart, _ := time.Parse("2006-01-02", startDate)
	tend, _ := time.Parse("2006-01-02", endDate)
	duration := coutDate(tstart, tend)

	fmt.Println("projectName", title)
	fmt.Println("startDate", startDate)
	fmt.Println("endDate", endDate)
	fmt.Println("konten", content)
	fmt.Println("nodeJs", nodeJs)
	fmt.Println("reactJs", reactJs)
	fmt.Println("nextJs", nextJs)
	fmt.Println("typeScript", typeScript)

	// Create a new blog post
	newBlog := Blog{
		Title:     title,
		Author:    "Wahyu Zero",
		Content:   content,
		StartPost: tstart,
		EndPost:   tend,
		Duration:  duration,
		// Dummy image
		Image:      "/assets/404.jpg",
		NodeJs:     nodeJs,
		ReactJs:    reactJs,
		NextJs:     nextJs,
		TypeScript: typeScript,
	}

	// Append the new blog to the dataBlogs slice
	dataBlogs = append(dataBlogs, newBlog)

	return c.Redirect(http.StatusMovedPermanently, "/blogs")
}

func deleteBlog(c echo.Context) error {
	indexStr := c.Param("index")
	index, _ := strconv.Atoi(indexStr)

	dataBlogs = append(dataBlogs[:index], dataBlogs[index+1:]...)

	return c.Redirect(http.StatusMovedPermanently, "/blogs")
}

// Not working yet
func editBlog(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id")) // Read id from exiting data
	BlogUpdate := Blog{}
	for i, data := range dataBlogs {
		if id == i {

			BlogUpdate = Blog{
				Title:      data.Title,
				StartPost:  data.StartPost,
				EndPost:    data.EndPost,
				Content:    data.Content,
				Author:     data.Author,
				Image:      data.Image,
				NodeJs:     data.NodeJs,
				ReactJs:    data.ReactJs,
				NextJs:     data.NextJs,
				TypeScript: data.TypeScript,
			}
		}
	}
	data := map[string]interface{}{
		"Blog": BlogUpdate,
	}
	tmpl, error := template.ParseFiles("pages/edit-blog.html")
	if error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Cannot Founding Post!"})
	}

	return tmpl.Execute(c.Response(), data)

}
func updateBlog(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	title := c.FormValue("projectName")
	content := c.FormValue("konten")
	startDate := c.FormValue("startDate")
	endDate := c.FormValue("endDate")
	nodeJs := c.FormValue("nodeJs") == "on"
	reactJs := c.FormValue("reactJs") == "on"
	nextJs := c.FormValue("nextJs") == "on"
	typeScript := c.FormValue("typeScript") == "on"

	tstart, _ := time.Parse("2006-01-02", startDate)
	tend, _ := time.Parse("2006-01-02", endDate)
	duration := coutDate(tstart, tend)

	dataBlogs[id].Title = title
	dataBlogs[id].Content = content
	dataBlogs[id].StartPost = tstart
	dataBlogs[id].EndPost = tend
	dataBlogs[id].Duration = duration
	dataBlogs[id].NodeJs = nodeJs
	dataBlogs[id].ReactJs = reactJs
	dataBlogs[id].NextJs = nextJs
	dataBlogs[id].TypeScript = typeScript

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func coutDate(startdate time.Time, enddate time.Time) string {
	difference := enddate.Sub(startdate)
	years := int(difference.Hours() / (24 * 365))
	months := int(difference.Hours() / (24 * 30))
	weeks := int(difference.Hours() / (24 * 7))
	days := int(difference.Hours() / 24)
	if years >= 1 {
		return strconv.Itoa(years) + " years"
	} else if months >= 1 {
		return strconv.Itoa(months) + " months"
	} else if weeks >= 1 {
		return strconv.Itoa(weeks) + " weeks"
	}

	return strconv.Itoa(days) + " days"
}
