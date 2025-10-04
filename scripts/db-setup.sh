#!/bin/bash

# Database setup script

echo "🗄️  Database Setup"
echo ""

cd backend

echo "1️⃣  Generating Prisma client..."
npx prisma generate
echo ""

echo "2️⃣  Pushing schema to database..."
npx prisma db push
echo ""

echo "3️⃣  Seeding database..."
npm run db:seed
echo ""

echo "✅ Database setup complete!"
echo ""
echo "💡 Tips:"
echo "- View database: npm run db:studio"
echo "- Create migration: npm run db:migrate"
echo "- Reset database: npm run db:reset"
