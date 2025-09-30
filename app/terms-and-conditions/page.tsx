'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';

const TermsAndConditionsPage = () => {
  const { isDarkMode } = useDarkMode();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using 4Rent, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "2. Description of Service",
      content: "4Rent is a free online platform that allows users to list, browse, and rent vehicles, properties, and experiences. We provide a marketplace for users to connect and transact directly with each other. All transactions are between users, and 4Rent does not participate in or facilitate payments."
    },
    {
      title: "3. User Responsibilities",
      content: "Users are responsible for: (a) Providing accurate and truthful information in their listings, (b) Ensuring they have the legal right to rent out their items, (c) Maintaining the safety and condition of their listed items, (d) Complying with all applicable laws and regulations, (e) Respecting other users and maintaining appropriate conduct."
    },
    {
      title: "4. Prohibited Activities",
      content: "Users may not: (a) Post false, misleading, or fraudulent information, (b) List illegal or prohibited items, (c) Harass, abuse, or harm other users, (d) Attempt to circumvent our safety measures, (e) Use the platform for any unlawful purpose, (f) Spam or send unsolicited communications, (g) Impersonate others or create fake accounts."
    },
    {
      title: "5. Safety and Security",
      content: "While we strive to maintain a safe platform, users interact at their own risk. We recommend: (a) Meeting in public places, (b) Verifying the identity of other users, (c) Not sharing personal financial information, (d) Trusting your instincts and reporting suspicious behavior, (e) Following our safety guidelines provided on the platform."
    },
    {
      title: "6. Content and Listings",
      content: "Users retain ownership of their content but grant 4Rent a license to display, distribute, and modify their listings as necessary for the platform's operation. We reserve the right to remove any content that violates these terms or our community guidelines."
    },
    {
      title: "7. Platform Availability",
      content: "We strive to maintain platform availability but do not guarantee uninterrupted service. We may temporarily suspend the platform for maintenance, updates, or technical issues without prior notice."
    },
    {
      title: "8. Disclaimers",
      content: "4Rent is provided 'as is' without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of user-generated content. We are not responsible for transactions between users or any damages arising from platform use."
    },
    {
      title: "9. Limitation of Liability",
      content: "To the maximum extent permitted by law, 4Rent shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising from your use of the platform."
    },
    {
      title: "10. Indemnification",
      content: "Users agree to indemnify and hold harmless 4Rent from any claims, damages, or expenses arising from their use of the platform, violation of these terms, or infringement of any rights of another party."
    },
    {
      title: "11. Privacy",
      content: "Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the platform, to understand our practices regarding the collection and use of your information."
    },
    {
      title: "12. Modifications",
      content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the platform after changes constitutes acceptance of the new terms."
    },
    {
      title: "13. Termination",
      content: "We may terminate or suspend your account at any time for violation of these terms or for any other reason at our sole discretion. You may also terminate your account at any time by contacting us."
    },
    {
      title: "14. Governing Law",
      content: "These terms shall be governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising from these terms or your use of the platform shall be subject to the exclusive jurisdiction of the courts of Sri Lanka."
    },
    {
      title: "15. Contact Information",
      content: "If you have any questions about these Terms and Conditions, please contact us at support@4rent.lk or through our contact form on the platform."
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Container>
        <div className="max-w-4xl mx-auto py-4 sm:py-8">
          <Heading
            title="Terms and Conditions"
            subtitle="Please read these terms carefully before using 4Rent"
          />
          
          <div className={`mt-8 p-6 rounded-lg ${isDarkMode ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
                  Important Notice
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
                  By using 4Rent, you agree to these terms and conditions. If you do not agree with any part of these terms, 
                  you should not use our platform. These terms constitute a legally binding agreement between you and 4Rent.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {sections.map((section, index) => (
              <div key={index} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h2 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {section.title}
                </h2>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className={`mt-12 p-6 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
              📋 Summary of Key Points
            </h3>
            <ul className={`text-sm space-y-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              <li>• 4Rent is completely free to use - no hidden fees or charges</li>
              <li>• Users are responsible for their own safety and transactions</li>
              <li>• All content must be accurate and comply with our guidelines</li>
              <li>• We reserve the right to remove inappropriate content or users</li>
              <li>• Users interact at their own risk - follow safety guidelines</li>
              <li>• These terms may be updated - check back regularly</li>
              <li>• Contact us if you have any questions or concerns</li>
            </ul>
          </div>

          <div className={`mt-8 text-center p-6 rounded-lg ${isDarkMode ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
              Questions About These Terms?
            </h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
              If you have any questions about these Terms and Conditions, please don't hesitate to contact us.
            </p>
            <a
              href="/contact"
              className={`inline-block px-6 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
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

export default TermsAndConditionsPage;
