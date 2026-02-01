#TaskManagementSystem

#EarnestFintechLimited
#TechnicalAssessment
#FullStackProject

A full-stack Task Management System built using Node.js, TypeScript, Prisma (SQL) and Next.js (App Router).
The application implements secure authentication, user-scoped task management, pagination, filtering, and a responsive frontend UI, strictly following the given assessment requirements.

#Features

##Authentication #Security

User Registration

User Login

User Logout

JWT Access Token (short-lived)

JWT Refresh Token (long-lived, stored as httpOnly cookie)

Automatic token refresh using refresh token

Secure password hashing using bcryptjs

Protected API routes using authentication middleware

##TaskManagement

Create tasks

Read tasks (user-specific)

Update tasks

Delete tasks

Toggle task completion status

Search tasks by title

Filter tasks by status (completed / pending)

Pagination using page & limit parameters

##Frontend

Built using Next.js (App Router) and TypeScript

Responsive UI (desktop & mobile)

Login and Registration pages

Task Dashboard

Add, Edit, Delete, Toggle tasks

Toast notifications for successful actions

Centralized Axios API layer

Automatic token refresh handling

#TechStack

##Backend

Node.js

TypeScript

Express

Prisma ORM

SQLite (SQL Database)

JWT (jsonwebtoken)

bcryptjs

##Frontend

Next.js (App Router)

TypeScript

Axios

#ProjectStructure

#Root
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # Prisma migrations
│   │
│   └── src/
│       ├── modules/
│       │   ├── auth/              # Authentication logic
│       │   └── tasks/             # Task CRUD logic
│       │
│       ├── middlewares/            # Auth & error middleware
│       ├── utils/                  # JWT & hashing utilities
│       ├── config/                 # Environment & JWT config
│       ├── app.ts                  # Express app setup
│       └── server.ts               # Server entry point
│
├── task-manager-frontend/
│   └── src/
│       ├── app/                    # Next.js app router pages
│       ├── components/             # Reusable UI components
│       ├── hooks/                  # Custom React hooks
│       ├── lib/
│       │   └── api.ts              # Axios API client
│       └── styles/                 # Styling files
│
└── README.md


#APIEndpoints

##Auth

POST /auth/register

POST /auth/login

POST /auth/refresh

POST /auth/logout

##Tasks #ProtectedRoutes

GET /tasks?page=&limit=&search=&status=

POST /tasks

PATCH /tasks/:id

PATCH /tasks/:id/toggle

DELETE /tasks/:id

#RunLocally

##Backend

cd backend
npm install
npx prisma migrate dev
npm run dev


Create .env file in backend/:

PORT=5000
JWT_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret


##Frontend

cd task-manager-frontend
npm install
npm run dev


Create .env.local file in task-manager-frontend/:

NEXT_PUBLIC_API_URL=http://localhost:5000


#AuthenticationFlow
#JWT #RefreshToken

User logs in and receives an access token

Refresh token is stored as an httpOnly cookie

Axios automatically attaches access token to requests

On access token expiry, /auth/refresh is called

A new access token is issued without logging the user out

#Notes

All task operations are user-scoped

Proper HTTP status codes are used (400, 401, 404, 201, 204)

Clean separation of concerns across backend modules

Centralized API handling on frontend

Designed to exactly match the assessment specification
