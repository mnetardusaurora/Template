import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Backend Environment Variable Schema
 * Validates all required environment variables at app startup
 */
const envSchema = z.object({
  // Server Configuration
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),

  // CORS Configuration
  CORS_ORIGIN: z.string().min(1, 'CORS origin is required'),

  // Clerk Authentication
  CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, 'Clerk publishable key is required')
    .startsWith('pk_', 'Clerk publishable key must start with pk_'),

  CLERK_SECRET_KEY: z
    .string()
    .min(1, 'Clerk secret key is required')
    .startsWith('sk_', 'Clerk secret key must start with sk_'),

  // JWT Configuration
  JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('15m'),
  REFRESH_TOKEN_SECRET: z.string().min(32, 'Refresh token secret must be at least 32 characters'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),

  // Database Configuration
  DATABASE_URL: z.string().url('Database URL must be a valid URL'),

  // Stripe (Optional)
  STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional().or(z.literal('')),
  STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_').optional().or(z.literal('')),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_').optional().or(z.literal('')),

  // Aurora Identity (Optional)
  AURORA_IDENTITY_API_URL: z.string().url().optional().or(z.literal('')),
  AURORA_IDENTITY_API_KEY: z.string().optional().or(z.literal('')),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
});

/**
 * Parse and validate environment variables
 * Throws error if validation fails
 */
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);

      console.error('❌ Invalid environment variables:');
      missingVars.forEach(msg => console.error(`  - ${msg}`));
      console.error('\nPlease check your .env file and ensure all required variables are set.');
      console.error('See backend/.env.example for reference.');

      // In production, exit process on validation failure
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }

      throw new Error('Environment validation failed');
    }
    throw error;
  }
}

// Validate and export typed env object
export const env = validateEnv();

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
