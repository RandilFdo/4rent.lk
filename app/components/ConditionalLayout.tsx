"use client";

import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  
  // For homepage, experiences page and all posting pages, no padding - let the page handle its own spacing
  if (pathname === "/" || pathname === "/experiences" || pathname.startsWith("/post")) {
    return <div>{children}</div>;
  }
  
  // For all other pages, normal padding with dark mode support
  return <div className="pt-32 bg-white dark:bg-gray-900">{children}</div>;
};

export default ConditionalLayout;
