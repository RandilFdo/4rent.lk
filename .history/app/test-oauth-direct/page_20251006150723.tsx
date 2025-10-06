"use client";
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function TestOAuthDirect() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('Ready');

  const handleDirectGoogleSignIn = async () => {
    setIsLoading(true);
    setStatus('Starting Google Sign In...');
    
    try {
      // Test the OAuth endpoint directly first
      setStatus('Testing OAuth endpoint...');
      const testResponse = await fetch('/api/auth/providers');
      const providers = await testResponse.json();
      console.log('Available providers:', providers);
      
      if (!providers.google) {
        setStatus('❌ Google provider not available');
        setIsLoading(false);
        return;
      }
      
      setStatus('Google provider found, attempting sign in...');
      
      // Direct sign in without any callback URL
      const result = await signIn('google', { 
        redirect: false, // Don't redirect automatically
        callbackUrl: '/' // Simple callback
      });
      
      console.log('Sign in result:', result);
      setStatus(`Result: ${JSON.stringify(result, null, 2)}`);
      
      if (result?.ok) {
        setStatus('✅ Sign in successful!');
        // Manual redirect after success
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setStatus(`❌ Sign in failed: ${result?.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      setStatus(`❌ Error: ${error.message || error.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Direct OAuth Test</h1>
          <p className="text-gray-600">No redirects, just direct testing</p>
        </div>

        <div className="mb-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Status:</h3>
          <p className="text-sm">{status}</p>
        </div>

        <button
          onClick={handleDirectGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Testing...</span>
            </>
          ) : (
            <>
              <span>🔐</span>
              <span>Test Google Sign In</span>
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

        <div className="mt-6 text-xs text-gray-500">
          <p>This test uses <code>redirect: false</code> to prevent automatic redirects and show the actual result.</p>
        </div>
      </div>
    </div>
  );
}
