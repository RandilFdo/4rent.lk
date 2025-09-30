"use client";

import { useRouter } from 'next/navigation';
import Container from '@/app/components/Container';
import { XCircleIcon } from '@heroicons/react/24/outline';

const FeaturedCancelPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <Container>
        <div className="text-center">
          <XCircleIcon className="h-24 w-24 text-orange-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Payment Cancelled
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Your payment was cancelled. Your ad will remain as a regular listing and can be upgraded to featured at any time.
          </p>
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
            <p className="text-orange-800 dark:text-orange-200 font-medium">
              Featured ads cost only 300 LKR for 7 days and significantly increase your ad's visibility and engagement.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Browse Listings
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedCancelPage;
