/**
 * Clerk Configuration
 *
 * This file configures Clerk authentication for the application.
 * It can integrate with either:
 * 1. Aurora Identity platform (using JWT tokens from Aurora)
 * 2. Direct Clerk integration
 */

export const clerkConfig = {
  // This will be set via environment variable
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,

  // Optional: Configure for Aurora Identity integration
  // When using Aurora Identity, tokens are managed externally
  auroraIdentityMode: import.meta.env.VITE_USE_AURORA_IDENTITY === 'true',
};

/**
 * Helper to check if using Aurora Identity integration
 */
export const isAuroraIdentityMode = () => clerkConfig.auroraIdentityMode;

/**
 * Get authentication headers for API requests
 */
export const getAuthHeaders = async () => {
  if (isAuroraIdentityMode()) {
    // When using Aurora Identity, get JWT from Aurora platform
    const auroraToken = localStorage.getItem('aurora_jwt');
    return {
      'Authorization': `Bearer ${auroraToken}`,
      'X-Auth-Source': 'aurora-identity'
    };
  }

  // Standard Clerk authentication
  // Token will be handled by Clerk's useAuth hook
  return {};
};
