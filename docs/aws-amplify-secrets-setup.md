# AWS Amplify Environment Variables & Secrets Setup

This guide explains how to configure environment variables and secrets for your staging and production deployments in AWS Amplify.

## Table of Contents
- [Understanding AWS Amplify Environment Variables](#understanding-aws-amplify-environment-variables)
- [Staging vs Production Configuration](#staging-vs-production-configuration)
- [Step-by-Step Setup Guide](#step-by-step-setup-guide)
- [Security Best Practices](#security-best-practices)

## Understanding AWS Amplify Environment Variables

AWS Amplify supports branch-specific environment variables, allowing you to use different configurations for staging and production branches.

### Important Security Notes

⚠️ **DO NOT** store secrets directly in frontend environment variables (VITE_*, REACT_APP_*, etc.)
- Frontend build-time variables are embedded in the built JavaScript bundle
- They are visible to anyone who inspects your frontend code

✅ **DO** store secrets in:
- Backend environment variables (not exposed to frontend)
- AWS Systems Manager Parameter Store (for Gen 1 apps)
- AWS Amplify Secret Management (for Gen 2 apps)

## Staging vs Production Configuration

### Branch Strategy

| Branch | Environment | Clerk Keys | Stripe Keys | Database |
|--------|-------------|------------|-------------|----------|
| `staging` | Staging | Development instance (`pk_test_*`, `sk_test_*`) | Test mode (`pk_test_*`, `sk_test_*`) | Staging database |
| `main` | Production | Production instance (`pk_live_*`, `sk_live_*`) | Live mode (`pk_live_*`, `sk_live_*`) | Production database |

### Key Differences by Service

#### Clerk Authentication
- **Staging**: Use Clerk **Development** instance keys
  - More relaxed security
  - 100 user cap
  - Shared social connection credentials
  - Uses `.accounts.dev` domain

- **Production**: Use Clerk **Production** instance keys
  - Stricter security posture
  - Must associate production domain
  - Must provision your own SSO credentials

#### Stripe Payments
- **Staging**: Use **Test Mode** keys
  - Card networks don't process real payments
  - Use test card numbers (e.g., 4242 4242 4242 4242)
  - Data is isolated from live mode

- **Production**: Use **Live Mode** keys
  - Real payment processing
  - Real customer data
  - Separate object isolation

## Step-by-Step Setup Guide

### 1. Access AWS Amplify Console

1. Log in to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Select your application
3. Navigate to **App Settings** > **Environment Variables**

### 2. Configure Staging Branch Variables

Click **Manage Variables** and add the following for the `staging` branch:

#### Frontend Environment Variables (staging branch)

```bash
# Clerk - Development Instance
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_STAGING_KEY_HERE

# API URL
VITE_API_URL=https://staging-api.yourdomain.com

# Environment
VITE_NODE_ENV=staging

# Aurora Identity (if applicable)
VITE_USE_AURORA_IDENTITY=false

# Stripe (if using in frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_TEST_KEY
```

#### Backend Environment Variables (staging branch)

```bash
# Server
NODE_ENV=staging
PORT=3001

# CORS
CORS_ORIGIN=https://staging.yourdomain.com

# Clerk - Development Instance
CLERK_PUBLISHABLE_KEY=pk_test_YOUR_STAGING_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_STAGING_SECRET_KEY_HERE

# JWT - Use unique secrets per environment
JWT_SECRET=UNIQUE_STAGING_JWT_SECRET_HERE
REFRESH_TOKEN_SECRET=UNIQUE_STAGING_REFRESH_SECRET_HERE

# Database - Staging Database
DATABASE_URL=postgresql://user:pass@staging-db.region.rds.amazonaws.com:5432/template_staging

# Stripe - Test Mode
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_TEST_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_TEST_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_STAGING_WEBHOOK_SECRET

# Aurora Identity (if applicable)
AURORA_IDENTITY_API_URL=https://staging-api.auroraidentity.com
AURORA_IDENTITY_API_KEY=YOUR_STAGING_AURORA_API_KEY
```

### 3. Configure Production Branch Variables

Add the following for the `main` branch:

#### Frontend Environment Variables (main branch)

```bash
# Clerk - Production Instance
VITE_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_PRODUCTION_KEY_HERE

# API URL
VITE_API_URL=https://api.yourdomain.com

# Environment
VITE_NODE_ENV=production

# Aurora Identity (if applicable)
VITE_USE_AURORA_IDENTITY=false

# Stripe (if using in frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_STRIPE_LIVE_KEY
```

#### Backend Environment Variables (main branch)

```bash
# Server
NODE_ENV=production
PORT=3001

# CORS
CORS_ORIGIN=https://yourdomain.com

# Clerk - Production Instance
CLERK_PUBLISHABLE_KEY=pk_live_YOUR_PRODUCTION_KEY_HERE
CLERK_SECRET_KEY=sk_live_YOUR_PRODUCTION_SECRET_KEY_HERE

# JWT - Use DIFFERENT secrets than staging
JWT_SECRET=UNIQUE_PRODUCTION_JWT_SECRET_HERE
REFRESH_TOKEN_SECRET=UNIQUE_PRODUCTION_REFRESH_SECRET_HERE

# Database - Production Database
DATABASE_URL=postgresql://user:pass@prod-db.region.rds.amazonaws.com:5432/template_prod

# Stripe - Live Mode
STRIPE_SECRET_KEY=sk_live_YOUR_STRIPE_LIVE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_STRIPE_LIVE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_PRODUCTION_WEBHOOK_SECRET

# Aurora Identity (if applicable)
AURORA_IDENTITY_API_URL=https://api.auroraidentity.com
AURORA_IDENTITY_API_KEY=YOUR_PRODUCTION_AURORA_API_KEY
```

### 4. Verify Configuration

1. After setting variables, trigger a new build for each branch
2. Check build logs to ensure environment variables are being picked up
3. Test authentication and payment flows in each environment

## Security Best Practices

### ✅ DO

1. **Use Different Secrets Per Environment**
   - Never reuse JWT secrets between staging and production
   - Generate secrets using: `openssl rand -base64 32`

2. **Rotate Secrets Regularly**
   - Especially after team member departures
   - After any suspected security breach

3. **Use AWS Secrets Manager or Parameter Store**
   - For highly sensitive data
   - For secrets that need to be rotated automatically

4. **Limit Access**
   - Use AWS IAM to restrict who can view/edit environment variables
   - Enable AWS CloudTrail for audit logging

5. **Monitor Usage**
   - Set up CloudWatch alerts for unusual API usage
   - Monitor Clerk and Stripe dashboards for anomalies

### ❌ DON'T

1. **Never Commit Secrets to Git**
   - Always use `.env.example` files as templates
   - Ensure `.gitignore` excludes all `.env*` files

2. **Don't Share Secrets via Insecure Channels**
   - No email, Slack, or messaging apps
   - Use password managers or AWS Secrets Manager

3. **Don't Use Production Keys in Development**
   - Always use test/development keys locally
   - This prevents accidental production data changes

4. **Don't Log Secrets**
   - Ensure logging doesn't capture environment variables
   - Sanitize logs before storing

## Troubleshooting

### Build Fails with Missing Environment Variables

**Solution**: Verify environment variables are set for the correct branch in Amplify Console

### Frontend Can't Reach Backend API

**Symptoms**: CORS errors, 404s to API endpoints

**Solutions**:
1. Verify `VITE_API_URL` matches your backend URL
2. Check `CORS_ORIGIN` in backend matches frontend URL
3. Ensure backend is deployed and accessible

### Authentication Fails

**Symptoms**: "Invalid publishable key" or "Unauthorized" errors

**Solutions**:
1. Verify Clerk keys match the correct instance (Development vs Production)
2. Check that frontend and backend are using keys from the same Clerk instance
3. Ensure Clerk dashboard has correct allowed origins configured

### Stripe Payments Fail

**Symptoms**: Payment processing errors, webhook signature mismatches

**Solutions**:
1. Verify using correct keys for environment (test vs live)
2. Check webhook endpoints are configured in Stripe dashboard
3. Ensure `STRIPE_WEBHOOK_SECRET` matches the webhook endpoint secret in Stripe

## Additional Resources

- [AWS Amplify Environment Variables Documentation](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)
- [Clerk Deployments & Environments](https://clerk.com/docs/deployments/environments)
- [Stripe API Keys](https://docs.stripe.com/keys)
- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
