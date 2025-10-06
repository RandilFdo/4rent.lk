"use client";
import { useEffect, useState } from 'react';

export default function EnvCheck() {
  const [envData, setEnvData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEnv = async () => {
      try {
        const response = await fetch('/api/debug/auth-detailed');
        const data = await response.json();
        setEnvData(data);
      } catch (error: any) {
        setEnvData({ error: error.message });
      } finally {
        setLoading(false);
      }
    };
    checkEnv();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Environment Check</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables Status</h2>
          
          {envData?.error ? (
            <div className="text-red-500">Error: {envData.error}</div>
          ) : (
            <div>
              <div className="mb-4">
                <strong>Environment:</strong> {envData?.environment}<br/>
                <strong>Current URL:</strong> {envData?.currentUrl}<br/>
                <strong>Timestamp:</strong> {envData?.timestamp}
              </div>
              
              <h3 className="font-semibold mb-2">Auth Variables:</h3>
              <div className="grid grid-cols-2 gap-4">
                {envData?.authDebug && Object.entries(envData.authDebug).map(([key, value]: [string, any]) => (
                  <div key={key} className={`p-3 rounded ${value.status === 'Set' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <strong>{key}:</strong><br/>
                    Status: {value.status}<br/>
                    {key === 'NEXTAUTH_URL' && value.value && (
                      <>Value: {value.value}</>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <a 
              href="/test-oauth-direct"
              className="block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-center"
            >
              Test Direct OAuth (No Redirects)
            </a>
            <a 
              href="/api/debug/auth-detailed"
              target="_blank"
              className="block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 text-center"
            >
              View Raw API Data
            </a>
            <a 
              href="/"
              className="block bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 text-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
