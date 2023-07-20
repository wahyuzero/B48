package main

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.Static("/assets", "assets")
	e.Static("/css", "css")
	e.Static("/script", "script")

	e.GET("/blank", blankPage)
	e.GET("/", homePage)
	e.GET("/contact", contactPage)
	e.GET("/project", blogPage)
	e.GET("/testimonial", testimonialPage)
	e.GET("/blog-detail/:id", blogDetail)
	e.POST("/add-post", postPage)

	// http.HandleFunc("/404", func(w http.ResponseWriter, r *http.Request) {
	// 	errHandler(w, r, http.StatusNotFound)
	// })

	// Not Found Page
	// Found from labstack with little modification
	e.HTTPErrorHandler = func(err error, c echo.Context) {
		if he, ok := err.(*echo.HTTPError); ok {
			if he.Code == http.StatusNotFound {
				tmpl, _ := template.ParseFiles("pages/404.html")
				tmpl.Execute(c.Response(), nil)
			} else {
				e.DefaultHTTPErrorHandler(err, c)
			}
		}
	}

	e.Logger.Fatal(e.Start("localhost:1111"))
}

// handler / controller

// Not found Handler
// func errHandler(w http.ResponseWriter, r *http.Request, status int) {
// 	w.WriteHeader(status)
// 	if status == http.StatusNotFound {
// 		http.ServeFile(w, r, "pages/404.html")
// 	}
// }

// Default Page
func blankPage(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"message": "404 Not Found",
	})
}

// Index Page
// first () for ok second () for errors
// use tmpl, _ if you want without error checking
func homePage(c echo.Context) error {
	tmpl, err := template.ParseFiles("bootstrap/index.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), nil)
}
func contactPage(c echo.Context) error {
	tmpl, err := template.ParseFiles("bootstrap/contact.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), nil)
}
func blogPage(c echo.Context) error {
	tmpl, err := template.ParseFiles("bootstrap/project.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), nil)
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
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	blogDetail := map[string]interface{}{
		"Id":      id,
		"Title":   "AI Needs Science, Technology, Engineering, and Mathematics",
		"Content": "Even though the presence of artificial intelligence technology or artificial intelligence (AI) requires science, technology, engineering, and mathematics or STEM-based talents. However, these advances also underscore the importance of the humanities and arts in a way that AI cannot.",
	}

	return tmpl.Execute(c.Response(), blogDetail)
}
func postPage(c echo.Context) error {
	title := c.FormValue("projectName")
	content := c.FormValue("konten")
	startDate := c.FormValue("content")
	endDate := c.FormValue("endDate")
	nodeJs := c.FormValue("nodeJs")
	reactJs := c.FormValue("reactJs")
	nextJs := c.FormValue("nextJs")
	typeScript := c.FormValue("typeScript")

	fmt.Println("projectName", title)
	fmt.Println("startDate", startDate)
	fmt.Println("endDate", endDate)
	fmt.Println("konten", content)
	fmt.Println("nodeJs", nodeJs)
	fmt.Println("reactJs", reactJs)
	fmt.Println("nextJs", nextJs)
	fmt.Println("typeScript", typeScript)

	return c.Redirect(http.StatusMovedPermanently, "/project")
}

// package main
// import (
//     "fmt"
//     )

// func main() {
//    angka := []int{1,2,3}

//    angka = append(angka,4) // arraymu.push(4)

//    fmt.Println(angka)
// }
