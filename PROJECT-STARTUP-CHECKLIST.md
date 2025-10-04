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

### 3. Update Claude Documentation
- [ ] **claude.md** - Update with project overview and specific use case
- [ ] **.claude/context/company-context.md** - Add Aurora Nexus mission and market context
- [ ] **.claude/context/tech-stack.md** - Verify tech stack matches project needs
- [ ] **.claude/context/aurora-identity-integration.md** - Configure auth flow details
- [ ] **.claude/context/security-requirements.md** - Add any industry-specific compliance needs
- [ ] **.claude/context/ui-design-guide.md** - Add project-specific design guidelines

### 4. Feature Documentation
- [ ] Create feature documentation in `docs/features/[feature-name]/`
- [ ] Write `claude.md` for each major feature with:
  - [ ] User stories
  - [ ] Acceptance criteria
  - [ ] Technical specifications
- [ ] Create `qa-feedback.md` templates for each feature

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
