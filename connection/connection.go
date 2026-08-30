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
}
