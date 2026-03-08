'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';

const PrivacyPolicyPage = () => {
  const { isDarkMode } = useDarkMode();

  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, post a listing, or contact us. This may include your name, email address, phone number, and any other information you choose to provide. We also automatically collect certain information when you use our platform, including your IP address, browser type, and usage patterns."
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to: (a) Provide, maintain, and improve our services, (b) Process transactions and send related information, (c) Send technical notices and support messages, (d) Respond to your comments and questions, (e) Monitor and analyze trends and usage, (f) Detect, investigate, and prevent fraudulent transactions and other illegal activities, (g) Comply with legal obligations."
    },
    {
      title: "3. Information Sharing and Disclosure",
      content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances: (a) With your explicit consent, (b) To comply with legal obligations or court orders, (c) To protect our rights, property, or safety, or that of our users, (d) In connection with a business transfer or acquisition, (e) With service providers who assist us in operating our platform (under strict confidentiality agreements)."
    },
    {
      title: "4. Data Security",
      content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security."
    },
    {
      title: "5. Data Retention",
      content: "We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it for legal or regulatory purposes."
    },
    {
      title: "6. Your Rights and Choices",
      content: "You have the right to: (a) Access and update your personal information, (b) Delete your account and associated data, (c) Opt out of certain communications, (d) Request a copy of your data, (e) Object to certain processing of your data. To exercise these rights, please contact us using the information provided below."
    },
    {
      title: "7. Cookies and Tracking Technologies",
      content: "We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small data files stored on your device that help us remember your preferences and improve our services. You can control cookie settings through your browser, but disabling cookies may affect platform functionality."
    },
    {
      title: "8. Third-Party Services",
      content: "Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information. We may also use third-party services for analytics, advertising, or other purposes, which may collect information about you."
    },
    {
      title: "9. Children's Privacy",
      content: "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly."
    },
    {
      title: "10. International Data Transfers",
      content: "Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your personal information."
    },
    {
      title: "11. Changes to This Privacy Policy",
      content: "We may update this privacy policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the new privacy policy on our platform and updating the 'Last Updated' date. Your continued use of our services after such changes constitutes acceptance of the updated privacy policy."
    },
    {
      title: "12. Contact Us",
      content: "If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@4rent.lk or through our contact form. We will respond to your inquiry within 30 days."
    }
  ];

  const dataTypes = [
    {
      category: "Account Information",
      examples: ["Name", "Email address", "Phone number", "Profile information"]
    },
    {
      category: "Listing Information",
      examples: ["Property details", "Vehicle information", "Experience descriptions", "Photos and media"]
    },
    {
      category: "Usage Information",
      examples: ["Pages visited", "Time spent on platform", "Search queries", "Interaction patterns"]
    },
    {
      category: "Technical Information",
      examples: ["IP address", "Browser type", "Device information", "Operating system"]
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Container>
        <div className="max-w-4xl mx-auto py-4 sm:py-8">
          <Heading
            title="Privacy Policy"
            subtitle="How we collect, use, and protect your personal information"
          />
          
          <div className={`mt-8 p-6 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🔒</div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                  Your Privacy Matters
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  We are committed to protecting your privacy and ensuring the security of your personal information. 
                  This privacy policy explains how we collect, use, and safeguard your data when you use 4Rent.
                </p>
              </div>
            </div>
          </div>

          {/* Data We Collect */}
          <div className="mt-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Types of Information We Collect
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {dataTypes.map((type, index) => (
                <div key={index} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {type.category}
                  </h3>
                  <ul className="space-y-1">
                    {type.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className={`text-sm flex items-center space-x-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Policy Sections */}
          <div className="mt-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Privacy Policy Details
            </h2>
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {section.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Your Rights */}
          <div className={`mt-12 p-6 rounded-lg ${isDarkMode ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
              🛡️ Your Privacy Rights
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                  Access & Control
                </h4>
                <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  <li>• View your personal data</li>
                  <li>• Update your information</li>
                  <li>• Download your data</li>
                  <li>• Delete your account</li>
                </ul>
              </div>
              <div>
                <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                  Communication
                </h4>
                <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  <li>• Opt out of marketing emails</li>
                  <li>• Control notification preferences</li>
                  <li>• Request data deletion</li>
                  <li>• Report privacy concerns</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security Measures */}
          <div className={`mt-8 p-6 rounded-lg ${isDarkMode ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>
              🔐 How We Protect Your Data
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className={`font-medium mb-1 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Encryption</h4>
                <p className={`text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Data encrypted in transit and at rest</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🛡️</div>
                <h4 className={`font-medium mb-1 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Access Control</h4>
                <p className={`text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Limited access to authorized personnel only</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔍</div>
                <h4 className={`font-medium mb-1 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Monitoring</h4>
                <p className={`text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Continuous security monitoring and updates</p>
              </div>
            </div>
          </div>

          <div className={`mt-8 text-center p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Questions About Your Privacy?
            </h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              If you have any questions about this privacy policy or how we handle your data, please contact us.
            </p>
            <a
              href="/contact"
              className={`inline-block px-6 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Contact Us
            </a>
          </div>

          <div className={`mt-6 text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicyPage;
