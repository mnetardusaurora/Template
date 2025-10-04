#!/bin/bash

# Check if all required environment variables are set

echo "🔍 Checking environment variables..."
echo ""

ERRORS=0

# Check frontend .env
echo "📱 Frontend (.env.development):"
if [ ! -f "frontend/.env.development" ]; then
    echo "❌ frontend/.env.development not found!"
    ERRORS=$((ERRORS + 1))
else
    # Check required variables
    if ! grep -q "VITE_CLERK_PUBLISHABLE_KEY=" frontend/.env.development || grep -q "VITE_CLERK_PUBLISHABLE_KEY=pk_test_your" frontend/.env.development; then
        echo "❌ VITE_CLERK_PUBLISHABLE_KEY not set"
        ERRORS=$((ERRORS + 1))
    else
        echo "✅ VITE_CLERK_PUBLISHABLE_KEY set"
    fi

    if ! grep -q "VITE_API_URL=" frontend/.env.development; then
        echo "❌ VITE_API_URL not set"
        ERRORS=$((ERRORS + 1))
    else
        echo "✅ VITE_API_URL set"
    fi
fi
echo ""

# Check backend .env
echo "🖥️  Backend (.env.development):"
if [ ! -f "backend/.env.development" ]; then
    echo "❌ backend/.env.development not found!"
    ERRORS=$((ERRORS + 1))
else
    # Check required variables
    if ! grep -q "CLERK_SECRET_KEY=" backend/.env.development || grep -q "CLERK_SECRET_KEY=sk_test_your" backend/.env.development; then
        echo "❌ CLERK_SECRET_KEY not set"
        ERRORS=$((ERRORS + 1))
    else
        echo "✅ CLERK_SECRET_KEY set"
    fi

    if ! grep -q "JWT_SECRET=" backend/.env.development || grep -q "JWT_SECRET=your-super-secret" backend/.env.development; then
        echo "❌ JWT_SECRET not set (run ./scripts/generate-keys.sh)"
        ERRORS=$((ERRORS + 1))
    else
        echo "✅ JWT_SECRET set"
    fi

    if ! grep -q "DATABASE_URL=" backend/.env.development || grep -q "DATABASE_URL=\"postgresql://username:password" backend/.env.development; then
        echo "❌ DATABASE_URL not set"
        ERRORS=$((ERRORS + 1))
    else
        echo "✅ DATABASE_URL set"
    fi
fi
echo ""

if [ $ERRORS -eq 0 ]; then
    echo "✅ All environment variables are configured!"
    exit 0
else
    echo "❌ $ERRORS error(s) found. Please update your .env files."
    exit 1
fi
