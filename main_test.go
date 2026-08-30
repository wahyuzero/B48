package main

import (
	"html/template"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

func TestCountDate(t *testing.T) {
	tests := []struct {
		name     string
		start    string
		end      string
		expected string
	}{
		{
			name:     "Single day",
			start:    "2023-01-01",
			end:      "2023-01-01",
			expected: "1 days",
		},
		{
			name:     "5 days",
			start:    "2023-01-01",
			end:      "2023-01-05",
			expected: "5 days",
		},
		{
			name:     "2 weeks",
			start:    "2023-01-01",
			end:      "2023-01-15",
			expected: "2 weeks",
		},
		{
			name:     "2 months",
			start:    "2023-01-01",
			end:      "2023-03-05",
			expected: "2 months",
		},
		{
			name:     "1 year",
			start:    "2023-01-01",
			end:      "2024-01-05",
			expected: "1 years",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tstart, _ := time.Parse("2006-01-02", tt.start)
			tend, _ := time.Parse("2006-01-02", tt.end)
			result := countDate(tstart, tend)
			if result != tt.expected {
				t.Errorf("countDate(%s, %s) = %s; want %s", tt.start, tt.end, result, tt.expected)
			}
		})
	}
}

func TestTemplatesParsing(t *testing.T) {
	templates := []string{
		"bootstrap/index.html",
		"bootstrap/contact.html",
		"bootstrap/blogs-rn.html",
		"bootstrap/regist.html",
		"bootstrap/login.html",
		"bootstrap/project.html",
		"pages/404.html",
		"pages/blog-detail.html",
		"pages/contact.html",
		"pages/edit-blog.html",
		"pages/index.html",
		"pages/project.html",
		"pages/testimoni.html",
	}

	for _, tmplPath := range templates {
		t.Run(tmplPath, func(t *testing.T) {
			_, err := template.ParseFiles(tmplPath)
			if err != nil {
				t.Fatalf("Failed to parse template %s: %v", tmplPath, err)
			}
		})
	}
}

func TestContactPageHandler(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/contact", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Setup session middleware simulation
	sessionMiddleware := session.Middleware(sessions.NewCookieStore([]byte("secret")))
	h := sessionMiddleware(func(ctx echo.Context) error {
		return contactPage(ctx)
	})

	err := h(c)
	if err != nil {
		t.Fatalf("contactPage returned error: %v", err)
	}

	if rec.Code != http.StatusOK {
		t.Errorf("expected status %d, got %d", http.StatusOK, rec.Code)
	}
}

func TestTestimonialPageHandler(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/testimonial", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	sessionMiddleware := session.Middleware(sessions.NewCookieStore([]byte("secret")))
	h := sessionMiddleware(func(ctx echo.Context) error {
		return testimonialPage(ctx)
	})

	err := h(c)
	if err != nil {
		t.Fatalf("testimonialPage returned error: %v", err)
	}

	if rec.Code != http.StatusOK {
		t.Errorf("expected status %d, got %d", http.StatusOK, rec.Code)
	}
}

func TestAddPostPageHandler(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/project", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	sessionMiddleware := session.Middleware(sessions.NewCookieStore([]byte("secret")))
	h := sessionMiddleware(func(ctx echo.Context) error {
		return addPost(ctx)
	})

	err := h(c)
	if err != nil {
		t.Fatalf("addPost returned error: %v", err)
	}

	if rec.Code != http.StatusOK {
		t.Errorf("expected status %d, got %d", http.StatusOK, rec.Code)
	}
}

func TestLoginFormHandler(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/login", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	sessionMiddleware := session.Middleware(sessions.NewCookieStore([]byte("secret")))
	h := sessionMiddleware(func(ctx echo.Context) error {
		return loginForm(ctx)
	})

	err := h(c)
	if err != nil {
		t.Fatalf("loginForm returned error: %v", err)
	}

	if rec.Code != http.StatusOK {
		t.Errorf("expected status %d, got %d", http.StatusOK, rec.Code)
	}
}

func TestRegistFormHandler(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/registration", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	sessionMiddleware := session.Middleware(sessions.NewCookieStore([]byte("secret")))
	h := sessionMiddleware(func(ctx echo.Context) error {
		return registForm(ctx)
	})

	err := h(c)
	if err != nil {
		t.Fatalf("registForm returned error: %v", err)
	}

	if rec.Code != http.StatusOK {
		t.Errorf("expected status %d, got %d", http.StatusOK, rec.Code)
	}
}

func TestLogOutHandler(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/logout", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	sessionMiddleware := session.Middleware(sessions.NewCookieStore([]byte("secret")))
	h := sessionMiddleware(func(ctx echo.Context) error {
		return logOut(ctx)
	})

	err := h(c)
	if err != nil {
		t.Fatalf("logOut returned error: %v", err)
	}

	if rec.Code != http.StatusMovedPermanently {
		t.Errorf("expected redirect status %d, got %d", http.StatusMovedPermanently, rec.Code)
	}
}
