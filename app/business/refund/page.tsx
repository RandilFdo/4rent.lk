'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import { toast } from 'react-hot-toast';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

interface RefundRequest {
  id: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface Business {
  id: string;
  businessName: string;
  status: string;
}

const RefundRequestPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [business, setBusiness] = useState<Business | null>(null);
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    amount: ''
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }

    if (status === 'authenticated') {
      fetchBusinessData();
    }
  }, [status, router]);

  const fetchBusinessData = async () => {
    try {
      const response = await fetch('/api/business/my-business');
      const data = await response.json();

      if (data.success) {
        setBusiness(data.business);
        setRefundRequests(data.business.refundRequests || []);
      } else if (data.error === 'No business found') {
        router.push('/business/register');
      } else {
        toast.error(data.error || 'Failed to fetch business data');
      }
    } catch (error) {
      console.error('Fetch business error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/business/request-refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Refund request submitted successfully!');
        setFormData({ reason: '', amount: '' });
        fetchBusinessData(); // Refresh the data
      } else {
        toast.error(data.error || 'Refund request failed');
      }
    } catch (error) {
      console.error('Refund request error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <FaClock className="text-blue-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!business) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <Container>
        <div className="max-w-4xl mx-auto py-8">
          <Heading
            title="Refund Requests"
            subtitle="Submit and track your refund requests"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Submit New Request */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Submit New Refund Request
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Refund Amount (LKR) *
                  </label>
                  <Input
                    id="amount"
                    label=""
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="Enter refund amount"
                    required
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reason for Refund *
                  </label>
                  <textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Please explain why you need a refund..."
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  label={isSubmitting ? 'Submitting...' : 'Submit Request'}
                  onClick={() => {}}
                />
              </form>

              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  Important Notes:
                </h3>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Refund requests are reviewed by our admin team</li>
                  <li>• Processing time: 3-5 business days</li>
                  <li>• Approved refunds will be processed via PayHere</li>
                  <li>• You can only have one pending request at a time</li>
                </ul>
              </div>
            </div>

            {/* Request History */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Request History
              </h2>

              {refundRequests.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 dark:text-gray-600 mb-2">
                    <FaClock className="mx-auto h-12 w-12" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">No refund requests yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {refundRequests.map((request) => (
                    <div
                      key={request.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(request.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(request.createdAt)}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Amount:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            LKR {request.amount.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Reason:</span>
                          <p className="text-sm text-gray-900 dark:text-white mt-1">
                            {request.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RefundRequestPage;
