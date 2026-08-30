# 🌟 B48 Personal Web & Blog — *Nostalgia Revival*

> *"The very first repository where my coding journey began in **DumbWays Batch 48 (B48)** — now resurrected, cleaned up, and consolidated into a unified, full-fledged Fullstack Web Application."*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render.com-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://b48.onrender.com)
[![Go Report](https://img.shields.io/badge/Go-1.20+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://go.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)

🌐 **Live Website**: [https://b48.onrender.com](https://b48.onrender.com)

---

## 📜 The Story & Revival

Project ini awalnya merupakan repositori catatan harian selama 15 hari bootcamp intensif di **DumbWays (Batch 48)**. Setiap harinya mencatat evolusi dari baris pertama HTML/CSS, logika interaktif JavaScript DOM, hingga backend REST server Golang dan database relasional PostgreSQL.

Dalam edisi **Revival** ini, seluruh artefak harian (Day 1 – Day 15) telah disatukan dan dimatangkan ke struktur root project yang rapi, bersih, dan siap untuk dilanjutkan kembali ke level *production-grade*.

---

## ⚡ Tech Stack

| Layer | Teknologi | Deskripsi |
|---|---|---|
| **Backend** | [Golang 1.20+](https://go.dev/) & [Echo Framework v4](https://echo.labstack.com/) | High-performance HTTP server & REST routing |
| **Database** | [PostgreSQL](https://www.postgresql.org/) & [pgx/v5 Driver](https://github.com/jackc/pgx) | Relational database persistence & SQL queries |
| **Auth & Security** | [Bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt) & [Gorilla Sessions](https://github.com/gorilla/sessions) | Password hashing, cookie sessions, & flash messages |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), [Bootstrap 5](https://getbootstrap.com/) | Responsive UI, interactive DOM & form validations |
| **Templating** | Go `html/template` | Server-Side Rendering (SSR) dinamis |

---

## ✨ Fitur yang Sudah Berjalan

- 🔐 **Autentikasi & Sesi Pengguna**:
  - Registrasi user baru dengan enkripsi password `bcrypt` (aman & standar industri).
  - Login fleksibel menggunakan **Email** maupun **Username**.
  - Manajemen sesi login berbasis Cookie Session.
  - Flash message notifikasi (Login sukses, registrasi gagal/sukses, alert status).
  - UI responsif: Navigasi otomatis beralih antara menu *Login/Register* dan *Logout*.
- 📝 **Project & Blog Management (Full CRUD)**:
  - **Create**: Tambah project/blog baru lengkap dengan tech stack checkboxes & durasi otomatis.
  - **Read**: Tampilkan daftar project di Homepage & halaman Blog, serta halaman Detail Blog.
  - **Update**: Edit data blog & project yang sudah tersimpan.
  - **Delete**: Hapus project secara aman langsung dari database.
- 🎨 **Interaktivitas & UI**:
  - Komponen modern Bootstrap 5 dipadukan dengan custom CSS.
  - Halaman Testimoni, Kontak, dan Custom 404 Error Handler.

---

## 🗂️ Struktur Direktori

```text
.
├── assets/          # Static assets (gambar profil, logo teknologi, ikon SVG, dummy cover)
├── bootstrap/       # Template HTML halaman berbasis Bootstrap 5 (Index, Blog, Login, Register, dll.)
├── connection/      # Database connector PostgreSQL (pgx/v5 dengan fallback ENV)
├── css/             # Custom stylesheet, layouting, & animasi
├── pages/           # Template HTML halaman detail & custom layout
├── script/          # Client-side JavaScript (AJAX, dark mode, contact mailto, dll.)
├── .gitignore       # Standar git ignore untuk Golang, environment, dan editor
├── go.mod           # Go module dependency manifest
├── go.sum           # Checksum dependensi Go
├── main.go          # Entry point aplikasi & route handler Echo
├── README.md        # Dokumentasi Nostalgia Revival
└── schema.sql       # PostgreSQL DDL & Seed Data
```

---

## 🗄️ Setup Database (`schema.sql`)

1. **Jalankan PostgreSQL** di komputer lokal atau gunakan Docker / cloud database (Neon, Supabase).
2. **Eksekusi file [`schema.sql`](./schema.sql)**:

```bash
psql -U postgres -d postgres -f schema.sql
```

*Skema tabel yang dibuat:*
- `public.db_user`: Menyimpan data kredensial user (`username`, `email`, `password_hash`).
- `public.db_posts`: Menyimpan artikel/project (`title`, `content`, `author`, `start_post`, `end_post`, `image`, `duration`, `tech_stacks`).

---

## 🚀 Cara Menjalankan Aplikasi

1. **Konfigurasi Environment Variable (Opsional)**:
   Secara default, koneksi mengarah ke `postgres://postgres:wahyus60@localhost:2222/postgres`. Kamu bisa menyesuaikannya melalui environment variable:
   ```bash
   export DATABASE_URL="postgres://postgres:password@localhost:5432/postgres"
   ```

2. **Jalankan Server**:
   ```bash
   go run main.go
   ```

3. **Buka di Browser**:
   Kunjungi [http://localhost:1142](http://localhost:1142)

---

## 🕰️ Nostalgia Timeline (15-Day Bootcamp Origin)

<details>
<summary><b>Klik untuk melihat rekam jejak materi 15 hari bootcamp asli</b></summary>

| Day | Milestone | Materi Pembelajaran |
|:---:|---|---|
| **Day 1** | *Hello World* | HTML5 Semantics & Card Layout dasar |
| **Day 2** | *Layout & Styling* | CSS Box Model, Flexbox, & Form Kontak |
| **Day 3** | *Interactive DOM* | JavaScript DOM, Event Listener, Mailto trigger, Night Mode |
| **Day 4** | *Dynamic Post* | Rendering array of objects secara dinamis ke DOM |
| **Day 5** | *Date & Logic* | Perhitungan durasi otomatis & multi-select badges teknologi |
| **Day 6** | *Responsive Web* | Hamburger menu toggle & CSS Media Queries |
| **Day 7** | *OOP JavaScript* | ES6 Classes, Inheritance, Polymorphism, Abstraction |
| **Day 8** | *Functional JS* | Higher-Order Functions (`map`, `filter`, `reduce`) pada Testimoni |
| **Day 9** | *Async & API* | Asynchronous JS, Promises, & AJAX fetch data |
| **Day 10** | *UI Migration* | Refactoring antarmuka menggunakan framework Bootstrap 5 |
| **Day 11** | *Enter Backend* | Memulai Golang, Echo Framework, & HTML Template rendering |
| **Day 12** | *In-Memory CRUD* | Operasi CRUD menggunakan Go Slices |
| **Day 13** | *Database Connection* | Integrasi PostgreSQL & driver `pgx/v5` |
| **Day 14** | *Full SQL CRUD* | Query `SELECT`, `INSERT`, `UPDATE`, `DELETE` ke database |
| **Day 15** | *Auth & Sessions* | **Sistem Registrasi, Login Bcrypt, & Cookie Sessions** *(Base Project)* |

</details>

---

## 🧪 Pengujian Otomatis (Unit & E2E Testing)

Project ini dilengkapi dengan test suite lengkap:

- **Unit & Handler Tests**:
  ```bash
  go test -v ./...
  ```
- **Live End-to-End Test (Auth, CRUD, File Upload)**:
  ```bash
  # Jalankan server di terminal 1:
  go run main.go
  # Jalankan E2E script di terminal 2:
  python3 e2e_test.py
  ```

---

## 🎯 Revival Roadmap: Rencana Pengembangan Lanjutan

- [x] **Level 1: Dynamic File Upload (Multipart Form)** *(Selesai!)*
  - Dukungan upload file gambar langsung dari form (`c.FormFile("image")`) ke folder `uploads/` dengan timestamp hashing.
- [ ] **Level 2: User-Post Relation (Foreign Key) & Middleware Auth**
  - Menambahkan relasi `author_id INT REFERENCES db_user(id)`.
  - Mengunci route create/edit/delete dengan Middleware agar hanya user terotentikasi yang dapat mengelola postingannya sendiri.
- [ ] **Level 3: Clean Architecture & Modularization**
  - Memecah `main.go` monolitik menjadi pola MVC / Clean Architecture (`handlers/`, `repositories/`, `models/`, `routes/`).
  - Menggunakan library `.env` (`godotenv`) untuk manajemen kredensial yang aman.
- [ ] **Level 4: Live Cloud Deployment**
  - Deploy backend ke Railway / Render / Fly.io dengan database PostgreSQL live di Supabase/Neon.
