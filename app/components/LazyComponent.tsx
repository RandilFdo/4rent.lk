"use client";

import { Suspense, lazy, ComponentType } from 'react';

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  [key: string]: any;
}

const LazyComponent: React.FC<LazyComponentProps> = ({ 
  component, 
  fallback = <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded"></div>,
  ...props 
}) => {
  const LazyLoadedComponent = lazy(component);

  return (
    <Suspense fallback={fallback}>
      <LazyLoadedComponent {...props} />
    </Suspense>
  );
};

export default LazyComponent;
