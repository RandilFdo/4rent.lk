"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";

export default function TestOAuth() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn("google", { 
        redirect: false,
        callbackUrl: "/"
      });
      
      console.log("Google sign-in result:", result);
      
      if (result?.error) {
        alert(`Error: ${result.error}`);
      } else if (result?.ok) {
        alert("Successfully signed in!");
        // Get session to verify
        const session = await getSession();
        setSession(session);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert(`Sign-in error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckSession = async () => {
    const session = await getSession();
    setSession(session);
    console.log("Current session:", session);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">OAuth Test Page</h1>
      
      <div className="space-y-4">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
        
        <button
          onClick={handleCheckSession}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Check Session
        </button>
      </div>

      {session && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Current Session:</h3>
          <pre className="text-sm mt-2 overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-100 rounded">
        <h3 className="font-bold">Environment Check:</h3>
        <p>NEXTAUTH_URL: {process.env.NEXT_PUBLIC_NEXTAUTH_URL || "Not set"}</p>
        <p>GOOGLE_CLIENT_ID: {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? "Set" : "Not set"}</p>
        <p>GOOGLE_CLIENT_SECRET: {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ? "Set" : "Not set"}</p>
      </div>
    </div>
  );
}
