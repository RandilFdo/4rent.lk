'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';
import { toast } from 'react-hot-toast';
import { FaCheckCircle, FaClock, FaExclamationTriangle, FaCreditCard, FaHistory } from 'react-icons/fa';

interface Business {
  id: string;
  businessName: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  status: 'trial' | 'active' | 'expired' | 'suspended';
  trialEndDate: string;
  nextPaymentDue: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

const BusinessDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }

    if (status === 'authenticated') {
      fetchBusiness();
    }
  }, [status, router]);

  const fetchBusiness = async () => {
    try {
      const response = await fetch('/api/business/my-business');
      const data = await response.json();

      if (data.success) {
        setBusiness(data.business);
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

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    try {
      const response = await fetch('/api/business/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to PayHere payment page
        window.location.href = data.redirect_url;
      } else {
        toast.error(data.error || 'Subscription failed');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <FaCheckCircle className="text-green-500" />;
      case 'trial':
        return <FaClock className="text-blue-500" />;
      case 'expired':
        return <FaExclamationTriangle className="text-red-500" />;
      case 'suspended':
        return <FaExclamationTriangle className="text-orange-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'trial':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'suspended':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isTrialExpired = business && new Date(business.trialEndDate) < new Date();
  const isPaymentDue = business && new Date(business.nextPaymentDue) < new Date();

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
        <div className="max-w-6xl mx-auto py-8">
          <Heading
            title="Business Dashboard"
            subtitle={`Welcome back, ${business.businessName}`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Status Card */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Account Status
                  </h2>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(business.status)}`}>
                    {getStatusIcon(business.status)}
                    <span className="capitalize">{business.status}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Business Name:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{business.businessName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{business.contactInfo.phone}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{business.contactInfo.email}</span>
                  </div>

                  {business.status === 'trial' && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Trial Ends:</span>
                      <span className={`font-medium ${isTrialExpired ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                        {formatDate(business.trialEndDate)}
                      </span>
                    </div>
                  )}

                  {business.status === 'active' && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Next Payment Due:</span>
                      <span className={`font-medium ${isPaymentDue ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                        {formatDate(business.nextPaymentDue)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {business.status === 'trial' && (
                    <Button
                      label={isTrialExpired ? "Subscribe Now (Trial Expired)" : "Subscribe Now"}
                      onClick={handleSubscribe}
                      disabled={isSubscribing}
                    />
                  )}

                  {business.status === 'expired' && (
                    <Button
                      label="Reactivate Subscription"
                      onClick={handleSubscribe}
                      disabled={isSubscribing}
                    />
                  )}

                  <Button
                    label="Manage Listings"
                    onClick={() => router.push('/properties')}
                    outline
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push('/post')}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-lg">+</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Add New Listing</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">List a property or vehicle</div>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/properties')}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <FaHistory className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">My Listings</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Manage your listings</div>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/business/refund')}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                      <FaCreditCard className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Request Refund</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Submit refund request</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Subscription Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Subscription
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Monthly Fee:</span>
                    <span className="font-medium text-gray-900 dark:text-white">LKR 1,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Features:</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Unlimited listings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BusinessDashboard;
