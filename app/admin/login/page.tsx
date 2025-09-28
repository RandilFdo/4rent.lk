"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import Input from "../../components/inputs/Input";
import Button from "../../components/Button";

const AdminLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Hardcoded admin credentials
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin123";

    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      // Store admin session in localStorage
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminLoginTime", Date.now().toString());
      
      // Also set cookies for server-side protection
      document.cookie = `adminLoggedIn=true; path=/; max-age=${24 * 60 * 60}`; // 24 hours
      document.cookie = `adminLoginTime=${Date.now()}; path=/; max-age=${24 * 60 * 60}`; // 24 hours
      
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔐</div>
              <Heading 
                title="Admin Login" 
                subtitle="Enter your admin credentials to access the dashboard"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="username"
                label="Username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                disabled={isLoading}
                required
              />

              <Input
                id="password"
                label="Password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                disabled={isLoading}
                required
              />

              {error && (
                <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                label={isLoading ? "Signing In..." : "Sign In"}
                onClick={handleSubmit}
                disabled={isLoading}
                fullWidth
              />
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Demo Credentials: <br />
                <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  admin / admin123
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminLogin;