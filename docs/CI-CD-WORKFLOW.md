# CI/CD Workflow and Branch Strategy

## Overview

This project uses a **staging-first deployment strategy** where all code changes must be tested in staging before being promoted to production.

```
Feature Branch → Staging → (Tests + AWS Amplify) → Human Approval → Main → Production
```

## Branch Strategy

### Main Branch (Production)
- **Protected**: Direct pushes are **NOT ALLOWED**
- **Purpose**: Production-ready code only
- **Deployment**: Automatically deploys to AWS Amplify production environment
- **Access**: Only receives code from staging branch via approved PRs

### Staging Branch (Pre-Production)
- **Purpose**: Integration and testing environment
- **Deployment**: Automatically deploys to AWS Amplify staging environment
- **Testing**: Full CI test suite runs on every push
- **Access**: Receives code from feature branches and direct commits

### Feature Branches
- **Naming**: `feature/description`, `bugfix/description`, `hotfix/description`
- **Purpose**: Development work
- **Merge Target**: Always merge into `staging` first

## Workflow Steps

### 1. Development Phase

```bash
# Create feature branch from staging
git checkout staging
git pull origin staging
git checkout -b feature/your-feature-name

# Make your changes
# Commit as needed

# Push feature branch
git push origin feature/your-feature-name
```

### 2. Merge to Staging

```bash
# Option A: Direct push to staging (for simple changes)
git checkout staging
git pull origin staging
git merge feature/your-feature-name
git push origin staging

# Option B: Create PR to staging (recommended for team review)
# Create PR on GitHub: feature/your-feature-name → staging
```

**What happens automatically:**
-  CI workflow runs (lint, type-check, unit tests, E2E tests, build)
-  Security scan runs
-  AWS Amplify deploys to staging environment
- 📧 Team notification sent

### 3. Testing in Staging

Once staging deployment completes:

1. **Automated Testing**: GitHub Actions runs full test suite
2. **Manual Testing**: QA team tests on staging environment
3. **Stakeholder Review**: Product/business review if needed
4. **Performance Testing**: Load testing if required
5. **Security Review**: For security-sensitive changes

**Staging Environment URLs:**
- Frontend: `https://staging.your-app.amplifyapp.com`
- Backend API: `https://staging-api.your-app.amplifyapp.com`

### 4. Promotion to Production

When staging is stable and approved:

```bash
# Create PR from staging to main
git checkout staging
git pull origin staging
gh pr create --base main --head staging --title "Production Release $(date +%Y-%m-%d)" --body "Promoting tested changes from staging to production"
```

**What happens automatically:**
-  Verifies PR is from staging branch only
-  Runs final validation tests
-  Security audit
-   **Requires human approval**
-  After approval: Deploys to production
-   Creates release tag

### 5. Production Deployment

After PR is approved and merged:

-  Main branch updated
-  AWS Amplify production deployment triggered
-  Release tag created (`release-YYYYMMDD-HHMMSS`)
- 📧 Production deployment notification sent

## GitHub Actions Workflows

### CI - Staging Tests (`.github/workflows/ci.yml`)

**Triggers**: Push or PR to `staging`

**Jobs**:
1. Lint frontend and backend
2. Type checking
3. Frontend unit tests
4. Backend unit tests (with PostgreSQL)
5. E2E tests (Playwright)
6. Build verification

**Duration**: ~10-15 minutes

### Deploy to Staging (`.github/workflows/deploy-staging.yml`)

**Triggers**: Push to `staging`

**Actions**:
1. Run tests
2. Configure AWS credentials
3. Trigger AWS Amplify staging deployment
4. Send notifications

### Staging to Main Promotion (`.github/workflows/staging-to-main.yml`)

**Triggers**: PR to `main`

**Validations**:
1.  Verifies PR source is `staging` branch
2.  Runs lint and type checks
3.  Runs all tests
4.  Runs security audit
5.  Requires human approval

### Deploy to Production (`.github/workflows/deploy-production.yml`)

**Triggers**: Push to `main` (after PR merge)

**Actions**:
1. Configure AWS credentials
2. Trigger AWS Amplify production deployment
3. Create release tag
4. Send production deployment notifications
5. Rollback support on failure

## Branch Protection Rules

### Required GitHub Settings

Configure these in **Settings → Branches → Branch protection rules**:

#### Main Branch Protection

