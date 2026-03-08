"use client";

import { useState } from "react";

export default function TestDBSimple() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testDB = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug/database');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const testListings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/listings');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Simple Database Test</h1>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={testDB}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Database Connection"}
        </button>
        
        <button
          onClick={testListings}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Listings API"}
        </button>
      </div>

      {result && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Result:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
