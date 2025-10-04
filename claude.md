# Template Project

> **IMPORTANT FOR CLAUDE CODE**: When starting work on a new project created from this template, immediately read `.claude/agents/README.md` to understand the specialized agent system. Use the appropriate specialized agents (Frontend, Backend, DevOps, QA/Testing, Cybersecurity, Design, Technical Writer) for domain-specific tasks by referencing their configuration files in `.claude/agents/`.

> **CRITICAL - CI/CD WORKFLOW**: This project uses a **staging-first deployment strategy**. **NEVER push directly to main branch**. All changes must go through staging for testing first. Read `docs/CI-CD-WORKFLOW.md` immediately before making any code changes.

---

## Project Overview

This is a full-stack template project designed to serve as a foundation for enterprise-grade applications. It provides a standardized development environment with specialized AI agent support for consistent, high-quality development.

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Component Library**: shadcn/ui (built on Radix UI)
- **Auth**: Clerk React SDK
- **Testing**: Vitest + React Testing Library
- **E2E Testing**: Playwright

### Backend
- **Runtime**: Node.js 18+
- **Framework**: NestJS (or Express)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: Clerk (JWT verification)
- **Testing**: Jest

### Infrastructure
- **Hosting**: AWS Amplify
- **Database**: AWS RDS (PostgreSQL)
- **CI/CD**: GitHub Actions
- **Secrets**: AWS Secrets Manager

### Development Tools
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky
- **Commit Standards**: Commitlint
- **Package Manager**: npm

## Project Structure

```
Template/
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/       # React components (ui/, layout/, features/)
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API clients and services
│   │   ├── lib/             # Utilities
│   │   └── test/            # Test utilities
│   ├── vite.config.ts       # Vite configuration
│   └── vitest.config.ts     # Vitest configuration
├── backend/                  # Node.js backend application
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # Route definitions
│   │   ├── config/          # Configuration
│   │   └── utils/           # Utilities
│   ├── prisma/              # Prisma schema and migrations
│   └── jest.config.js       # Jest configuration
├── e2e/                     # Playwright E2E tests
├── .claude/                 # Claude Code configuration
│   ├── agents/              # Specialized agent configurations
│   ├── context/             # Project context files
│   ├── workflows/           # Development workflows
│   ├── patterns/            # Code patterns and examples
│   ├── prompts/             # Reusable prompts
│   └── templates/           # Issue and doc templates
├── docs/                    # Documentation
│   ├── adr/                # Architecture Decision Records
│   └── aws-amplify-secrets-setup.md
├── scripts/                 # Utility scripts
├── .github/workflows/       # GitHub Actions CI/CD
├── amplify.yml             # AWS Amplify build configuration
└── PROJECT-STARTUP-CHECKLIST.md  # Setup checklist for new projects
```

## Agent System

This template includes specialized AI agents for consistent development:

### Available Agents
1. **Frontend Agent** - React, Tailwind, shadcn/ui development
2. **Backend Agent** - NestJS, Prisma, API development
3. **DevOps Agent** - AWS Amplify, CI/CD, infrastructure
4. **QA/Testing Agent** - Test automation, coverage analysis
5. **Cybersecurity Agent** - Security reviews, vulnerability assessment
6. **Design Agent** - UI/UX, accessibility, responsive design
7. **Technical Writer Agent** - Documentation, API docs, guides

### How to Use Agents

**For Claude Code**: When working on domain-specific tasks, reference the appropriate agent configuration:

```
"I need help from the [Agent Name] to [task].

[Provide context and requirements]

Please follow the conventions in .claude/agents/[agent-name].md"
```

See `.claude/agents/README.md` for detailed usage and coordination between agents.

## Getting Started

### For Humans (Project Setup)

Follow the comprehensive checklist in `PROJECT-STARTUP-CHECKLIST.md` which includes:
1. Environment setup
2. Dependency installation
3. Configuration files setup
4. Third-party service configuration (Clerk, AWS, etc.)
5. Database setup
6. Testing the installation

### For Claude Code (Starting Work)

**CRITICAL - Read these files first**:

1. **`docs/CI-CD-WORKFLOW.md`** - **MUST READ FIRST** - Understand the staging-first deployment workflow
2. **`.claude/agents/README.md`** - Understand the agent system and how to invoke specialized agents
3. **`.claude/context/tech-stack.md`** - Understand the complete tech stack
4. **`.claude/context/security-requirements.md`** - Understand security requirements
5. **`.claude/workflows/development-process.md`** - Understand development workflow

**When starting a new task**:
- Identify which specialized agent is appropriate (Frontend, Backend, DevOps, etc.)
- Reference their configuration in `.claude/agents/[agent-name].md`
- Follow their input/output conventions
- Use code patterns from `.claude/patterns/`

**For multi-step features**:
- Coordinate multiple agents following the workflow in `.claude/agents/README.md`
- Document architectural decisions using the ADR template in `.claude/templates/adr-template.md`

## Key Documentation Files

### For Claude Code
- **`.claude/agents/README.md`** - Agent system guide (READ FIRST)
- **`.claude/workflows/using-subagents.md`** - How to use agents effectively
- **`.claude/patterns/frontend-patterns.md`** - Frontend code patterns
- **`.claude/patterns/backend-patterns.md`** - Backend code patterns
- **`.claude/context/*.md`** - Project context (tech stack, security, etc.)

