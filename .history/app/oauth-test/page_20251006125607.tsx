"use client";

import { signIn, getSession } from "next-auth/react";
import { useState, useEffect } from "react";

// Force client-side rendering only
export const dynamic = 'force-dynamic';

export default function OAuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const testGoogleAuth = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      console.log("Starting Google OAuth test...");
      
      const result = await signIn("google", { 
        redirect: false,
        callbackUrl: "/"
      });
      
      console.log("OAuth result:", result);
      setResult(result);
      
      if (result?.error) {
        console.error("OAuth Error:", result.error);
      } else if (result?.ok) {
        console.log("OAuth Success!");
        // Get session to verify
        const session = await getSession();
        console.log("Session:", session);
        setResult({ ...result, session });
      }
    } catch (error) {
      console.error("OAuth Exception:", error);
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const checkSession = async () => {
    const session = await getSession();
    setResult({ session });
    console.log("Current session:", session);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading OAuth Test...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">OAuth Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-y-4">
            <button
              onClick={testGoogleAuth}
              disabled={loading}
              className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Testing OAuth..." : "Test Google OAuth Sign In"}
            </button>
            
            <button
              onClick={checkSession}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
            >
              Check Current Session
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Test Result</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Configuration Check</h2>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400">
              <h3 className="font-semibold text-blue-800">Current Environment:</h3>
              <p className="text-blue-700">{window.location.origin}</p>
            </div>
            
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
              <h3 className="font-semibold text-yellow-800">Expected Google OAuth Redirect URI:</h3>
              <code className="text-yellow-700">{window.location.origin}/api/auth/callback/google</code>
            </div>
            
            <div className="p-3 bg-green-50 border-l-4 border-green-400">
              <h3 className="font-semibold text-green-800">Expected NEXTAUTH_URL:</h3>
              <code className="text-green-700">{typeof window !== 'undefined' ? window.location.origin : 'Loading...'}</code>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <strong>If OAuth "skips and refreshes":</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1 text-red-700">
                <li>Check Google Console redirect URI matches exactly</li>
                <li>Verify NEXTAUTH_URL in Vercel environment variables</li>
                <li>Ensure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set</li>
                <li>Check browser console for errors</li>
              </ol>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <strong>Google Console Setup:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-blue-700">
                <li>Authorized redirect URI: <code>{window.location.origin}/api/auth/callback/google</code></li>
                <li>Authorized JavaScript origin: <code>{window.location.origin}</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
