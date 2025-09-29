'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and then redirect to dashboard
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success('Payment successful! Your subscription is now active.');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoToDashboard = () => {
    router.push('/business/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <Container>
        <div className="max-w-2xl mx-auto py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            {isLoading ? (
              <div className="space-y-6">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Processing your payment...
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we confirm your subscription.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <FaCheckCircle className="h-16 w-16 text-green-500" />
                </div>
                
                <Heading
                  title="Payment Successful!"
                  subtitle="Your business subscription is now active"
                />

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                    Welcome to 4Rent Business!
                  </h3>
                  <ul className="text-left text-green-700 dark:text-green-300 space-y-2">
                    <li>• Your subscription is now active</li>
                    <li>• You can list unlimited properties and vehicles</li>
                    <li>• Access to premium features and analytics</li>
                    <li>• Priority customer support</li>
                    <li>• Next payment due in 30 days</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Button
                    label="Go to Dashboard"
                    onClick={handleGoToDashboard}
                  />
                  <Button
                    label="Start Listing"
                    onClick={() => router.push('/post')}
                    outline
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PaymentSuccessPage;
