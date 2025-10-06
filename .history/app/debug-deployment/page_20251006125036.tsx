"use client";

import { useState, useEffect } from "react";

export default function DebugDeployment() {
  const [tests, setTests] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results: any = {};

    // Test 1: Environment Variables
    try {
      const envResponse = await fetch('/api/debug/env');
      results.environment = await envResponse.json();
    } catch (error) {
      results.environment = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Test 2: Database Connection
    try {
      const dbResponse = await fetch('/api/debug/database');
      results.database = await dbResponse.json();
    } catch (error) {
      results.database = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Test 3: Prisma Client
    try {
      const prismaResponse = await fetch('/api/debug/prisma');
      results.prisma = await prismaResponse.json();
    } catch (error) {
      results.prisma = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Test 4: OAuth Configuration
    try {
      const oauthResponse = await fetch('/api/auth/providers');
      results.oauth = await oauthResponse.json();
    } catch (error) {
      results.oauth = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Test 5: Admin Routes
    try {
      const adminResponse = await fetch('/api/admin/stats');
      results.admin = await adminResponse.json();
    } catch (error) {
      results.admin = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    setTests(results);
    setLoading(false);
  };

  const getStatusColor = (test: any) => {
    if (test.error) return 'bg-red-100 text-red-800';
    if (test.success) return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (test: any) => {
    if (test.error) return '❌ Error';
    if (test.success) return '✅ Success';
    return '⚠️ Warning';
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🚀 Deployment Debug Center</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">System Tests</h2>
          <button
            onClick={runTests}
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Running Tests..." : "Run All Debug Tests"}
          </button>
        </div>

        {Object.keys(tests).length > 0 && (
          <div className="space-y-6">
            {/* Environment Variables Test */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm mr-3 ${getStatusColor(tests.environment)}`}>
                  {getStatusText(tests.environment)}
                </span>
                Environment Variables
              </h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(tests.environment, null, 2)}
              </pre>
            </div>

            {/* Database Test */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm mr-3 ${getStatusColor(tests.database)}`}>
                  {getStatusText(tests.database)}
                </span>
                Database Connection
              </h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(tests.database, null, 2)}
              </pre>
            </div>

            {/* Prisma Test */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm mr-3 ${getStatusColor(tests.prisma)}`}>
                  {getStatusText(tests.prisma)}
                </span>
                Prisma Client
              </h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(tests.prisma, null, 2)}
              </pre>
            </div>

            {/* OAuth Test */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm mr-3 ${getStatusColor(tests.oauth)}`}>
                  {getStatusText(tests.oauth)}
                </span>
                OAuth Configuration
              </h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(tests.oauth, null, 2)}
              </pre>
            </div>

            {/* Admin Routes Test */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm mr-3 ${getStatusColor(tests.admin)}`}>
                  {getStatusText(tests.admin)}
                </span>
                Admin Routes
              </h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(tests.admin, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">🔧 Troubleshooting Guide</h2>
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
              <h3 className="font-semibold text-blue-800">Common Deployment Issues:</h3>
              <ul className="list-disc list-inside mt-2 space-y-1 text-blue-700">
                <li><strong>Prisma Schema Not Found:</strong> Check if prisma generate ran successfully</li>
                <li><strong>Environment Variables:</strong> Verify all required vars are set in Vercel</li>
                <li><strong>Database Connection:</strong> Check DATABASE_URL format and MongoDB connection</li>
                <li><strong>OAuth Configuration:</strong> Verify Google OAuth console settings</li>
                <li><strong>Build Errors:</strong> Check Vercel build logs for specific error messages</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 border-l-4 border-green-400">
              <h3 className="font-semibold text-green-800">Quick Fixes:</h3>
              <ul className="list-disc list-inside mt-2 space-y-1 text-green-700">
                <li>Run <code>npx prisma generate</code> locally and commit changes</li>
                <li>Check Vercel environment variables match local .env</li>
                <li>Verify Google OAuth redirect URIs include production domain</li>
                <li>Check MongoDB connection string format</li>
                <li>Review Vercel build logs for specific error details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