```yaml
Branch name pattern: main

Settings:
 Require a pull request before merging
   Require approvals: 1
   Dismiss stale pull request approvals when new commits are pushed
   Require review from Code Owners
 Require status checks to pass before merging
   Require branches to be up to date before merging
  Required checks:
    - verify-source-branch
    - final-validation
    - security-check
 Require conversation resolution before merging
 Require signed commits (recommended)
 Include administrators
 Restrict who can push to matching branches
  - Only allow staging branch
 Allow force pushes: Everyone (DISABLED)
 Allow deletions (DISABLED)
```

#### Staging Branch Protection

```yaml
Branch name pattern: staging

Settings:
 Require status checks to pass before merging
   Require branches to be up to date before merging
  Required checks:
    - lint
    - type-check
    - test-frontend
    - test-backend
    - test-e2e
    - build
 Require conversation resolution before merging
 Require pull request (optional - allows direct pushes)
 Allow force pushes: No one
 Allow deletions (DISABLED)
```

## Required Secrets

Configure in **Settings → Secrets and variables → Actions**:

### Required Secrets
- `AWS_ACCESS_KEY_ID`: AWS credentials for Amplify
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `CODECOV_TOKEN`: (Optional) For code coverage reports
- `SLACK_WEBHOOK`: (Optional) For team notifications

### Environment Secrets

**Staging Environment**:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

**Production Environment**:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## AWS Amplify Setup

### Staging Environment

1. Connect staging branch to Amplify
2. Configure build settings from `amplify.yml`
3. Set environment variables:
   - `VITE_API_URL`: Staging API URL
   - `VITE_CLERK_PUBLISHABLE_KEY`: Staging Clerk key
   - Backend environment variables from `.env.example`

### Production Environment

1. Connect main branch to Amplify
2. Configure build settings from `amplify.yml`
3. Set environment variables:
   - `VITE_API_URL`: Production API URL
   - `VITE_CLERK_PUBLISHABLE_KEY`: Production Clerk key
   - Backend production environment variables

## Quick Reference

### For Developers

```bash
# Daily workflow
git checkout staging
git pull origin staging
git checkout -b feature/my-feature
# ... make changes ...
git push origin feature/my-feature
# Create PR to staging, get reviewed, merge
```

### For Release Managers

```bash
# When staging is stable
git checkout staging
git pull origin staging
gh pr create --base main --head staging --title "Release YYYY-MM-DD"
# Get approval, merge PR
# Production deploys automatically
```

### Emergency Hotfix

```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix
# ... fix issue ...
git push origin hotfix/critical-fix

# Merge to staging first
gh pr create --base staging --head hotfix/critical-fix
# After staging approval and testing

# Then promote to main
git checkout staging
gh pr create --base main --head staging --title "Hotfix: [description]"
```

## Rollback Procedure

If production deployment fails:

1. Check AWS Amplify console for error details
2. Use Amplify's rollback feature to previous deployment
3. Create hotfix branch from last known good commit
4. Follow hotfix procedure above

## Monitoring

- **GitHub Actions**: Monitor workflow runs in Actions tab
- **AWS Amplify**: Check deployment status in AWS Console
- **Logs**: CloudWatch logs for backend, Amplify logs for frontend
- **Alerts**: Slack notifications for deployment status

## Best Practices

###  DO
- Always test in staging before production
- Keep staging and main in sync
- Write comprehensive tests
- Review changes before merging to staging
- Get human approval for production releases
- Tag production releases
- Monitor deployments

###  DON'T
- Never push directly to main
- Don't skip staging testing
- Don't merge untested code to staging
- Don't bypass branch protection rules
- Don't force push to main or staging
- Don't deploy on Fridays (unless necessary)

## Troubleshooting

### "Pull requests to main must come from staging branch only"

**Problem**: Trying to merge feature branch directly to main

**Solution**: Merge feature branch to staging first, then create PR from staging to main

### "Status checks failed"

**Problem**: CI tests failing on staging

**Solution**: Fix failing tests, push to staging branch, wait for green checks

### "Deployment failed in Amplify"

**Problem**: AWS Amplify build failed

**Solution**:
1. Check Amplify console for error logs
2. Verify environment variables are set
3. Test build locally: `npm run build`
4. Fix issues and push again

### "Merge conflict in staging → main PR"

**Problem**: Main branch has diverged from staging

**Solution**:
```bash
git checkout staging
git pull origin main
# Resolve conflicts
git push origin staging
# Update PR
```

## Support

- **CI/CD Issues**: Check `.github/workflows/` configurations
- **AWS Issues**: Contact DevOps team or check AWS Amplify docs
- **Questions**: See `PROJECT-STARTUP-CHECKLIST.md` or ask in team chat
