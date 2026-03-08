"use client";
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TestOAuthSimple() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Get callbackUrl from search params
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  useEffect(() => {
    // If already signed in, redirect to callbackUrl
    if (session && status === 'authenticated') {
      console.log('✅ Already signed in, redirecting to:', callbackUrl);
      router.push(callbackUrl);
    }
  }, [session, status, callbackUrl, router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    console.log('🚀 Starting Google Sign In with callbackUrl:', callbackUrl);
    
    try {
      // Use the clean callbackUrl
      const cleanCallbackUrl = callbackUrl === '/' ? '/' : callbackUrl.split('?')[0];
      console.log('🧹 Clean callbackUrl:', cleanCallbackUrl);
      
      await signIn('google', { 
        callbackUrl: cleanCallbackUrl,
        redirect: true 
      });
    } catch (error) {
      console.error('❌ Sign in error:', error);
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-4">Signed In Successfully!</h1>
          <p className="mb-4">Welcome, {(session as any).user?.name || (session as any).user?.email}</p>
          <p className="text-sm text-gray-600">Redirecting to {callbackUrl}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">OAuth Test</h1>
          <p className="text-gray-600">Test Google Sign In</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Current Status:</h3>
          <ul className="text-sm space-y-1">
            <li>Session: {status}</li>
            <li>Callback URL: {callbackUrl}</li>
            <li>User: {(session as any)?.user?.name || 'Not signed in'}</li>
          </ul>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>🔐</span>
              <span>Sign in with Google</span>
            </>
          )}
        </button>

        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
