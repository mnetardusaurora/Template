# Full-Stack Application Template

A production-ready template for building full-stack applications with React, Node.js, TypeScript, Clerk authentication, and AWS Amplify deployment.

##  Tech Stack

### Frontend
- **React 18+** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for beautiful, accessible components
- **React Query** for data fetching and caching
- **React Hook Form** for form handling

### Backend
- **Node.js 20** with TypeScript
- **Express.js** for REST API
- **Prisma** ORM with PostgreSQL
- **JWT** authentication with refresh tokens
- **Zod** for runtime validation
- **Jest** for testing

### Development Tools
- **ESLint** & **Prettier** for code quality
- **Husky** for git hooks
- **Playwright** for E2E testing
- **Docker** for containerization

##  Project Structure

```
Template/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Route components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API calls
│   │   ├── types/        # TypeScript definitions
│   │   └── utils/        # Utility functions
│   └── package.json
├── backend/              # Node.js backend application
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Express middleware
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API routes
│   │   └── types/        # TypeScript definitions
│   └── package.json
├── .claude/              # Claude AI documentation
│   ├── context/         # Project context files
│   └── workflows/       # Development workflows
├── docs/                # Feature documentation
│   └── features/       # Feature-specific docs
└── claude.md           # Project overview
```

## 🛠 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd template
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials and secrets
   ```

4. **Database Setup**
   ```bash
   # Run migrations (when Prisma is set up)
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Frontend (http://localhost:3000)
   cd frontend
   npm run dev

   # Terminal 2 - Backend (http://localhost:3001)
   cd backend
   npm run dev
   ```

##  Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Backend
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

##  Testing

### Unit Testing
- Frontend: Vitest with React Testing Library
- Backend: Jest with Supertest

### E2E Testing
- Playwright for cross-browser testing
- Test scenarios in `e2e/` directory

### Running Tests
```bash
# All tests
npm test

# With coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 🔐 Authentication

The template includes JWT-based authentication with:
- Access tokens (short-lived)
- Refresh tokens (long-lived)
- Password hashing with bcrypt
- Protected route middleware

##  UI Components

Built with shadcn/ui components:
- Fully customizable with CSS variables
- Accessible by default (WCAG compliant)
- Dark mode support
- Responsive design

##  Documentation

### Claude AI Integration
This project includes comprehensive documentation in the `.claude/` directory to enable effective AI assistance:

- **Context files**: Project background, tech stack, security requirements
- **Workflow documentation**: Development process, testing strategy, code standards
- **Feature documentation**: Detailed specifications and QA feedback

### API Documentation
API endpoints are documented using JSDoc comments and can be viewed at `/api/docs` when the server is running.

##  Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku/AWS)
```bash
npm run build
npm start
```

### Docker Deployment
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d
```

##  Configuration

### Environment Variables

#### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Template App
```

#### Backend (.env)
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/template_db
JWT_SECRET=your-secret-key
PORT=3001
```

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

##  Support

- Check the [documentation](.claude/) for detailed guides
- Open an issue for bug reports or feature requests
- Review the [code standards](.claude/workflows/code-standards.md) before contributing

##  Next Steps

After setting up the template:

1. Configure your database connection
2. Set up authentication providers
3. Add your specific business logic
4. Customize the UI components
5. Deploy to your preferred platform

This template provides a solid foundation for building modern web applications with best practices baked in.