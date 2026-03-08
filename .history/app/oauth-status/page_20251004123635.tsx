"use client";

import { useState, useEffect } from "react";

export default function OAuthStatus() {
  const [status, setStatus] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkOAuthStatus();
  }, []);

  const checkOAuthStatus = async () => {
    try {
      // Check if auth providers endpoint is accessible
      const providersResponse = await fetch('/api/auth/providers');
      const providers = await providersResponse.json();
      
      // Check current URL and environment
      const currentUrl = window.location.origin;
      const isProduction = currentUrl.includes('vercel.app');
      
      setStatus({
        currentUrl,
        isProduction,
        providersAvailable: !!providers,
        providers: providers,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        cookieEnabled: navigator.cookieEnabled,
      });
    } catch (error) {
      setStatus({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        currentUrl: window.location.origin,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const testGoogleAuth = () => {
    window.location.href = '/api/auth/signin/google';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking OAuth status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">OAuth Status Check</h1>
        
        <div className="grid gap-6">
          {/* Current Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Current Status</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Current URL:</span>
                <code className="bg-gray-100 px-2 py-1 rounded">{status.currentUrl}</code>
              </div>
              <div className="flex justify-between">
                <span>Environment:</span>
                <span className={`px-2 py-1 rounded ${
                  status.isProduction ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {status.isProduction ? 'Production (Vercel)' : 'Development (Local)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Providers Available:</span>
                <span className={`px-2 py-1 rounded ${
                  status.providersAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {status.providersAvailable ? 'Yes' : 'No'}
                </span>
              </div>
              {status.error && (
                <div className="p-3 bg-red-100 border border-red-400 rounded">
                  <strong>Error:</strong> {status.error}
                </div>
              )}
            </div>
          </div>

          {/* Required Environment Variables */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Required Environment Variables</h2>
            <div className="space-y-3">
              {status.isProduction ? (
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-800">Production (Vercel) Requirements:</h3>
                  <ul className="list-disc list-inside text-blue-700 mt-2 space-y-1">
                    <li><code>NEXTAUTH_URL=https://4rent-lk-66uy.vercel.app</code></li>
                    <li><code>NEXTAUTH_SECRET=your-secret-key</code></li>
                    <li><code>GOOGLE_CLIENT_ID=your-google-client-id</code></li>
                    <li><code>GOOGLE_CLIENT_SECRET=your-google-client-secret</code></li>
                  </ul>
                </div>
              ) : (
                <div className="p-4 bg-green-50 border-l-4 border-green-400">
                  <h3 className="font-semibold text-green-800">Development (Local) Requirements:</h3>
                  <ul className="list-disc list-inside text-green-700 mt-2 space-y-1">
                    <li><code>NEXTAUTH_URL=http://localhost:3000</code></li>
                    <li><code>NEXTAUTH_SECRET=your-secret-key</code></li>
                    <li><code>GOOGLE_CLIENT_ID=your-google-client-id</code></li>
                    <li><code>GOOGLE_CLIENT_SECRET=your-google-client-secret</code></li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Google OAuth Console Setup */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Google OAuth Console Setup</h2>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <h3 className="font-semibold text-yellow-800">Authorized Redirect URIs:</h3>
              <ul className="list-disc list-inside text-yellow-700 mt-2 space-y-1">
                <li><code>http://localhost:3000/api/auth/callback/google</code></li>
                <li><code>https://4rent-lk-66uy.vercel.app/api/auth/callback/google</code></li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 mt-4">
              <h3 className="font-semibold text-blue-800">Authorized JavaScript Origins:</h3>
              <ul className="list-disc list-inside text-blue-700 mt-2 space-y-1">
                <li><code>http://localhost:3000</code></li>
                <li><code>https://4rent-lk-66uy.vercel.app</code></li>
              </ul>
            </div>
          </div>

          {/* Test Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
            <div className="space-y-3">
              <button
                onClick={testGoogleAuth}
                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Test Google OAuth Sign In
              </button>
              <button
                onClick={checkOAuthStatus}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Refresh Status Check
              </button>
            </div>
          </div>

          {/* Debug Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(status, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
