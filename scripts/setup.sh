#!/bin/bash

# Template Project Setup Script
# Automates the initial project setup

set -e  # Exit on error

echo "🚀 Setting up Template Project..."
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Error: Node.js 20+ is required. You have $(node -v)"
    exit 1
fi
echo "✅ Node.js version OK: $(node -v)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..
echo ""

# Setup environment files
echo "🔧 Setting up environment files..."
if [ ! -f "frontend/.env.development" ]; then
    cp frontend/.env.example frontend/.env.development
    echo "✅ Created frontend/.env.development"
else
    echo "⏭️  frontend/.env.development already exists"
fi

if [ ! -f "backend/.env.development" ]; then
    cp backend/.env.example backend/.env.development
    echo "✅ Created backend/.env.development"
else
    echo "⏭️  backend/.env.development already exists"
fi
echo ""

# Setup Husky git hooks
echo "🪝 Setting up git hooks..."
npx husky install
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
chmod +x .husky/pre-push
echo "✅ Git hooks configured"
echo ""

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
cd backend && npx prisma generate && cd ..
echo "✅ Prisma client generated"
echo ""

echo "✨ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update environment variables in:"
echo "   - frontend/.env.development"
echo "   - backend/.env.development"
echo ""
echo "2. Generate JWT secrets:"
echo "   ./scripts/generate-keys.sh"
echo ""
echo "3. Set up your database:"
echo "   cd backend && npm run db:migrate"
echo ""
echo "4. Start development servers:"
echo "   npm run dev"
echo ""
echo "📚 For more info, see PROJECT-STARTUP-CHECKLIST.md"
