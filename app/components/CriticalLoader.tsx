"use client";

import React from 'react';

const CriticalLoader: React.FC = () => (
  <div className="min-h-screen bg-white dark:bg-gray-900">
    {/* Search Bar Skeleton */}
    <div className="flex justify-center py-12 sm:py-24 pt-24 sm:pt-36">
      <div className="w-full max-w-2xl px-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="relative animate-pulse">
            <div className="h-12 sm:h-14 bg-gray-200 dark:bg-gray-700 rounded-lg sm:rounded-xl"></div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 sm:h-10 w-16 sm:w-20 bg-gray-300 dark:bg-gray-600 rounded-lg sm:rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Results Section Skeleton */}
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Results Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4 animate-pulse">
          <div className="h-6 sm:h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        
        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-stretch">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg overflow-hidden animate-pulse">
              <div className="aspect-square w-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default CriticalLoader;
