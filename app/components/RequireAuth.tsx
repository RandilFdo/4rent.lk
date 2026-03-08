"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import Container from "./Container";
import Heading from "./Heading";

interface RequireAuthProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, fallback }) => {
  const { data: session, status } = useSession();
  const loginModal = useLoginModal();
  const [hasShownModal, setHasShownModal] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" && !hasShownModal) {
      // Show login modal only once
      setHasShownModal(true);
      loginModal.onOpen();
    }
  }, [status, loginModal, hasShownModal]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return fallback || (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🔐</div>
              <Heading 
                title="Login Required" 
                subtitle="Please log in to view this listing"
              />
            </div>
            <div className="text-gray-600 dark:text-gray-400 mb-6">
              You need to be logged in to view listing details and contact the seller.
            </div>
            <button
              onClick={() => loginModal.onOpen()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login / Sign Up
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
