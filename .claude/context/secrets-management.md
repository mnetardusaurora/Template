# Secrets Management

## Overview

This document outlines how secrets and environment variables are managed across different environments in this project. Proper secrets management is critical for security and preventing unauthorized access.

## Key Principles

1. **Never commit secrets to version control**
2. **Use different secrets for each environment (development, staging, production)**
3. **Rotate secrets regularly**
4. **Store secrets in AWS Amplify Console for deployed environments**
5. **Use `.env.example` files as templates, never commit actual `.env` files**

## Environment Strategy

### Local Development
- Use `.env.development` files (git-ignored)
- Copy from `.env.example` templates
- Use development/test API keys

### Staging Environment
- Branch: `staging`
- Configured in AWS Amplify Console
- Uses Clerk Development instance (pk_test_*, sk_test_*)
- Uses Stripe Test mode (pk_test_*, sk_test_*)
- Uses staging database

### Production Environment
- Branch: `main`
- Configured in AWS Amplify Console
- Uses Clerk Production instance (pk_live_*, sk_live_*)
- Uses Stripe Live mode (pk_live_*, sk_live_*)
- Uses production database

## Service-Specific Configuration

### Clerk Authentication

Clerk provides **separate Development and Production instances** for each application:

#### Development Instance (for local dev and staging)
- Publishable Key: `pk_test_...`
- Secret Key: `sk_test_...`
- Features:
  - More relaxed security
  - 100 user cap
  - Uses `.accounts.dev` domain
  - Shared social connection credentials

#### Production Instance (for production only)
- Publishable Key: `pk_live_...`
- Secret Key: `sk_live_...`
- Requirements:
  - Must associate production domain
  - Must provision own SSO credentials
  - Stricter security posture

**Important**: Both frontend and backend must use keys from the **same Clerk instance**.

### Stripe Payments

Stripe uses **different keys for Test mode vs Live mode**:

#### Test Mode (for local dev and staging)
- Secret Key: `sk_test_...`
- Publishable Key: `pk_test_...`
- Webhook Secret: `whsec_...` (test endpoint)
- Features:
  - No real payments processed
  - Use test card numbers
  - Isolated test data

#### Live Mode (for production)
- Secret Key: `sk_live_...`
- Publishable Key: `pk_live_...`
- Webhook Secret: `whsec_...` (live endpoint)
- Features:
  - Real payment processing
  - Real customer data
  - Completely isolated from test mode

**Important**: Frontend publishable keys are safe to expose, but **never** expose secret keys in frontend code.

### Aurora Identity (Optional)

If using Aurora Identity platform:
- Staging: `https://staging-api.auroraidentity.com`
- Production: `https://api.auroraidentity.com`
- Use different API keys per environment

## Secret Storage Locations

### Local Development
```
/frontend/.env.development  (git-ignored)
/backend/.env.development   (git-ignored)
```

### AWS Amplify (Staging & Production)
1. Navigate to AWS Amplify Console
2. Select your app
3. Go to **App Settings** > **Environment Variables**
4. Configure branch-specific variables:
   - `staging` branch → staging secrets
   - `main` branch → production secrets

See: [docs/aws-amplify-secrets-setup.md](../docs/aws-amplify-secrets-setup.md)

## Required Environment Variables

### Frontend

#### All Environments
- `VITE_NODE_ENV` - Environment identifier
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `VITE_API_URL` - Backend API URL
- `VITE_USE_AURORA_IDENTITY` - Aurora Identity toggle (optional)
- `VITE_AURORA_IDENTITY_API_URL` - Aurora Identity URL (optional)

#### Optional (if using Stripe in frontend)
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

### Backend

#### All Environments
- `NODE_ENV` - Environment identifier
- `PORT` - Server port
- `CORS_ORIGIN` - Frontend URL for CORS

#### Authentication
- `CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key ( SENSITIVE)
- `JWT_SECRET` - JWT signing secret ( SENSITIVE - unique per environment)
- `REFRESH_TOKEN_SECRET` - Refresh token secret ( SENSITIVE - unique per environment)

#### Database
- `DATABASE_URL` - PostgreSQL connection string ( SENSITIVE)

#### Stripe (Optional)
- `STRIPE_SECRET_KEY` - Stripe secret key ( SENSITIVE)
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret ( SENSITIVE)

#### Aurora Identity (Optional)
- `AURORA_IDENTITY_API_URL` - Aurora Identity API URL
- `AURORA_IDENTITY_API_KEY` - Aurora Identity API key ( SENSITIVE)

## Security Checklist

### Before Committing Code
- [ ] No `.env` files in commit (check `.gitignore`)
- [ ] No secrets hardcoded in source code
- [ ] `.env.example` files updated with new variables (without actual values)
- [ ] No sensitive data in console.log statements

### When Setting Up New Environment
- [ ] Generate unique JWT secrets: `openssl rand -base64 32`
- [ ] Use correct Clerk instance (Development for staging, Production for main)
- [ ] Use correct Stripe mode (Test for staging, Live for main)
- [ ] Configure separate databases per environment
- [ ] Test authentication flow
- [ ] Test payment flow (if applicable)

### Regular Maintenance
- [ ] Rotate JWT secrets quarterly
- [ ] Review AWS IAM permissions for Amplify access
- [ ] Monitor Clerk and Stripe dashboards for anomalies
- [ ] Audit CloudTrail logs for unauthorized access
- [ ] Remove team member access when they leave

## What NOT to Do

 **Never commit secrets to git**
- Even in private repositories
- Even if you delete them later (git history persists)

 **Never share secrets via insecure channels**
- No email, Slack, Discord, or messaging apps
- Use password managers or AWS Secrets Manager

 **Never use production keys in development**
- Always use test/development keys locally
- Prevents accidental production data changes

 **Never log secrets**
- Sanitize logs before storing
- Use environment variable masking in logs

 **Never expose backend secrets in frontend code**
- Frontend code is publicly accessible
- Only use publishable keys in frontend

## Generating Secure Secrets

### JWT Secrets
```bash
# Generate a 32-byte base64-encoded secret
openssl rand -base64 32

# Generate a 64-byte hex-encoded secret
openssl rand -hex 64
```

### For Each Environment
Generate **different** secrets for:
- `JWT_SECRET`
- `REFRESH_TOKEN_SECRET`

## Incident Response

If secrets are compromised:

1. **Immediately rotate the compromised secrets**
   - Generate new secrets
   - Update in AWS Amplify Console
   - Deploy new build

2. **Revoke old secrets**
   - Clerk: Regenerate API keys in dashboard
   - Stripe: Roll API keys in dashboard
   - Database: Change credentials

3. **Audit for damage**
   - Check Clerk logs for unauthorized access
   - Review Stripe transactions for fraud
   - Check database access logs

4. **Document the incident**
   - What was compromised
   - How it happened
   - Steps taken to remediate
   - Preventive measures for future

## Additional Resources

- [AWS Amplify Secrets Setup Guide](../docs/aws-amplify-secrets-setup.md)
- [Clerk Environments Documentation](https://clerk.com/docs/deployments/environments)
- [Stripe API Keys Documentation](https://docs.stripe.com/keys)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
