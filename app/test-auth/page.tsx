"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useAnalytics } from "@/app/hooks/useAnalytics";
import { useEffect } from "react";

export default function TestAuthPage() {
  const { data: session, status } = useSession();
  const { trackEvent, trackPageView } = useAnalytics();

  useEffect(() => {
    // Track page view
    trackPageView('/test-auth', 'Test Auth Page');
  }, [trackPageView]);

  const handleTestEvent = () => {
    trackEvent('test_button_click', 'testing', 'auth_page', 1);
    alert('Event tracked! Check your Google Analytics.');
  };

  if (status === "loading") {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Auth & Analytics Test</h1>
        
        {/* Authentication Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Test</h2>
          
          {session ? (
            <div>
              <p className="mb-4">✅ Signed in as: <strong>{session.user?.email}</strong></p>
              <p className="mb-4">Name: {session.user?.name}</p>
              {session.user?.image && (
                <img 
                  src={session.user.image} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full mb-4"
                />
              )}
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-4">❌ Not signed in</p>
              <button
                onClick={() => signIn('google')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
              >
                Sign in with Google
              </button>
              <button
                onClick={() => signIn('credentials')}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Sign in with Email
              </button>
            </div>
          )}
        </div>

        {/* Analytics Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Analytics Test</h2>
          <p className="mb-4">Click the button below to test analytics tracking:</p>
          <button
            onClick={handleTestEvent}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Track Test Event
          </button>
        </div>

        {/* Environment Check */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <div className="space-y-2">
            <p>Google Client ID: {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? '✅ Set' : '❌ Not set'}</p>
            <p>Analytics ID: {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? '✅ Set' : '❌ Not set'}</p>
            <p>NextAuth URL: {process.env.NEXTAUTH_URL || '❌ Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
