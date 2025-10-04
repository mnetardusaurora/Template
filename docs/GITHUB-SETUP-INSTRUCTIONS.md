# GitHub Repository Setup Instructions

Follow these steps to configure your GitHub repository for the staging-first CI/CD workflow.

## 🎯 Overview

This guide will help you configure:
1. Branch protection rules for `main` and `staging`
2. GitHub Actions secrets
3. Verification that everything works

**Total Time**: 15-20 minutes

---

## 📋 Prerequisites

- [x] Repository created on GitHub
- [x] `main` branch exists
- [x] `staging` branch created and pushed
- [ ] Admin access to the repository

---

## Step 1: Configure Main Branch Protection

### Navigate to Branch Protection Settings

1. Go to your GitHub repository
2. Click **Settings** (top navigation)
3. Click **Branches** (left sidebar)
4. Click **Add rule** or **Add branch protection rule**

### Main Branch Configuration

**Branch name pattern**: `main`

#### Pull Request Settings
- ✅ **Require a pull request before merging**
  - ✅ **Require approvals**: Set to `1` (or more for team review)
  - ✅ **Dismiss stale pull request approvals when new commits are pushed**
  - ✅ **Require review from Code Owners** (optional, if using CODEOWNERS file)
  - ❌ **Require approval of the most recent reviewable push** (optional)

#### Status Check Settings
- ✅ **Require status checks to pass before merging**
  - ✅ **Require branches to be up to date before merging**
  - **Required status checks** (will appear after first workflow run):
    - `verify-source-branch` ⚠️ CRITICAL - Only allows PRs from staging
    - `final-validation`
    - `security-check`
    - `approval-required`

> **Note**: Status checks won't appear in the list until the workflows run at least once. You can add them later after your first staging deployment.

#### Additional Settings
- ✅ **Require conversation resolution before merging**
- ✅ **Require signed commits** (recommended for security)
- ✅ **Require linear history** (recommended for clean git history)
- ✅ **Include administrators** ⚠️ CRITICAL - Ensures admins can't bypass rules

#### Restrict Push Access
- ✅ **Restrict who can push to matching branches**
  - Leave empty or add only CI/CD service accounts
  - This effectively **disables direct pushes to main**

#### Force Push & Deletion
- ❌ **Allow force pushes**: DISABLED (default)
- ❌ **Allow deletions**: DISABLED (default)

### Save Main Branch Rules

Click **Create** or **Save changes**

---

## Step 2: Configure Staging Branch Protection

### Create Staging Branch Rule

1. Still in **Settings → Branches**
2. Click **Add rule** again

**Branch name pattern**: `staging`

#### Status Check Settings
- ✅ **Require status checks to pass before merging**
  - ✅ **Require branches to be up to date before merging**
  - **Required status checks** (will appear after first workflow run):
    - `lint`
    - `type-check`
    - `test-frontend`
    - `test-backend`
    - `test-e2e`
    - `build`

> **Note**: These status checks come from `.github/workflows/ci.yml` and will appear after the first push to staging.

#### Additional Settings
- ✅ **Require conversation resolution before merging** (if using PRs to staging)
- ❌ **Require pull request** - OPTIONAL (allows direct pushes to staging for quick iterations)

#### Force Push & Deletion
- ❌ **Allow force pushes**: DISABLED (default)
- ❌ **Allow deletions**: DISABLED (default)

### Save Staging Branch Rules

Click **Create** or **Save changes**

---

## Step 3: Configure GitHub Actions Secrets

### Navigate to Secrets Settings

1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**

### Required Secrets

Add the following secrets one by one:

#### AWS Credentials

1. **Secret Name**: `AWS_ACCESS_KEY_ID`
   - **Value**: Your AWS access key ID for Amplify deployments
   - Click **Add secret**

2. **Secret Name**: `AWS_SECRET_ACCESS_KEY`
   - **Value**: Your AWS secret access key
   - Click **Add secret**

> **How to get AWS credentials**:
> - Go to AWS Console → IAM
> - Create a new user or use existing service account
> - Attach policy: `AdministratorAccess-Amplify` (or create custom policy)
> - Generate access keys
> - Copy the keys to GitHub secrets

#### Optional Secrets

3. **Secret Name**: `CODECOV_TOKEN` (optional)
   - **Value**: Your Codecov token for coverage reports
   - Get from: https://codecov.io
   - Click **Add secret**

4. **Secret Name**: `SLACK_WEBHOOK` (optional)
   - **Value**: Your Slack webhook URL for deployment notifications
   - Get from: Slack App → Incoming Webhooks
   - Click **Add secret**

### Configure Environment Secrets (Optional but Recommended)

For better security, create environment-specific secrets:

1. Go to **Settings → Environments**
2. Click **New environment**

#### Staging Environment
- **Name**: `staging`
- **Environment protection rules**:
  - ❌ Don't require reviewers for staging
  - ⏱️ Optional: Set wait timer (e.g., 5 minutes)
