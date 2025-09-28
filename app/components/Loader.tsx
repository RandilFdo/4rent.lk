"use client";

import LoadingSpinner from "./LoadingSpinner";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
   return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
         <LoadingSpinner size="xl" text="Loading..." />
      </div>
   );
};

export default Loader;
