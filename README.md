# 🎓 Student Assignment Tracker

A modern full-stack assignment tracking system built using **Next.js 16, TypeScript, Tailwind CSS**, and a **secure REST backend with Express.js, MongoDB, and TypeScript**.  
Designed to help students manage tasks, track deadlines, and stay productive efficiently.

---

## 📌 Table of Contents

- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Frontend Overview](#-frontend-overview)  
- [Backend Overview](#-backend-overview)  
- [Installation](#-installation)  
- [Project Structure](#-project-structure)  
- [API Endpoints](#-api-endpoints)  
- [Deployment](#-deployment)  
- [Security](#-security)  
- [Testing](#-testing)  
- [License](#-license)  
- [Author](#-author)  

---

## 🚀 Features

### ✔ Core Functionality
- 🔐 Secure JWT Authentication (Register & Login)
- 📝 Full CRUD Operations for Assignments
- 🔍 Search, filter, sorting, and validation support
- 🔁 Token-protected API routes

### 🎨 UI/UX Enhancements
- ⚡ Built with **Next.js App Router**
- ✨ **shadcn/ui + Radix UI** components
- 📱 Fully responsive modern design
- 🔔 Toast notifications for actions

### 🧠 Developer Friendly
- 🧪 TypeScript across both frontend & backend
- 📦 Form Validation using **Zod + React Hook Form**
- 🚦 Centralized error and API response handling

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, Axios |
| Backend | Node.js, Express.js, TypeScript, Mongoose |
| Database | MongoDB Atlas |
| Authentication | JWT + bcrypt |
| Deployment | Vercel (frontend), Render (backend) |

---

## 🎨 Frontend Overview

- Built using **Next.js App Router**
- Uses **Axios** for API communication
- Includes authenticated route handling
- Modular and reusable components

---

## 🔧 Backend Overview

- Node.js + Express.js REST API
- Fully typed with TypeScript
- Middleware-based architecture (auth, validation, errors)
- MongoDB using Mongoose ORM

---

## 📦 Installation

### Clone Repository

```bash
git clone <repo-url>
cd project-root
```

---

### ▶️ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start development server:

```bash
npm run dev
```

➡ Runs at: **http://localhost:3000**

---

### ⚙ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Configure environment variables:

```env
MONGO_URI=mongodb+srv://<YOUR_DB>
JWT_SECRET=<YOUR_SECRET>
FRONTEND_URL=http://localhost:3000
```

Start backend server:

```bash
npm run dev
```

➡ Runs at: **http://localhost:5000**

---

## 🗂 Project Structure

```
project-root/
├── frontend/
│   ├── app/
│   ├── components/
│   └── ...
└── backend/
    ├── src/
    ├── controllers/
    ├── routes/
    └── ...
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get JWT |
| GET | `/assignments` | Fetch assignments |
| POST | `/assignments` | Create assignment |
| PUT | `/assignments/:id` | Update assignment |
| DELETE | `/assignments/:id` | Delete assignment |

#### 🔐 All protected routes require:

```
Authorization: Bearer <token>
```

---

## 🚢 Deployment

### 🌐 Frontend Deployment (Vercel)
1. Push code to GitHub  
2. Import in Vercel  
3. Add env variable:

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

4. Deploy 🚀

---

### 🖥 Backend Deployment (Render)

Add environment variables:

```
MONGO_URI=
JWT_SECRET=
FRONTEND_URL=https://your-frontend.vercel.app
```

Deploy 🚀

---

## 🔒 Security Features

- ✔ JWT token expiration  
- ✔ Password hashing with bcrypt  
- ✔ Rate limiting  
- ✔ Sanitized user input  
- ✔ Protected routes  
- ✔ Production-level CORS rules  

---

## 🧪 Testing

```bash
npm run lint
```

---

## 📄 License

This project is licensed under the **MIT License**.  

> MIT License © 2025 **Balraj M**

---

## 🏁 Author

👤 **Balraj M**  
🚀 Full-Stack Developer (MERN + TypeScript)