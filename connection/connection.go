package connection

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5"
)

var Conn *pgx.Conn

func DbConnect() {
	var err error
	dbUrl := os.Getenv("DATABASE_URL")
	if dbUrl != "" {
		Conn, err = pgx.Connect(context.Background(), dbUrl)
	} else {
		// Try standard 5432 first, fallback to 2222
		Conn, err = pgx.Connect(context.Background(), "postgres://postgres@localhost:5432/postgres")
		if err != nil {
			Conn, err = pgx.Connect(context.Background(), "postgres://postgres:wahyus60@localhost:2222/postgres")
		}
	}
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		fmt.Fprintf(os.Stderr, "Tip: Set DATABASE_URL environment variable if using custom credentials or port.\n")
		os.Exit(1)
	}
	fmt.Println("Database Connected!")
	initSchema()
}

func initSchema() {
	query := `
	CREATE TABLE IF NOT EXISTS public.db_user (
		id SERIAL PRIMARY KEY,
		username VARCHAR(255) NOT NULL,
		email VARCHAR(255) UNIQUE NOT NULL,
		password VARCHAR(255) NOT NULL
	);
	CREATE TABLE IF NOT EXISTS public.db_posts (
		id SERIAL PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		content TEXT NOT NULL,
		author VARCHAR(255) DEFAULT 'Wahyu Zero',
		start_post DATE NOT NULL,
		end_post DATE NOT NULL,
		image VARCHAR(255) DEFAULT 'assets/404.jpg',
		duration VARCHAR(50),
		nodejs BOOLEAN DEFAULT false,
		reactjs BOOLEAN DEFAULT false,
		nextjs BOOLEAN DEFAULT false,
		typescript BOOLEAN DEFAULT false
	);`
	_, err := Conn.Exec(context.Background(), query)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Warning: could not auto-migrate schema: %v\n", err)
	} else {
		fmt.Println("Database Schema Verified & Ready!")
	}
}
