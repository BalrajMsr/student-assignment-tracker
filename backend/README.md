# Student Assignment Tracker - Backend API

A robust, production-ready backend API for managing student assignments, built with Express.js, TypeScript, and MongoDB.

## Features

### 🔒 Security
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with 12 salt rounds
- **Rate Limiting**: Protection against brute force attacks
- **Input Sanitization**: Protection against NoSQL injection and XSS attacks
- **Helmet.js**: Security headers for HTTP protection
- **CORS**: Configurable cross-origin resource sharing

### ✅ Validation & Error Handling
- **Express Validator**: Comprehensive input validation for all endpoints
- **Custom Error Handling**: Centralized error handling middleware
- **MongoDB Validation**: Schema-level validation with custom error messages
- **Type Safety**: Full TypeScript support with strict mode

### 📊 Database
- **MongoDB with Mongoose**: Robust ODM with schema validation
- **Indexes**: Optimized queries with strategic indexing
- **Connection Pooling**: Efficient database connection management
- **Graceful Shutdown**: Proper cleanup on application termination

### 🚀 Performance & Best Practices
- **Code Splitting**: Modular architecture
- **Error Recovery**: Comprehensive error handling
- **TypeScript Strict Mode**: Enhanced type safety
- **Clean Code**: Well-documented, maintainable codebase
- **Environment Configuration**: Validated environment variables

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Language**: TypeScript 5.x
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, express-rate-limit, express-mongo-sanitize
- **Validation**: express-validator

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.ts          # Database connection configuration
│   │   └── env.ts         # Environment variable validation
│   ├── controllers/
│   │   ├── auth.controller.ts      # Authentication logic
│   │   └── assignment.controller.ts # Assignment CRUD operations
│   ├── middleware/
│   │   ├── auth.ts        # JWT authentication middleware
│   │   ├── errorHandler.ts # Global error handling
│   │   └── validation.ts  # Request validation middleware
│   ├── models/
│   │   ├── User.ts        # User model with validation
│   │   └── Assignment.ts  # Assignment model with validation
│   ├── routes/
│   │   ├── auth.routes.ts      # Authentication routes
│   │   └── assignment.routes.ts # Assignment routes
│   ├── types/
│   │   └── express.d.ts   # Extended Express types
│   ├── validators/
│   │   ├── auth.validator.ts      # Auth validation rules
│   │   └── assignment.validator.ts # Assignment validation rules
│   └── server.ts          # Express app configuration
├── .env.example           # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/student-assignment-tracker
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
FRONTEND_URL=http://localhost:3000
```

**Important**: Make sure your `JWT_SECRET` is at least 32 characters long for security.

### Running the Application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Assignments

All assignment endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Get All Assignments
```http
GET /api/assignments
Authorization: Bearer <token>
```

**Query Parameters (optional):**
- `status`: Filter by status (Pending, In Progress, Completed, Overdue)
- `priority`: Filter by priority (Low, Medium, High)
- `sortBy`: Sort field (dueDate, createdAt, priority, status)
- `sortOrder`: Sort order (asc, desc)

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "assignment_id",
      "title": "Math Homework",
      "subject": "Mathematics",
      "description": "Complete chapter 5 exercises",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "status": "Pending",
      "priority": "High",
      "userId": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Assignment by ID
```http
GET /api/assignments/:id
Authorization: Bearer <token>
```

#### Create Assignment
```http
POST /api/assignments
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Math Homework",
  "subject": "Mathematics",
  "description": "Complete chapter 5 exercises",
  "dueDate": "2024-12-31T00:00:00.000Z",
  "status": "Pending",
  "priority": "High"
}
```

#### Update Assignment
```http
PUT /api/assignments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "In Progress",
  "priority": "High"
}
```

#### Delete Assignment
```http
DELETE /api/assignments/:id
Authorization: Bearer <token>
```

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Validation Rules

### User Registration
- **Name**: 2-50 characters, letters and spaces only
- **Email**: Valid email format, unique
- **Password**: Minimum 8 characters, must contain uppercase, lowercase, and number

### Assignment
- **Title**: 3-100 characters, required
- **Subject**: 2-50 characters, required
- **Description**: Maximum 1000 characters, optional
- **Due Date**: Valid ISO 8601 date, cannot be in the past, required
- **Status**: One of: Pending, In Progress, Completed, Overdue (default: Pending)
- **Priority**: One of: Low, Medium, High (default: Medium)

## Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "error": {
    "message": "Error message here"
  }
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `409`: Conflict (duplicate resource)
- `500`: Internal Server Error

## Security Features

1. **Rate Limiting**:
   - General API: 100 requests per 15 minutes per IP
   - Authentication endpoints: 5 requests per 15 minutes per IP

2. **Password Security**:
   - Minimum 8 characters
   - Must include uppercase, lowercase, and number
   - Hashed with bcrypt (12 salt rounds)

3. **JWT Tokens**:
   - 7-day expiration
   - Secure secret key (minimum 32 characters)

4. **Input Sanitization**:
   - NoSQL injection protection
   - XSS protection
   - HTML escaping

## Database Schema

### User
- `name`: String (required, 2-50 chars)
- `email`: String (required, unique, indexed)
- `password`: String (required, hashed, not returned in queries)
- `createdAt`: Date (auto)
- `updatedAt`: Date (auto)

### Assignment
- `userId`: ObjectId (required, indexed, references User)
- `title`: String (required, 3-100 chars)
- `subject`: String (required, 2-50 chars)
- `description`: String (optional, max 1000 chars)
- `dueDate`: Date (required, cannot be in past)
- `status`: Enum (Pending, In Progress, Completed, Overdue)
- `priority`: Enum (Low, Medium, High)
- `createdAt`: Date (auto)
- `updatedAt`: Date (auto)

**Indexes:**
- User email (unique)
- Assignment userId + status (compound)
- Assignment userId + dueDate (compound)

## Development

### TypeScript Configuration
- Strict mode enabled
- Source maps for debugging
- Declaration files generated

### Code Quality
- Comprehensive error handling
- Input validation on all endpoints
- Type-safe codebase
- Well-documented functions

## Production Considerations

1. **Environment Variables**: Ensure all required variables are set
2. **Database**: Use connection pooling for production
3. **Logging**: Implement proper logging (consider Winston or Pino)
4. **Monitoring**: Set up application monitoring
5. **Backup**: Regular database backups
6. **HTTPS**: Use HTTPS in production
7. **CORS**: Configure CORS for your frontend domain

