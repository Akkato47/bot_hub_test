# Bothub Test

## 📋 Contents

- [Checklist](#-checklist)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Running the Application](#️-running-the-application)

---

## ✔ Checklist

Implemented features in the project:

- [x] Express.
- [x] PostgreSQL.
- [x] Drizzle ORM.
- [x] Basic database migrations configured.
- [x] Redis.
- [x] Dockerfile and Docker Compose.
- [x] Database schemas ready.
- [x] Connected with bothub API.
- [x] Configured Swagger.

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Akkato47/express-drizzle-redis-starter.git
   cd express-drizzle-redis-starter
   ```

2. Ensure that **Docker** and **Docker Compose** are installed on your machine. This project uses Docker for containerizing services.

## 🔧 Environment Setup

Create a `.env` file in the root folder of the project and fill it with the values based on the example below or the `.env.example`:

```env
PORT=8000
NODE_ENV=dev

DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=1234
DATABASE_NAME=bothub
DATABASE_URL=postgresql://postgres:1234@127.0.0.1:5432/bothub

JWT_ACCESS_SECRET=secret1
JWT_REFRESH_SECRET=secret2

REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_HOST=localhost
```

## ▶️ Running the Application

You can start the project using Docker Compose:

```bash
docker-compose up -d --build
```

After a successful start, the project will be available at: `http://localhost:8000/api` or documentation at : `http://localhost:8000/docs`

---
