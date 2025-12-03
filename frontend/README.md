# Student Assignment Tracker

A modern, full-featured assignment tracking application built with Next.js 16, TypeScript, and Tailwind CSS. This application helps students manage their academic tasks, track deadlines, and stay organized.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure registration and login system with JWT tokens
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for assignments
- **Data Validation**: Comprehensive form validation using Zod schemas
- **Error Handling**: Robust error handling with user-friendly messages
- **Responsive Design**: Mobile-first, responsive UI that works on all devices

### User Interface
- **Modern UI Components**: Built with shadcn/ui and Radix UI for accessible, beautiful components
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Clear loading indicators for better UX
- **Confirmation Dialogs**: Safe deletion with confirmation dialogs
- **Dark Mode Support**: Automatic dark mode based on system preferences

### Performance & Optimization
- **Server-Side Rendering (SSR)**: Optimized page rendering for better performance
- **Code Splitting**: Automatic code splitting for faster page loads
- **Image Optimization**: Built-in Next.js image optimization
- **Caching**: Strategic caching for improved performance
- **TypeScript**: Full type safety throughout the application

### Security
- **Input Sanitization**: All user inputs are validated and sanitized
- **XSS Protection**: Built-in protection against cross-site scripting
- **Secure Authentication**: JWT-based authentication with token expiration
- **API Security**: Secure API communication with proper error handling

### Accessibility
- **ARIA Labels**: Proper ARIA labels for screen readers
- **Keyboard Navigation**: Full keyboard navigation support
- **Focus Management**: Proper focus management for accessibility
- **Semantic HTML**: Semantic HTML structure for better accessibility

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui, Radix UI
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Authentication**: JWT (JSON Web Tokens)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-assignment-tracker/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── assignments/        # Assignment pages (create, edit)
│   │   ├── dashboard/          # Dashboard page
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Navbar.tsx          # Navigation component
│   │   └── error-boundary.tsx  # Error boundary component
│   ├── lib/                    # Utility functions
│   │   ├── auth.ts             # Authentication utilities
│   │   ├── utils.ts            # General utilities
│   │   ├── validations.ts      # Zod validation schemas
│   │   └── error-handler.ts    # Error handling utilities
│   ├── services/               # API services
│   │   ├── api.ts              # Axios configuration
│   │   ├── auth.service.ts     # Authentication service
│   │   └── assignment.service.ts # Assignment service
│   └── types/                  # TypeScript type definitions
│       └── index.ts            # Shared types
├── public/                     # Static assets
├── components.json             # shadcn/ui configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🔧 Configuration

### API Configuration
Update the API base URL in `src/services/api.ts` or set the `NEXT_PUBLIC_API_URL` environment variable.

### Styling
The application uses Tailwind CSS with custom theme configuration in `src/app/globals.css`. shadcn/ui components can be customized through the `components.json` file.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your API URL
4. Deploy!

The application is configured for automatic deployments on push to the main branch.

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔒 Security Considerations

- All user inputs are validated and sanitized
- JWT tokens are stored securely in localStorage
- API requests include proper authentication headers
- Error messages don't expose sensitive information
- CORS is properly configured on the backend

## 🧪 Testing

Run the linter to check for code quality issues:
```bash
npm run lint
```

## 📚 API Integration

The frontend expects a REST API with the following endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /assignments` - Get all assignments
- `GET /assignments/:id` - Get single assignment
- `POST /assignments` - Create assignment
- `PUT /assignments/:id` - Update assignment
- `DELETE /assignments/:id` - Delete assignment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
