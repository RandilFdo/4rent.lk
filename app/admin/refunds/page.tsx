'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';
import { toast } from 'react-hot-toast';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

interface RefundRequest {
  id: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  business: {
    businessName: string;
    contactInfo: {
      phone: string;
      email: string;
    };
  };
  user: {
    name: string;
    email: string;
  };
}

const AdminRefundsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }

    if (status === 'authenticated') {
      fetchRefundRequests();
    }
  }, [status, router]);

  const fetchRefundRequests = async () => {
    try {
      const response = await fetch('/api/business/admin/refunds');
      const data = await response.json();

      if (data.success) {
        setRefundRequests(data.refundRequests);
      } else {
        toast.error(data.error || 'Failed to fetch refund requests');
      }
    } catch (error) {
      console.error('Fetch refund requests error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (refundId: string, newStatus: 'approved' | 'rejected') => {
    setIsUpdating(refundId);
    try {
      const response = await fetch('/api/business/admin/refunds', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refundId,
          status: newStatus
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Refund request ${newStatus} successfully`);
        fetchRefundRequests(); // Refresh the list
      } else {
        toast.error(data.error || 'Failed to update refund request');
      }
    } catch (error) {
      console.error('Update refund request error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsUpdating(null);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <Container>
        <div className="max-w-6xl mx-auto py-8">
          <Heading
            title="Refund Management"
            subtitle="Review and manage business refund requests"
          />

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-8">
            {refundRequests.length === 0 ? (
              <div className="text-center py-12">
                <FaClock className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No refund requests
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  There are no refund requests to review at this time.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Business
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {refundRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {request.business.businessName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {request.user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            LKR {request.amount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                            {request.reason}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1 capitalize">{request.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(request.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {request.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleUpdateStatus(request.id, 'approved')}
                                disabled={isUpdating === request.id}
                                className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 disabled:opacity-50"
                              >
                                {isUpdating === request.id ? 'Processing...' : 'Approve'}
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(request.id, 'rejected')}
                                disabled={isUpdating === request.id}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                              >
                                {isUpdating === request.id ? 'Processing...' : 'Reject'}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminRefundsPage;
