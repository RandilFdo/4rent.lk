'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import { toast } from 'react-hot-toast';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

const BusinessRegisterPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactInfo: {
      phone: '',
      email: '',
      address: ''
    } as ContactInfo
  });

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    router.push('/');
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('contactInfo.')) {
      const contactField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/business/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Business registered successfully!');
        router.push('/business/dashboard');
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <Container>
        <div className="max-w-2xl mx-auto py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <Heading
              title="Register Your Business"
              subtitle="Join 4Rent as a business partner and start listing your properties and vehicles"
            />

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Name *
                </label>
                <Input
                  id="businessName"
                  label=""
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Enter your business name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  label=""
                  type="tel"
                  value={formData.contactInfo.phone}
                  onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  label=""
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Address
                </label>
                <textarea
                  id="address"
                  value={formData.contactInfo.address}
                  onChange={(e) => handleInputChange('contactInfo.address', e.target.value)}
                  placeholder="Enter your business address"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                  What happens next?
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• You'll get a 30-day free trial</li>
                  <li>• Start listing your properties and vehicles immediately</li>
                  <li>• After trial, subscribe for LKR 1,500/month</li>
                  <li>• Get priority support and featured listings</li>
                </ul>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                label={isLoading ? 'Registering...' : 'Register Business'}
                onClick={() => {}}
              />
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BusinessRegisterPage;
