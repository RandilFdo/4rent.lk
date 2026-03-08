"use client";

import { useState, useEffect } from "react";

export default function TestEnv() {
  const [envCheck, setEnvCheck] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkEnv = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug/env');
      const data = await response.json();
      setEnvCheck(data);
    } catch (error) {
      setEnvCheck({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkEnv();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Environment Variables Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Environment Status</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2">Loading...</p>
            </div>
          ) : envCheck ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${envCheck.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <h3 className="font-semibold text-lg mb-2">Environment Check</h3>
                <p className={envCheck.success ? 'text-green-800' : 'text-red-800'}>
                  {envCheck.success ? '✅ Environment variables loaded successfully' : '❌ Environment variables failed to load'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Environment Variables:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>NEXTAUTH_URL:</span>
                    <span className={envCheck.variables?.NEXTAUTH_URL === '✅ Set' ? 'text-green-600' : 'text-red-600'}>
                      {envCheck.variables?.NEXTAUTH_URL || 'Not found'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>NEXTAUTH_SECRET:</span>
                    <span className={envCheck.variables?.NEXTAUTH_SECRET === '✅ Set' ? 'text-green-600' : 'text-red-600'}>
                      {envCheck.variables?.NEXTAUTH_SECRET || 'Not found'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GOOGLE_CLIENT_ID:</span>
                    <span className={envCheck.variables?.GOOGLE_CLIENT_ID === '✅ Set' ? 'text-green-600' : 'text-red-600'}>
                      {envCheck.variables?.GOOGLE_CLIENT_ID || 'Not found'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GOOGLE_CLIENT_SECRET:</span>
                    <span className={envCheck.variables?.GOOGLE_CLIENT_SECRET === '✅ Set' ? 'text-green-600' : 'text-red-600'}>
                      {envCheck.variables?.GOOGLE_CLIENT_SECRET || 'Not found'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>DATABASE_URL:</span>
                    <span className={envCheck.variables?.DATABASE_URL === '✅ Set' ? 'text-green-600' : 'text-red-600'}>
                      {envCheck.variables?.DATABASE_URL || 'Not found'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Environment:</h4>
                <p className="text-blue-800">{envCheck.environment}</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Current URL:</h4>
                <p className="text-yellow-800 break-all">{typeof window !== 'undefined' ? window.location.origin : 'Loading...'}</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">OAuth Test</h2>
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/api/auth/signin'}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Test Google Sign In
            </button>
            
            <div className="text-sm text-gray-600">
              <p>If OAuth still fails, check:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Google Cloud Console redirect URIs match exactly</li>
                <li>Environment variables are set for the correct environment</li>
                <li>Domain matches between NEXTAUTH_URL and Google Console</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
