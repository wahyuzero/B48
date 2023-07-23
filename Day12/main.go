package main

import (
	"fmt"
	"html/template"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

// First letter have uppercase for easily accesed by another package
type Blog struct {
	Title       string
	Content     string
	Author      string
	PostDate    string
	PostEndDate string
	Image       string
	Duration    string
	NodeJs      bool
	ReactJs     bool
	NextJs      bool
	TypeScript  bool
}

// var used for global/ outside function
var dataBlogs = []Blog{
	{
		Title:       "Ubuntu For Mobile",
		Content:     "With Ubuntu Touch, we offer a truly unique mobile experience - a viable alternative to Android and iOS. We provide a free and open-source GNU/Linux-based mobile operating system. One that can be installed and used today.",
		Author:      "Lord Gaben",
		PostDate:    "10/07/2023",
		PostEndDate: "20/10/2024",
		Image:       "https://4.bp.blogspot.com/-qZ0VZbK7UNs/Xv74zQYa41I/AAAAAAAAcXc/WQ_kPnCDJV4l47RT3sLlHgHHjRFq5h7YQCK4BGAYYCw/s1600/ubuntu-phone-by-ernmander.jpeg",
		Duration:    "1 days",
		NodeJs:      true,
		ReactJs:     true,
		NextJs:      true,
		TypeScript:  false,
	},
	{
		Title:       "End Of Symbian Era",
		Content:     "Symbian’s fall from dominance is a tale about which books can (and should) be written.",
		Author:      "Didvided we stand",
		PostDate:    "21/07/2023",
		PostEndDate: "20/10/2024",
		Image:       "https://lh4.ggpht.com/-uJ_Qr1OTPYU/UvuAuBz8pmI/AAAAAAAABJU/HlUa8wjJxio/s1600/nisan_symbian%25255B13%25255D.jpg",
		Duration:    "1 days",
		NodeJs:      false,
		ReactJs:     false,
		NextJs:      true,
		TypeScript:  false,
	},
	{
		Title:       "Kali NetHunter",
		Content:     "Kali NetHunter is available for un-rooted devices (NetHunter Rootless), for rooted devices that have a custom recovery (NetHunter Lite), and for rooted devices with custom recovery for which a NetHunter specific kernel is available (NetHunter).",
		Author:      "Bambank",
		PostDate:    "14/07/2023",
		PostEndDate: "20/10/2024",
		Image:       "https://www.kali.org/docs/nethunter/NetHunter-xiaomi-mi-9t.png",
		Duration:    "1 year",
		NodeJs:      true,
		ReactJs:     false,
		NextJs:      true,
		TypeScript:  false,
	},
	{
		Title:       "Intel is losing against AMD",
		Content:     "Ever since AMD launched the Zen architecture just over three years ago, it has progressed at a relentless pace. At the time, Intel's $1,100 8-core i7-6900 seemed like it had all the cores you'd ever need. However, AMD moved the goalposts, unveiling the 8-core Ryzen 7 1800 at a much lower $499 price point.",
		Author:      "Albert",
		PostDate:    "14/07/2023",
		PostEndDate: "20/10/2024",
		Image:       "https://www.windowschimp.com/wp-content/uploads/2016/12/intel_amd_logos.jpg",
		Duration:    "1 year",
		NodeJs:      true,
		ReactJs:     false,
		NextJs:      true,
		TypeScript:  false,
	},
	{
		Title:       "2021 GPU Shortage Will Continue Until the End Of The Year",
		Content:     "NVIDIA themselves confirm that the current shortage of their high-performance GPUs isn't going anywhere anytime soon, according to a preview of the company's 2021 Q1 sales numbers.",
		Author:      "Gay Sensei",
		PostDate:    "14/07/2023",
		PostEndDate: "20/10/2024",
		Image:       "https://1734811051.rsc.cdn77.org/data/images/full/383561/2021-gpu-shortage.jpg?w=820",
		Duration:    "1 year",
		NodeJs:      true,
		ReactJs:     false,
		NextJs:      true,
		TypeScript:  false,
	},
	{
		Title:       "Task force probes county cryptocurrency use",
		Content:     "The Miami-Dade Cryptocurrency Task Force, created in April, now has seven of its planned members appointed after commissioners accepted a report detailing their credentials last week.",
		Author:      "Satosh",
		PostDate:    "14/07/2023",
		PostEndDate: "20/10/2024",
		Image:       "https://www.miamitodaynews.com/wp-content/uploads/2021/07/cryptocurrency.jpg",
		Duration:    "1 year",
		NodeJs:      true,
		ReactJs:     false,
		NextJs:      true,
		TypeScript:  false,
	},
}

func main() {
	e := echo.New()
	e.Static("/assets", "assets")
	e.Static("/css", "css")
	e.Static("/script", "script")

	e.GET("/", homePage)
	e.GET("/contact", contactPage)
	e.GET("/project", blogPage)
	e.GET("/testimonial", testimonialPage)
	e.GET("/blog-detail/:id", blogDetail)
	e.GET("/blogs", viewBlog)
	e.POST("/add-post", addBlog)
	e.POST("/delete-blog/:index", deleteBlog)
	e.GET("/edit-blog/:index", editBlog)
	e.POST("/edit-blog/:index", editBlog)
	e.POST("/update-blog/:index", updateBlog)
	// Ref: https://dasarpemrogramangolang.novalagung.com/C-http-error-handling.html
	e.HTTPErrorHandler = func(err error, c echo.Context) {
		report, _ := err.(*echo.HTTPError)
		if report.Code == http.StatusNotFound {
			tmpl, _ := template.ParseFiles("pages/404.html")
			// Error: too many return value, so i delete the return :D
			tmpl.Execute(c.Response(), nil)
		}
	}

	e.Logger.Fatal(e.Start("localhost:1144"))
}

func homePage(c echo.Context) error {
	tmpl, err := template.ParseFiles("bootstrap/index.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
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

func blogDetail(c echo.Context) error {
	id := c.Param("id")

	tmpl, err := template.ParseFiles("pages/blog-detail.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	idToInt, _ := strconv.Atoi(id)

	blogDetail := Blog{}

	for index, data := range dataBlogs {
		if index == idToInt {
			blogDetail = Blog{
				Title:       data.Title,
				Author:      data.Author,
				Content:     data.Content,
				PostDate:    data.PostDate,
				PostEndDate: data.PostEndDate,
				Image:       data.Image,
				Duration:    data.Duration,
				NodeJs:      data.NodeJs,
				ReactJs:     data.ReactJs,
				NextJs:      data.NextJs,
				TypeScript:  data.TypeScript,
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

	data := map[string]interface{}{
		"Blogs": dataBlogs,
	}

	return tmpl.Execute(c.Response(), data)
}

func addBlog(c echo.Context) error {
	title := c.FormValue("projectName")
	content := c.FormValue("konten")
	startDate := c.FormValue("startDate")
	endDate := c.FormValue("endDate")
	duration := coutDate(startDate, endDate)
	nodeJs := c.FormValue("nodeJs") == "on"
	reactJs := c.FormValue("reactJs") == "on"
	nextJs := c.FormValue("nextJs") == "on"
	typeScript := c.FormValue("typeScript") == "on"

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
		Title:       title,
		Author:      "Wahyu Zero",
		Content:     content,
		PostDate:    startDate,
		PostEndDate: endDate,
		Duration:    duration,
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

// Not Ready yet
func updateBlog(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id")) // Read id from exiting data
	BlogUpdate := Blog{}
	for i, data := range dataBlogs {
		if id == i {

			BlogUpdate = Blog{
				Title:       data.Title,
				PostDate:    data.PostDate,
				PostEndDate: data.PostEndDate,
				Content:     data.Content,
				Author:      data.Author,
				Image:       data.Image,
				NodeJs:      data.NodeJs,
				ReactJs:     data.ReactJs,
				NextJs:      data.NextJs,
				TypeScript:  data.TypeScript,
			}
		}
	}
	data := map[string]interface{}{
		"Blog": BlogUpdate,
	}
	tmpl, _ := template.ParseFiles("pages/edit-blog.html")
	return tmpl.Execute(c.Response(), data)
}

// Not working yet
func editBlog(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	title := c.FormValue("projectName")
	content := c.FormValue("konten")
	startDate := c.FormValue("startDate")
	endDate := c.FormValue("endDate")
	duration := coutDate(startDate, endDate)
	nodeJs := c.FormValue("nodeJs") == "on"
	reactJs := c.FormValue("reactJs") == "on"
	nextJs := c.FormValue("nextJs") == "on"
	typeScript := c.FormValue("typeScript") == "on"
	fmt.Println("Cannot get id", id)
	dataBlogs[id].Title = title
	dataBlogs[id].Content = content
	dataBlogs[id].PostDate = startDate
	dataBlogs[id].PostEndDate = endDate
	dataBlogs[id].Duration = duration
	dataBlogs[id].NodeJs = nodeJs
	dataBlogs[id].ReactJs = reactJs
	dataBlogs[id].NextJs = nextJs
	dataBlogs[id].TypeScript = typeScript
	return c.Redirect(http.StatusMovedPermanently, "/")
}

func coutDate(startDate, endDate string) string {
	format := "2006-01-02"
	startDateInp, _ := time.Parse(format, startDate)
	endDateInp, _ := time.Parse(format, endDate)
	if startDateInp.After(endDateInp) {
		return "Error! End date is earlier than start date"
	}

	duration := endDateInp.Sub(startDateInp)
	days := int(duration.Hours() / 24)

	if years := days / 365; years > 0 {
		return fmt.Sprintf("%d years", years)
	} else if months := days / 30; months > 0 {
		return fmt.Sprintf("%d months", months)
	} else if weeks := days / 7; weeks > 0 {
		return fmt.Sprintf("%d weeks", weeks)
	}

	return fmt.Sprintf("%d days", days)
}
