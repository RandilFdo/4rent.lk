"use client";

import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  
  // For homepage, experiences page and all posting pages, no top padding - let the page handle its own spacing
  if (pathname === "/" || pathname === "/experiences" || pathname?.startsWith("/post")) {
    return <div className="pb-16 bg-white dark:bg-gray-900">{children}</div>;
  }
  
  // For all other pages, normal padding with dark mode support
  return <div className="pt-32 pb-16 bg-white dark:bg-gray-900">{children}</div>;
};

export default ConditionalLayout;
