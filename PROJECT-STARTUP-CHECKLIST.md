# 🚀 Project Startup Checklist

Complete this checklist when starting a new project from this template. Check off each item as you complete it.

---

## 📋 Pre-Project Setup

### 1. Project Planning
- [ ] Define project name and description
- [ ] Identify target users and use cases
- [ ] Define MVP scope and core features
- [ ] Set project timeline and milestones
- [ ] Identify team members and roles

### 2. Repository Setup
- [ ] Create new repository from this template on GitHub
- [ ] Clone repository to local machine
- [ ] Update project name in `package.json` files (root, frontend, backend)
- [ ] Update `README.md` with project-specific information
- [ ] Set up branch protection rules on GitHub (main, staging)

---

## 📝 Documentation Setup

### 3. Understand the Agent System (CRITICAL)
- [ ] **Read `.claude/agents/README.md`** - Understand specialized agents available
- [ ] Review available agents:
  - [ ] Frontend Agent - React, Tailwind, shadcn/ui development
  - [ ] Backend Agent - NestJS, Prisma, API development
  - [ ] DevOps Agent - AWS Amplify, CI/CD, infrastructure
  - [ ] QA/Testing Agent - Test automation, coverage analysis
  - [ ] Cybersecurity Agent - Security reviews, vulnerability assessment
  - [ ] Design Agent - UI/UX, accessibility, responsive design
  - [ ] Technical Writer Agent - Documentation, API docs
- [ ] **Read `.claude/workflows/using-subagents.md`** - Learn how to invoke agents
- [ ] Familiarize yourself with agent conventions (input/output formats)
- [ ] Review code patterns in `.claude/patterns/` for reference

### 4. Update Claude Documentation
- [ ] **claude.md** - Update with project overview and specific use case
- [ ] **.claude/context/company-context.md** - Add company mission and market context
- [ ] **.claude/context/tech-stack.md** - Verify tech stack matches project needs
- [ ] **.claude/context/aurora-identity-integration.md** - Configure auth flow details (if applicable)
- [ ] **.claude/context/security-requirements.md** - Add any industry-specific compliance needs
- [ ] **.claude/context/ui-design-guide.md** - Add project-specific design guidelines
- [ ] **.claude/context/design-system.md** - Update with your brand colors and design tokens

### 5. Feature Documentation
- [ ] Create feature documentation in `docs/features/[feature-name]/`
- [ ] Write `claude.md` for each major feature with:
  - [ ] User stories
  - [ ] Acceptance criteria
  - [ ] Technical specifications
- [ ] Create `qa-feedback.md` templates for each feature

### 6. Architecture Decision Records (ADRs)
- [ ] Review ADR template at `.claude/templates/adr-template.md`
- [ ] Create first ADR documenting why you chose this template
- [ ] Document any architectural decisions you make in `docs/adr/`
- [ ] Update `docs/adr/README.md` with your ADR list

---

## 🔐 Authentication & Services Setup

