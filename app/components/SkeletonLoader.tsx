"use client";

import React from 'react';

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg overflow-hidden animate-pulse ${className}`}>
    <div className="aspect-square w-full bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

interface SkeletonGridProps {
  count?: number;
  className?: string;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count = 8, className = "" }) => (
  <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-stretch ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

export { SkeletonCard, SkeletonGrid };
