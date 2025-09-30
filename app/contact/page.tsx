'use client';

import { useState } from 'react';
import useDarkMode from '@/app/hooks/useDarkMode';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';

const ContactPage = () => {
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Container>
          <div className="max-w-2xl mx-auto py-8 sm:py-12 text-center">
            <div className={`p-8 rounded-lg ${isDarkMode ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
              <div className="text-6xl mb-4">✅</div>
              <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                Message Sent Successfully!
              </h1>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
              <Button
                label="Send Another Message"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    category: 'general'
                  });
                }}
              />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Container>
        <div className="max-w-4xl mx-auto py-8 sm:py-12">
          <Heading
            title="Contact Us"
            subtitle="Get in touch with our support team"
          />
          
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Contact Form */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    id="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                  <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="safety">Safety Concern</option>
                    <option value="listing">Listing Issue</option>
                    <option value="account">Account Problem</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                
                <Input
                  id="subject"
                  label="Subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  required
                />
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={5}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Please describe your inquiry in detail..."
                    required
                  />
                </div>
                
                <Button
                  label={isSubmitting ? 'Sending...' : 'Send Message'}
                  onClick={() => {}}
                  disabled={isSubmitting}
                  type="submit"
                />
              </form>
            </div>

            {/* Contact Information */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Other ways to reach us
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    📧 Contact Email
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    For all inquiries, support, and safety concerns
                  </p>
                  <a 
                    href="mailto:info.4rent@gmail.com" 
                    className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                  >
                    info.4rent@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    ⏰ Response Time
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    We typically respond within 24 hours during business days
                  </p>
                </div>

                <div>
                  <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    🌍 Business Hours
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Monday - Friday: 9:00 AM - 6:00 PM (Sri Lanka Time)<br/>
                    Saturday: 9:00 AM - 2:00 PM<br/>
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className={`mt-8 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                  💡 Before contacting us
                </h3>
                <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  <li>• Check our FAQ page for common questions</li>
                  <li>• Try refreshing the page if you're having technical issues</li>
                  <li>• Include your listing ID if reporting a specific listing</li>
                  <li>• Be as specific as possible about your issue</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