### 5. Clerk Setup (Development Environment)
- [ ] Sign up/log in to [Clerk Dashboard](https://dashboard.clerk.com)
- [ ] Create new application (give it your project name)
- [ ] **Development Instance**:
  - [ ] Copy Publishable Key (starts with `pk_test_`)
  - [ ] Copy Secret Key (starts with `sk_test_`)
- [ ] Configure allowed redirect URLs:
  - [ ] `http://localhost:5173` (local dev)
  - [ ] Your staging URL (e.g., `https://staging.yourdomain.com`)
- [ ] Set up social login providers (if needed):
  - [ ] Google
  - [ ] GitHub
  - [ ] Others as required

### 6. Clerk Setup (Production Environment - Later)
- [ ] Activate Production instance in Clerk dashboard
- [ ] Add production domain
- [ ] Copy Production keys (starts with `pk_live_` and `sk_live_`)
- [ ] Configure production redirect URLs
- [ ] Set up production social login credentials

### 7. Aurora Identity Setup (If Applicable)
- [ ] Contact Aurora Identity team for access
- [ ] Get staging API credentials
- [ ] Get production API credentials
- [ ] Review Aurora Identity integration documentation
- [ ] Test JWT token flow

### 8. Stripe Setup (If Using Payments - Later)
- [ ] Sign up/log in to [Stripe Dashboard](https://dashboard.stripe.com)
- [ ] **Test Mode** (for development and staging):
  - [ ] Copy Publishable Key (starts with `pk_test_`)
  - [ ] Copy Secret Key (starts with `sk_test_`)
  - [ ] Set up webhook endpoint for staging
  - [ ] Copy Webhook Secret (starts with `whsec_`)
- [ ] **Live Mode** (for production - do this later):
  - [ ] Copy Live Publishable Key (starts with `pk_live_`)
  - [ ] Copy Live Secret Key (starts with `sk_live_`)
  - [ ] Set up webhook endpoint for production
  - [ ] Copy Live Webhook Secret

---

## 🗄️ Database Setup

### 9. Local Development Database
- [ ] Install PostgreSQL locally (or use Docker)
- [ ] Create development database
- [ ] Note database credentials (user, password, host, port, database name)
- [ ] Test database connection

### 10. Staging Database
- [ ] Set up staging database on AWS RDS (or preferred hosting)
- [ ] Configure security groups and network access
- [ ] Note staging database connection string
- [ ] Run database migrations (when ready)

### 11. Production Database (Later)
- [ ] Set up production database on AWS RDS
- [ ] Configure security groups and network access
- [ ] Enable automated backups
- [ ] Note production database connection string

---

## ⚙️ Environment Variables Configuration

### 12. Local Development Environment

**Frontend (`frontend/.env.development`)**
- [ ] Copy `frontend/.env.example` to `frontend/.env.development`
- [ ] `VITE_CLERK_PUBLISHABLE_KEY` = [Your Clerk Dev Publishable Key]
- [ ] `VITE_API_URL` = `http://localhost:3001`
- [ ] `VITE_NODE_ENV` = `development`
- [ ] `VITE_USE_AURORA_IDENTITY` = `true` or `false`
- [ ] `VITE_AURORA_IDENTITY_API_URL` = [Aurora staging URL] (if applicable)
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` = [Stripe test key] (if applicable)

**Backend (`backend/.env.development`)**
- [ ] Copy `backend/.env.example` to `backend/.env.development`
- [ ] `NODE_ENV` = `development`
- [ ] `PORT` = `3001`
- [ ] `CORS_ORIGIN` = `http://localhost:5173`
- [ ] `CLERK_PUBLISHABLE_KEY` = [Your Clerk Dev Publishable Key]
- [ ] `CLERK_SECRET_KEY` = [Your Clerk Dev Secret Key]
- [ ] `JWT_SECRET` = [Generate with `openssl rand -base64 32`]
- [ ] `REFRESH_TOKEN_SECRET` = [Generate with `openssl rand -base64 32`]
- [ ] `DATABASE_URL` = [Your local PostgreSQL connection string]
- [ ] `STRIPE_SECRET_KEY` = [Stripe test secret] (if applicable)
- [ ] `STRIPE_WEBHOOK_SECRET` = [Stripe webhook secret] (if applicable)
- [ ] `AURORA_IDENTITY_API_URL` = [Aurora staging URL] (if applicable)
- [ ] `AURORA_IDENTITY_API_KEY` = [Aurora staging key] (if applicable)

### 13. Verify Local Setup
- [ ] Run `npm run install:all` to install dependencies
- [ ] Run `npm run dev` to start both frontend and backend
- [ ] Visit `http://localhost:5173` and verify app loads
- [ ] Test authentication flow (sign up/sign in)
- [ ] Verify backend API is accessible at `http://localhost:3001/health`

---

## ☁️ AWS Amplify Setup

### 14. Connect Repository
- [ ] Log in to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
- [ ] Click "New app" > "Host web app"
- [ ] Connect your GitHub repository
- [ ] Grant Amplify access to your repository

### 15. Configure Build Settings
- [ ] Verify Amplify detected `amplify.yml` automatically
- [ ] Set app name
- [ ] Configure build settings (should auto-detect from amplify.yml)

### 16. Set Up Branch Deployments
- [ ] **Staging Branch**:
  - [ ] Add `staging` branch for deployment
  - [ ] Enable auto-deploy on push
- [ ] **Production Branch** (do later):
  - [ ] Add `main` branch for deployment
  - [ ] Enable auto-deploy on push
  - [ ] Consider enabling manual promotion from staging

### 17. Configure Staging Environment Variables in Amplify
- [ ] Go to App Settings > Environment Variables
- [ ] Select `staging` branch
- [ ] Add all frontend environment variables (with `VITE_` prefix):
  - [ ] `VITE_CLERK_PUBLISHABLE_KEY` = [Clerk Dev pk_test_]
  - [ ] `VITE_API_URL` = [Your staging backend URL]
  - [ ] `VITE_NODE_ENV` = `staging`
  - [ ] Add others as needed from `.env.example`
- [ ] Add all backend environment variables:
  - [ ] `NODE_ENV` = `staging`
  - [ ] `CLERK_PUBLISHABLE_KEY` = [Clerk Dev pk_test_]
  - [ ] `CLERK_SECRET_KEY` = [Clerk Dev sk_test_] ⚠️
  - [ ] `JWT_SECRET` = [Unique staging secret] ⚠️
  - [ ] `REFRESH_TOKEN_SECRET` = [Unique staging secret] ⚠️
  - [ ] `DATABASE_URL` = [Staging database URL] ⚠️
  - [ ] `CORS_ORIGIN` = [Staging frontend URL]
  - [ ] Add Stripe, Aurora Identity, and other secrets as needed

### 18. Configure Production Environment Variables (Later)
- [ ] Select `main` branch in Amplify Console
- [ ] Add all frontend environment variables with **production** values
- [ ] Add all backend environment variables with **production** values
- [ ] Use Clerk Production keys (pk_live_*, sk_live_*)
- [ ] Use Stripe Live keys (pk_live_*, sk_live_*)
- [ ] Use unique JWT secrets (different from staging)
- [ ] Use production database URL

### 19. Deploy Staging
- [ ] Push to `staging` branch
- [ ] Monitor Amplify build process
- [ ] Verify build succeeds
- [ ] Test staging deployment
- [ ] Verify authentication works
- [ ] Check API connectivity

---

## 🧪 Testing Setup

### 20. Playwright Configuration
- [ ] Review `playwright.config.ts`
- [ ] Update base URLs if needed
- [ ] Add any project-specific test configuration

### 21. Write Initial Tests
- [ ] Create E2E tests for main user flows
- [ ] Test authentication flow
- [ ] Test critical features
- [ ] Run tests locally: `npm run test:e2e`

### 22. CI/CD Testing (Optional)
- [ ] Set up GitHub Actions for automated testing
- [ ] Configure test runs on pull requests
- [ ] Set up test reporting

---

## 📊 Monitoring & Analytics (Optional)

### 23. Error Tracking
- [ ] Set up Sentry or similar error tracking
- [ ] Add error tracking to frontend
- [ ] Add error tracking to backend
- [ ] Configure error alerts

### 24. Analytics
- [ ] Set up Google Analytics or similar
- [ ] Add analytics to frontend
- [ ] Configure goal tracking
- [ ] Set up conversion funnels

---

## 🔒 Security Hardening

### 25. Security Review
- [ ] Review `.gitignore` - ensure no secrets committed
- [ ] Verify all `.env` files are git-ignored
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Review CORS settings
- [ ] Enable rate limiting in production
- [ ] Review authentication flows

### 26. Secrets Rotation Plan
- [ ] Document when to rotate JWT secrets (quarterly recommended)
- [ ] Set calendar reminders for secret rotation
- [ ] Document incident response plan

---

## 📚 Final Documentation

### 27. Update Project Documentation
- [ ] Complete README.md with project-specific details
- [ ] Document custom features
- [ ] Add API documentation
- [ ] Document environment setup for team members
- [ ] Create contributing guidelines

### 28. Team Onboarding
- [ ] Share repository access with team
- [ ] Provide access to Clerk dashboard (if needed)
- [ ] Provide access to AWS Amplify console (if needed)
- [ ] Share Stripe dashboard access (if needed)
- [ ] Walk team through local development setup

---

## 🚢 Production Launch Preparation (Do Before Going Live)

### 29. Production Readiness
- [ ] Activate Clerk Production instance
- [ ] Configure Clerk production keys in Amplify
- [ ] Switch Stripe to Live mode
- [ ] Set up production database with backups
- [ ] Configure custom domain in Amplify
- [ ] Set up SSL certificate (auto via Amplify)
- [ ] Update CORS to production domain
- [ ] Configure production webhook endpoints

### 30. Pre-Launch Testing
- [ ] Complete security audit
- [ ] Load testing
- [ ] Full E2E testing in production environment
- [ ] Verify all integrations work
- [ ] Test payment flow with real cards (small amounts)
- [ ] Verify email notifications
- [ ] Test error handling and logging

### 31. Launch
- [ ] Push to `main` branch
- [ ] Monitor Amplify deployment
- [ ] Verify production site loads
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Communicate launch to stakeholders

---

## ✅ Post-Launch

### 32. Maintenance
- [ ] Set up monitoring dashboards
- [ ] Schedule regular dependency updates
- [ ] Plan feature releases
- [ ] Monitor user feedback
- [ ] Track GitHub Issues
- [ ] Regular security audits

---

## 🤖 Working with Claude Code Agents

### 33. Agent-Assisted Development (For Your Team)

When working with Claude Code on this project, team members should:

**Initial Setup (One-Time)**
- [ ] Ensure team has access to Claude Code (VS Code extension or CLI)
- [ ] Brief team on the agent system (`.claude/agents/README.md`)
- [ ] Show examples of invoking specialized agents
- [ ] Explain agent coordination for multi-step features

**Daily Development Workflow**

**Starting a New Feature**:
1. [ ] Ask Design Agent for UI/UX specifications
2. [ ] Ask Frontend Agent to implement components
3. [ ] Ask Backend Agent to create API endpoints
4. [ ] Ask QA/Testing Agent to write test suite
5. [ ] Ask Cybersecurity Agent for security review
6. [ ] Ask Technical Writer Agent to document the feature
7. [ ] Ask DevOps Agent to deploy to staging

**Example Agent Invocation**:
```
"I need help from the Frontend Agent to create a user dashboard component.

Task: Create UserDashboard component
Requirements:
- Display user stats (notifications, activity, profile)
- Responsive design (mobile-first)
- Loading and error states
- Accessible (WCAG 2.1 AA)
- Use shadcn/ui components

Please follow the conventions in .claude/agents/frontend-agent.md"
```

**Best Practices**:
- [ ] Always reference the specific agent configuration file
- [ ] Provide structured input (task, requirements, context)
- [ ] Use code patterns from `.claude/patterns/`
- [ ] Document significant decisions in ADRs
- [ ] Use templates from `.claude/templates/` for issues

**Agent Handoffs**:
- [ ] When one agent completes work, provide handoff to next agent
- [ ] Include: files changed, API requirements, next steps
- [ ] Example: "Frontend Agent to Backend Agent handoff: Created UserProfile component, needs GET /api/users/:id endpoint"

**Quality Checks**:
- [ ] Frontend: Accessibility, responsive, TypeScript strict
- [ ] Backend: Input validation, auth checks, error handling
- [ ] Testing: >80% coverage on critical paths
- [ ] Security: No vulnerabilities, proper auth
- [ ] Documentation: API docs, user guides up to date

---

## 📖 Key Resources for Team

**Agent Documentation** (`.claude/agents/`):
- Frontend Agent, Backend Agent, DevOps Agent
- QA/Testing Agent, Cybersecurity Agent
- Design Agent, Technical Writer Agent

**Code Patterns** (`.claude/patterns/`):
- `frontend-patterns.md` - React components, hooks, styling
- `backend-patterns.md` - Controllers, services, API design

**Templates** (`.claude/templates/`):
- `bug-report.md` - Structured bug reporting
- `feature-request.md` - Feature planning
- `security-finding.md` - Security vulnerability reporting
- `adr-template.md` - Architecture decision records

**Workflows** (`.claude/workflows/`):
- `using-subagents.md` - How to invoke and coordinate agents
- `development-process.md` - Development workflow
- `testing-strategy.md` - Testing approach
- `code-standards.md` - Code quality standards

---

## 🎉 You're Ready!

Once you've completed the relevant sections above, your project is set up and ready for development. Remember:

1. **Use the agent system** - Specialized agents provide expert guidance
2. **Document decisions** - Use ADRs for significant architectural choices
3. **Follow patterns** - Reference `.claude/patterns/` for consistency
4. **Test thoroughly** - Aim for >80% coverage on critical paths
5. **Security first** - Get Cybersecurity Agent review before deployment
6. **Keep docs updated** - Update as you build

**Questions?** Check:
- `README.md` - Project overview
- `claude.md` - Claude Code quick start
- `.claude/agents/README.md` - Agent system guide
- GitHub Discussions - Team knowledge base

---

## 📝 Notes & Customizations

Use this section to add project-specific checklist items:

- [ ] _[Add your custom item here]_
- [ ] _[Add your custom item here]_
- [ ] _[Add your custom item here]_

---

## 🆘 Troubleshooting Resources

If you encounter issues, refer to:

- **Setup Guide**: `docs/aws-amplify-secrets-setup.md`
- **Secrets Management**: `.claude/context/secrets-management.md`
- **Development Process**: `.claude/workflows/development-process.md`
- **Testing Strategy**: `.claude/workflows/testing-strategy.md`

---

**🎉 Congratulations! Your project is ready to build!**

Keep this checklist updated as your project evolves and add any project-specific setup steps.
