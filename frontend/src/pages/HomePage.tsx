import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export const HomePage = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Application
          </h1>
          <p className="text-lg text-gray-600">
            This is a template project with React, TypeScript, Tailwind CSS, and Clerk authentication
          </p>
        </div>

        {user && (
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Signed in as {user.emailAddresses[0]?.emailAddress}
                </h2>
                <p className="text-gray-600">
                  User ID: {user.id}
                </p>
              </div>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Authentication</h3>
            <p className="text-gray-600">
              Integrated with Clerk for secure authentication. Supports both direct Clerk integration
              and Aurora Identity platform.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Modern Stack</h3>
            <p className="text-gray-600">
              Built with React 19, TypeScript, Tailwind CSS, and shadcn/ui components.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">AWS Amplify</h3>
            <p className="text-gray-600">
              Configured for deployment to AWS Amplify with CI/CD pipeline.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Testing</h3>
            <p className="text-gray-600">
              Playwright setup for end-to-end testing with comprehensive test coverage.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
