-- =============================================================================
-- DumbWays Batch 48 - Database Schema (PostgreSQL)
-- =============================================================================

-- 1. Create User Table
CREATE TABLE IF NOT EXISTS public.db_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 2. Create Posts Table
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
);

-- 3. Seed Sample Data (Optional)
INSERT INTO public.db_posts (title, content, author, start_post, end_post, image, duration, nodejs, reactjs, nextjs, typescript)
VALUES 
(
    'DumbWays Web App Project', 
    'A fullstack web application built during DumbWays Bootcamp Batch 48 using Golang Echo and PostgreSQL.', 
    'Wahyu Febri Tamtomo', 
    '2023-08-01', 
    '2023-08-30', 
    'assets/404.jpg', 
    '1 months', 
    true, 
    true, 
    false, 
    true
)
ON CONFLICT DO NOTHING;
