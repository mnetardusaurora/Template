# Aurora Identity Integration

## Authentication Flows
[Template for authentication integration - customize based on actual identity provider]

### JWT Token Management
- **Access Tokens**: Short-lived (15 minutes) for API requests
- **Refresh Tokens**: Long-lived (7 days) for token renewal
- **Token Storage**: Secure HttpOnly cookies or localStorage with proper security measures

### Session Handling
```typescript
interface AuthSession {
  user: {
    id: string;
    email: string;
    roles: string[];
    permissions: string[];
  };
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}
```

### Authentication Flow
1. User login via identity provider
2. Receive JWT tokens
3. Store tokens securely
4. Include access token in API requests
5. Refresh tokens before expiration
6. Handle token validation errors

## Subscription & Entitlements API

### User Entitlements
```typescript
interface UserEntitlements {
  userId: string;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
  features: string[];
  limits: {
    apiCalls: number;
    storage: number;
    users: number;
  };
  expiresAt: Date;
}
```

### Feature Guards
```typescript
// Example feature guard hook
const useFeatureAccess = (feature: string) => {
  const { entitlements } = useAuth();
  return entitlements?.features.includes(feature) ?? false;
};
```

## Security Considerations
- Implement CSRF protection
- Use secure cookie flags
- Validate tokens on every request
- Implement rate limiting
- Log authentication events
- Handle token expiration gracefully

## Integration Points
- `/auth/login` - Initiate authentication
- `/auth/callback` - Handle provider callback
- `/auth/refresh` - Refresh access tokens
- `/auth/logout` - Clear session
- `/user/entitlements` - Fetch user permissions