Task Management System

Earnest Fintech Limited – Technical Assessment

A full-stack task management application built with Node.js, TypeScript, Prisma (SQL) and Next.js (App Router).
Implements secure authentication using JWT access & refresh tokens, user-scoped task CRUD, filtering, searching, pagination, and a responsive UI.

🚀 Features
Authentication & Security

User Registration, Login, Logout

JWT Access Token (short-lived)

JWT Refresh Token (long-lived, stored as httpOnly cookie)

Automatic token refresh

Secure password hashing with bcryptjs

Protected routes with middleware

Task Management

Create, Read, Update, Delete tasks

Toggle task completion

Tasks scoped to the logged-in user

Search by title

Filter by status (completed / pending)

Pagination (page & limit)

Frontend

Next.js (App Router) + TypeScript

Responsive dashboard (desktop & mobile)

Login & Registration pages

Centralized Axios API layer

Toast notifications for user actions

🧱 Tech Stack

Backend

Node.js

TypeScript

Express

Prisma ORM

SQLite (SQL database)

JWT (jsonwebtoken)

bcryptjs

Frontend

Next.js (App Router)

TypeScript

Axios

📁 Project Structure
.
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── modules/
│       │   ├── auth/
│       │   └── tasks/
│       ├── middlewares/
│       ├── utils/
│       ├── app.ts
│       └── server.ts
│
└── task-manager-frontend/
    └── src/
        ├── app/
        ├── components/
        ├── hooks/
        ├── lib/
        │   └── api.ts
        └── styles/

🔌 API Endpoints
Auth
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout

Tasks (Protected)
GET    /tasks?page=&limit=&search=&status=
POST   /tasks
PATCH  /tasks/:id
PATCH  /tasks/:id/toggle
DELETE /tasks/:id

⚙️ How to Run Locally
Backend
cd backend
npm install
npx prisma migrate dev
npm run dev


Create backend/.env:

PORT=5000
JWT_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret

Frontend
cd task-manager-frontend
npm install
npm run dev


Create task-manager-frontend/.env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000

🔐 Authentication Flow (Brief)

User logs in → receives access token

Refresh token stored as httpOnly cookie

Axios interceptor attaches access token to requests

On 401, frontend silently calls /auth/refresh

New access token issued without user logout

📝 Notes

All task operations are user-scoped

Proper HTTP status codes used (400, 401, 404, 201, 204)

Clean separation of concerns (controllers, middleware, services)

Designed to exactly match the provided assessment requirements
