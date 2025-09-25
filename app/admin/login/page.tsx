"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import Input from "../../components/inputs/Input";
import Button from "../../components/Button";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        // Check if user is admin
        const session = await getSession();
        const isAdmin = session?.user?.email?.includes('admin') || 
                       (session?.user as any)?.isAdmin === true;
        
        if (isAdmin) {
          router.push("/admin");
        } else {
          setError("Access denied. Admin privileges required.");
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-md w-full space-y-8">
          <div>
            <Heading
              title="Admin Login"
              subtitle="Enter your admin credentials to access the dashboard"
            />
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <Button
                label={loading ? "Signing in..." : "Sign In"}
                onClick={handleSubmit}
                disabled={loading}
                className="w-full"
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AdminLogin;
