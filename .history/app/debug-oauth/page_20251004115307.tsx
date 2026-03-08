"use client";

import { useState } from "react";

export default function DebugOAuth() {
  const [envCheck, setEnvCheck] = useState<any>({});

  const checkEnvironment = () => {
    const checks = {
      NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL || "Not set",
      hasGoogleClientId: !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      hasGoogleClientSecret: !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      hasNextAuthSecret: !!process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
      currentUrl: window.location.origin,
      currentHost: window.location.host,
    };
    setEnvCheck(checks);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">OAuth Debug Information</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <button
            onClick={checkEnvironment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          >
            Check Environment
          </button>
          
          {Object.keys(envCheck).length > 0 && (
            <div className="space-y-2">
              {Object.entries(envCheck).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                  <span className="font-medium">{key}:</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    typeof value === 'boolean' 
                      ? (value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {typeof value === 'boolean' ? (value ? 'Set' : 'Not Set') : String(value)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Common OAuth Issues</h2>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <h3 className="font-semibold text-yellow-800">1. Environment Variables</h3>
              <p className="text-yellow-700">Make sure these are set in Vercel:</p>
              <ul className="list-disc list-inside text-yellow-700 mt-2">
                <li>NEXTAUTH_URL=https://4rent-lk-66uy.vercel.app</li>
                <li>NEXTAUTH_SECRET (32+ characters)</li>
                <li>GOOGLE_CLIENT_ID</li>
                <li>GOOGLE_CLIENT_SECRET</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
              <h3 className="font-semibold text-blue-800">2. Google OAuth Console</h3>
              <p className="text-blue-700">Update these in Google Cloud Console:</p>
              <ul className="list-disc list-inside text-blue-700 mt-2">
                <li>Authorized redirect URI: https://4rent-lk-66uy.vercel.app/api/auth/callback/google</li>
                <li>Authorized JavaScript origin: https://4rent-lk-66uy.vercel.app</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 border-l-4 border-red-400">
              <h3 className="font-semibold text-red-800">3. Current Error</h3>
              <p className="text-red-700">OAuthSignin error usually means:</p>
              <ul className="list-disc list-inside text-red-700 mt-2">
                <li>Missing or incorrect environment variables</li>
                <li>Wrong redirect URI in Google Console</li>
                <li>NEXTAUTH_SECRET mismatch</li>
                <li>Domain mismatch between NEXTAUTH_URL and actual domain</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-black text-white px-4 py-2 rounded text-center hover:bg-gray-800"
            >
              Open Vercel Dashboard
            </a>
            <a
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
            >
              Open Google Cloud Console
            </a>
            <a
              href="/api/auth/signin"
              className="block w-full bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700"
            >
              Test OAuth Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
