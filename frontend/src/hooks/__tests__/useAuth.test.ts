import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuth } from '../useAuth';

// Mock @clerk/clerk-react
vi.mock('@clerk/clerk-react', () => ({
  useAuth: () => ({
    isLoaded: true,
    isSignedIn: true,
    signOut: vi.fn(),
    getToken: vi.fn().mockResolvedValue('mock-token'),
  }),
  useUser: () => ({
    user: {
      id: 'user_123',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
      publicMetadata: {},
    },
  }),
}));

// Mock clerk config
vi.mock('@/lib/clerk', () => ({
  isAuroraIdentityMode: () => false,
}));

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns auth state', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoaded).toBe(true);
    expect(result.current.isSignedIn).toBe(true);
    expect(result.current.user).toBeDefined();
  });

  it('provides getAccessToken function', async () => {
    const { result } = renderHook(() => useAuth());

    const token = await result.current.getAccessToken();
    expect(token).toBe('mock-token');
  });

  it('provides signOut function', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.signOut).toBeDefined();
    expect(typeof result.current.signOut).toBe('function');
  });

  it('provides getEntitlements function', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.getEntitlements).toBeDefined();
    expect(typeof result.current.getEntitlements).toBe('function');
  });
});
