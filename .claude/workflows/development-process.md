# Development Process

## Git Workflow

### Branch Strategy
- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/**: Feature development branches
- **hotfix/**: Critical bug fixes
- **release/**: Release preparation

### Commit Convention
```
type(scope): description

feat(auth): add JWT token refresh functionality
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
style(format): apply prettier formatting
refactor(api): restructure user service
test(unit): add tests for user validation
chore(deps): update dependencies
```

### Pull Request Process
1. Create feature branch from develop
2. Implement feature with tests
3. Run linting and type checking
4. Submit PR with descriptive title and description
5. Code review by team member
6. Merge to develop after approval

## AWS Amplify Deployment Pipeline

### Environment Configuration
```yaml
# amplify.yml
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - cd frontend
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: frontend/dist
        files:
          - '**/*'
  - backend:
      phases:
        preBuild:
          commands:
            - cd backend
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: backend/dist
        files:
          - '**/*'
```

### Deployment Stages
1. **Development**: Auto-deploy from develop branch
2. **Staging**: Auto-deploy from release branches
3. **Production**: Manual promotion from staging

### Environment Variables
```bash
# Frontend (.env)
VITE_API_URL=https://api.example.com
VITE_AUTH_DOMAIN=auth.example.com

# Backend (.env)
DATABASE_URL=postgresql://...
JWT_SECRET=...
CORS_ORIGIN=https://app.example.com
```

## Code Quality Gates

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

### CI/CD Pipeline
1. **Lint**: ESLint and Prettier checks
2. **Type Check**: TypeScript compilation
3. **Test**: Unit and integration tests
4. **Build**: Production build verification
5. **Deploy**: Automated deployment to target environment

## Development Setup

### Local Environment
```bash
# Clone repository
git clone <repository-url>
cd template

# Install dependencies
npm install
cd frontend && npm install
cd ../backend && npm install

# Start development servers
npm run dev:frontend  # Starts Vite dev server
npm run dev:backend   # Starts Node.js server with nodemon
```

### Database Setup
```bash
# PostgreSQL with Docker
docker run --name template-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

# Run migrations
cd backend
npx prisma migrate dev
npx prisma generate
```

## Code Review Guidelines

### Review Checklist
- [ ] Code follows project conventions
- [ ] Tests cover new functionality
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Accessibility standards met

### Review Process
1. Automated checks pass (CI/CD)
2. Manual code review by peer
3. Test functionality in review app
4. Approve and merge or request changes