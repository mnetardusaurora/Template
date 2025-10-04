#!/bin/bash

# Generate secure secrets for JWT tokens

echo "🔐 Generating secure secrets..."
echo ""

JWT_SECRET=$(openssl rand -base64 32)
REFRESH_TOKEN_SECRET=$(openssl rand -base64 32)

echo "Add these to your backend/.env.development file:"
echo ""
echo "JWT_SECRET=$JWT_SECRET"
echo "REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET"
echo ""
echo "⚠️  Keep these secrets secure and NEVER commit them to git!"
echo ""
echo "💡 Tip: Generate different secrets for staging and production!"
