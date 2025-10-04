import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react';
import { isAuroraIdentityMode } from '@/lib/clerk';

/**
 * Custom authentication hook
 *
 * Provides a unified interface for authentication that works with both:
 * - Direct Clerk integration
 * - Aurora Identity platform (using Clerk under the hood)
 */
export const useAuth = () => {
  const { isLoaded, isSignedIn, signOut, getToken } = useClerkAuth();
  const { user } = useUser();

  /**
   * Get the current access token
   * Works with both Clerk direct and Aurora Identity modes
   */
  const getAccessToken = async () => {
    if (isAuroraIdentityMode()) {
      // In Aurora mode, token is managed by Aurora platform
      return localStorage.getItem('aurora_jwt');
    }

    // Standard Clerk token
    return await getToken();
  };

  /**
   * Get user entitlements/subscription info
   * This would typically come from Aurora Identity API
   */
  const getEntitlements = async () => {
    if (!user) return null;

    // In Aurora Identity mode, fetch from Aurora API
    if (isAuroraIdentityMode()) {
      // TODO: Implement Aurora Identity API call
      // const response = await fetch('/api/aurora/entitlements');
      // return await response.json();
      return null;
    }

    // For direct Clerk integration, entitlements might be in user metadata
    return user.publicMetadata?.entitlements || null;
  };

  return {
    isLoaded,
    isSignedIn,
    user,
    signOut,
    getAccessToken,
    getEntitlements,
  };
};
