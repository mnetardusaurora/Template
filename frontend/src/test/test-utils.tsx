import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';

// Mock Clerk publishable key for tests
const mockClerkKey = 'pk_test_mock_key_for_testing';

interface AllTheProvidersProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that includes all app providers
 * Use this for rendering components that need routing, auth, etc.
 */
function AllTheProviders({ children }: AllTheProvidersProps) {
  return (
    <ClerkProvider publishableKey={mockClerkKey}>
      <BrowserRouter>{children}</BrowserRouter>
    </ClerkProvider>
  );
}

/**
 * Custom render function that includes all providers
 * Use this instead of @testing-library/react's render
 */
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react';

// Override render with our custom version
export { customRender as render };