### For Humans
- **`PROJECT-STARTUP-CHECKLIST.md`** - Step-by-step setup guide
- **`README.md`** - Project readme
- **`docs/adr/`** - Architecture decisions
- **`.claude/agents/*.md`** - Reference for understanding agent capabilities

## Development Workflows

### Git Workflow (CRITICAL - MUST FOLLOW)

**⚠️ NEVER COMMIT DIRECTLY TO MAIN BRANCH ⚠️**

```bash
# 1. Create feature branch from staging
git checkout staging
git pull origin staging
git checkout -b feature/your-feature-name

# 2. Make changes and commit
git add .
git commit -m "Your commit message"

# 3. Push to staging (NOT main)
git push origin feature/your-feature-name
# OR merge to staging directly for simple changes

# 4. Tests run automatically on staging
# 5. AWS Amplify deploys to staging environment
# 6. After human testing/approval, create PR: staging → main
# 7. After PR approval, main deploys to production
```

**Read `docs/CI-CD-WORKFLOW.md` for complete workflow details.**

### Starting a New Feature
1. **Design** - Use Design Agent for UI/UX specs
2. **Frontend** - Use Frontend Agent for React components
3. **Backend** - Use Backend Agent for API endpoints
4. **Testing** - Use QA/Testing Agent for test suite
5. **Security Review** - Use Cybersecurity Agent
6. **Documentation** - Use Technical Writer Agent
7. **Deploy to Staging** - Use DevOps Agent, push to staging branch
8. **Human Testing** - Wait for approval in staging
9. **Deploy to Production** - Create PR from staging → main

See `.claude/agents/README.md` for detailed multi-agent workflows.

### Code Standards
- TypeScript strict mode (no `any` types)
- >80% test coverage for critical paths
- WCAG 2.1 AA accessibility compliance
- All API endpoints require authentication
- Follow patterns in `.claude/patterns/`

See `.claude/workflows/code-standards.md` for complete standards.

## Quick Commands

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:5173)
npm run build       # Production build
npm test            # Run unit tests
npm run test:coverage  # Test coverage
```

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:3001)
npm run build       # Production build
npm test            # Run unit tests
npx prisma studio   # Database GUI
npx prisma migrate dev  # Run migrations
```

### E2E Tests
```bash
npm run test:e2e    # Run Playwright tests
```

### Full Stack
```bash
npm install         # Install all dependencies (root, frontend, backend)
```

## Environment Variables

Required environment variables are documented in:
- `frontend/.env.example`
- `backend/.env.example`

**For production**: Configure in AWS Amplify Console > Environment Variables

See `docs/aws-amplify-secrets-setup.md` for detailed setup.

## CI/CD Pipeline

**Workflow**: Feature Branch → Staging → Testing → Approval → Main → Production

### GitHub Actions Workflows

1. **`.github/workflows/ci.yml`** - Staging Tests
   - Triggers: Push to `staging` branch
   - Runs: Lint, type-check, unit tests, E2E tests, build
   - Duration: ~10-15 minutes

2. **`.github/workflows/deploy-staging.yml`** - Staging Deployment
   - Triggers: Push to `staging` branch
   - Action: Deploy to AWS Amplify staging environment
   - URL: `https://staging.your-app.amplifyapp.com`

3. **`.github/workflows/staging-to-main.yml`** - Production Gate
   - Triggers: PR to `main` branch
   - Validation: Ensures PR is from `staging` branch only
   - Runs: Final validation, security audit
   - Requires: Human approval

4. **`.github/workflows/deploy-production.yml`** - Production Deployment
   - Triggers: Merge to `main` branch
   - Action: Deploy to AWS Amplify production
   - Creates: Release tag
   - URL: `https://your-app.amplifyapp.com`

5. **`.github/workflows/security-scan.yml`** - Security Scanning
   - Triggers: All pushes
   - Scans: Dependencies, secrets, vulnerabilities

### AWS Amplify Configuration
- `amplify.yml` - Build and deployment configuration
- Staging branch → Staging environment
- Main branch → Production environment

### Branch Protection

**Main Branch**:
- ❌ Direct pushes: DISABLED
- ✅ Requires PR from staging only
- ✅ Requires human approval
- ✅ All tests must pass

**Staging Branch**:
- ✅ Accepts feature branches
- ✅ Requires tests to pass
- ✅ Auto-deploys to staging environment

**See `docs/CI-CD-WORKFLOW.md` for complete documentation.**

## Support & Resources

- **Agent Documentation**: `.claude/agents/` - Specialized agent configurations
- **Code Patterns**: `.claude/patterns/` - Reference implementations
- **Templates**: `.claude/templates/` - Issue and doc templates
- **ADRs**: `docs/adr/` - Architecture decisions
- **AWS Setup**: `docs/aws-amplify-secrets-setup.md`

---

**Remember**: This is a template. Customize it for your specific project needs. Document significant decisions in ADRs (`docs/adr/`) using the template at `.claude/templates/adr-template.md`.