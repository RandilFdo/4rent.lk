"use client";

import { SWRConfig } from 'swr';
import { fetcher } from '@/app/libs/fetcher';

interface SWRProviderProps {
  children: React.ReactNode;
}

const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 30000, // 30s cache
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        loadingTimeout: 10000,
        // Global cache configuration
        provider: () => new Map(),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
