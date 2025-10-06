"use client";

import { signIn } from "next-auth/react";

export default function SimpleOAuthTest() {
  const handleGoogleSignIn = () => {
    console.log("Attempting Google sign-in...");
    signIn("google", { 
      redirect: false 
    }).then((result) => {
      console.log("Sign-in result:", result);
      if (result?.error) {
        alert(`Error: ${result.error}`);
      } else if (result?.ok) {
        alert("Success!");
      } else {
        alert("No result returned");
      }
    }).catch((error) => {
      console.error("Sign-in error:", error);
      alert(`Exception: ${error.message}`);
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Simple OAuth Test</h1>
        
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700"
          >
            Test Google Sign In
          </button>
          
          <div className="text-sm text-gray-600">
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Loading...'}</p>
            <p><strong>Expected callback:</strong> {typeof window !== 'undefined' ? `${window.location.origin}/api/auth/callback/google` : 'Loading...'}</p>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>Check browser console for detailed logs.</p>
            <p>If this fails, the issue is likely in Google OAuth Console settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
