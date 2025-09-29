'use client';

import { useRouter } from 'next/navigation';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentCancelPage = () => {
  const router = useRouter();

  const handleTryAgain = () => {
    router.push('/business/dashboard');
  };

  const handleGoToDashboard = () => {
    router.push('/business/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <Container>
        <div className="max-w-2xl mx-auto py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <FaTimesCircle className="h-16 w-16 text-red-500" />
            </div>
            
            <Heading
              title="Payment Cancelled"
              subtitle="Your subscription was not completed"
            />

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                What happened?
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                The payment process was cancelled or failed. Your business account remains in trial mode.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                Next Steps
              </h3>
              <ul className="text-left text-blue-700 dark:text-blue-300 space-y-2">
                <li>• You can try subscribing again from your dashboard</li>
                <li>• Check your payment method and try again</li>
                <li>• Contact support if you continue having issues</li>
                <li>• Your trial period continues until it expires</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                label="Try Again"
                onClick={handleTryAgain}
              />
              <Button
                label="Go to Dashboard"
                onClick={handleGoToDashboard}
                outline
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PaymentCancelPage;