- **Environment secrets**: Add staging-specific secrets if needed

#### Production Environment
- **Name**: `production`
- **Environment protection rules**:
  - ✅ **Required reviewers**: Add yourself or team leads (minimum 1)
  - ⏱️ Optional: Set wait timer for production
- **Environment secrets**: Add production-specific secrets

---

## Step 4: Verify Configuration

### Test the Staging Workflow

1. Make a small change in a test file
2. Commit and push to staging:
   ```bash
   git checkout staging
   echo "# Test CI/CD" >> TEST.md
   git add TEST.md
   git commit -m "Test: Verify CI/CD pipeline"
   git push origin staging
   ```

3. Go to GitHub → **Actions** tab
4. You should see the **"CI - Staging Tests"** workflow running
5. Wait for it to complete (~10-15 minutes)
6. Verify all jobs pass ✅

### Check Status Checks Appear

After the first successful workflow run:

1. Go back to **Settings → Branches**
2. Edit the `main` branch protection rule
3. Click on **Status checks** section
4. You should now see the workflow jobs in the searchable list
5. Add the required checks:
   - `verify-source-branch`
   - `final-validation`
   - `security-check`
6. Save the rule

7. Edit the `staging` branch protection rule
8. Add the required checks:
   - `lint`
   - `type-check`
   - `test-frontend`
   - `test-backend`
   - `test-e2e`
   - `build`
9. Save the rule

### Test the Main Branch Protection

1. Try to push directly to main (this should fail):
   ```bash
   git checkout main
   echo "# Test" >> TEST.md
   git add TEST.md
   git commit -m "Test: Should fail"
   git push origin main
   ```

   **Expected result**: ❌ Push rejected due to branch protection

2. Create a PR from staging to main:
   ```bash
   git checkout staging
   gh pr create --base main --head staging --title "Test: Production Deployment" --body "Testing the CI/CD workflow"
   ```

3. Go to GitHub → **Pull requests**
4. You should see:
   - ✅ Workflow checks running
   - ✅ `verify-source-branch` check passes (because it's from staging)
   - ⚠️ Approval required before merge
   - ⚠️ Cannot merge until all checks pass

### Clean Up Test Files

After verifying everything works:

```bash
git checkout staging
git rm TEST.md
git commit -m "Clean up test file"
git push origin staging

# Close the test PR on GitHub (don't merge it)
```

---

## Step 5: AWS Amplify Configuration

### Connect Staging Branch

1. Go to AWS Amplify Console
2. Select your app (or create new app)
3. Click **Connect branch**
4. Select **staging** branch
5. Configure build settings (use `amplify.yml` from repo)
6. Set environment variables (from `backend/.env.example` and `frontend/.env.example`)
7. Deploy

### Connect Main Branch

1. In Amplify Console, click **Connect branch** again
2. Select **main** branch
3. Configure as production environment
4. Set production environment variables
5. Important production variables:
   - Use production Clerk keys (pk_live_*, sk_live_*)
   - Use production Stripe keys
   - Use production database URL
   - Unique JWT secrets (different from staging)

### Configure Automatic Deployments

Amplify should automatically deploy when:
- Push to `staging` → Deploy to staging environment
- Push to `main` → Deploy to production environment

Verify this in Amplify Console → App settings → Build settings

---

## 🎉 You're All Set!

Your CI/CD pipeline is now configured! Here's the workflow:

```
Developer makes changes
    ↓
Push to feature branch
    ↓
Merge/push to staging
    ↓
GitHub Actions runs tests ✅
    ↓
Amplify deploys to staging ✅
    ↓
Manual testing & approval ✅
    ↓
Create PR: staging → main
    ↓
Verify PR is from staging ✅
    ↓
Final validation & security ✅
    ↓
Human approval required ⏸️
    ↓
Merge to main
    ↓
Amplify deploys to production 🚀
```

---

## 📚 Additional Resources

- **Full Workflow Guide**: See `docs/CI-CD-WORKFLOW.md`
- **Troubleshooting**: See `docs/CI-CD-WORKFLOW.md` → Troubleshooting section
- **Emergency Hotfix**: See `docs/CI-CD-WORKFLOW.md` → Emergency Hotfix section

---

## ⚠️ Important Reminders

1. **Never push directly to main** - Always go through staging
2. **Test in staging first** - All changes must be verified in staging
3. **Human approval required** - Production deployments need approval
4. **Monitor deployments** - Watch GitHub Actions and Amplify consoles
5. **Rotate secrets regularly** - Update AWS keys, JWT secrets quarterly

---

## 🆘 Need Help?

- **CI/CD Issues**: Check `.github/workflows/` configurations
- **Branch Protection**: Review this document and `docs/CI-CD-WORKFLOW.md`
- **AWS Amplify**: See `docs/aws-amplify-secrets-setup.md`
- **General Setup**: See `PROJECT-STARTUP-CHECKLIST.md`

---

**Last Updated**: 2024-10-04
**Template Version**: 1.0.0
