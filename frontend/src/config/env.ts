import { z } from 'zod';

/**
 * Frontend Environment Variable Schema
 * Validates all required environment variables at app startup
 */
const envSchema = z.object({
  // Clerk Configuration
  VITE_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, 'Clerk publishable key is required')
    .startsWith('pk_', 'Clerk publishable key must start with pk_'),

  // API Configuration
  VITE_API_URL: z.string().url('API URL must be a valid URL'),

  // Environment
  VITE_NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),

  // Aurora Identity (Optional)
  VITE_USE_AURORA_IDENTITY: z
    .string()
    .transform(val => val === 'true')
    .optional()
    .default('false'),

  VITE_AURORA_IDENTITY_API_URL: z.string().url().optional().or(z.literal('')),

  // Stripe (Optional)
  VITE_STRIPE_PUBLISHABLE_KEY: z
    .string()
    .startsWith('pk_')
    .optional()
    .or(z.literal('')),
});

/**
 * Parse and validate environment variables
 * Throws error if validation fails
 */
function validateEnv() {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);

      console.error('❌ Invalid environment variables:');
      missingVars.forEach(msg => console.error(`  - ${msg}`));
      console.error('\nPlease check your .env file and ensure all required variables are set.');

      throw new Error('Environment validation failed');
    }
    throw error;
  }
}

// Validate and export typed env object
export const env = validateEnv();

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
