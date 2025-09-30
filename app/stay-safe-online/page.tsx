'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';

const StaySafeOnlinePage = () => {
  const { isDarkMode } = useDarkMode();

  const safetyTips = [
    {
      category: "Meeting in Person",
      tips: [
        "Always meet in public places during daylight hours",
        "Bring a friend or family member with you",
        "Inform someone you trust about your meeting location and time",
        "Trust your instincts - if something feels wrong, leave immediately",
        "Verify the person's identity before meeting",
        "Don't share your home address until you're comfortable"
      ]
    },
    {
      category: "Personal Information Protection",
      tips: [
        "Never share your full address, bank details, or social security number",
        "Use the platform's messaging system instead of giving out your personal phone number initially",
        "Be cautious about sharing photos that reveal your location or personal details",
        "Don't post your daily routine or travel plans publicly",
        "Use strong, unique passwords for your account",
        "Enable two-factor authentication if available"
      ]
    },
    {
      category: "Financial Safety",
      tips: [
        "Never send money in advance or pay deposits before meeting",
        "Use secure payment methods and always get receipts",
        "Be wary of requests for wire transfers or gift cards",
        "Don't share your bank account or credit card information",
        "If renting, inspect the item thoroughly before payment",
        "Keep records of all transactions and communications"
      ]
    },
    {
      category: "Red Flags to Watch For",
      tips: [
        "Requests for personal information beyond what's necessary",
        "Pressure to make quick decisions or payments",
        "Offers that seem too good to be true",
        "Requests to communicate outside the platform",
        "Inconsistent stories or evasive answers",
        "Refusal to meet in person or provide verification"
      ]
    },
    {
      category: "Verification & Trust",
      tips: [
        "Ask for references from previous renters or rentees",
        "Check if the person has a verified profile or good reviews",
        "Request to see identification when meeting",
        "Take photos of the item and person (with permission)",
        "Start with short-term rentals to build trust",
        "Report suspicious behavior immediately"
      ]
    },
    {
      category: "Emergency Situations",
      tips: [
        "If you feel threatened, leave immediately and call emergency services",
        "Save evidence of any harassment or threats",
        "Report incidents to 4Rent support and local authorities",
        "Block and report users who behave inappropriately",
        "Trust your gut feeling - safety comes first",
        "Keep emergency contacts easily accessible"
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Container>
        <div className="max-w-4xl mx-auto py-8 sm:py-12">
          <Heading
            title="Stay Safe Online"
            subtitle="Essential safety tips for using 4Rent and meeting people online"
          />
          
          <div className={`mt-8 p-6 rounded-lg ${isDarkMode ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>
                  Important Safety Notice
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                  Your safety is our top priority. Always trust your instincts and never compromise your personal safety for a transaction. If you feel uncomfortable at any time, remove yourself from the situation immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {safetyTips.map((category, categoryIndex) => (
              <div key={categoryIndex} className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-6`}>
                <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.category}
                </h2>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {tip}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={`mt-12 p-6 rounded-lg ${isDarkMode ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
              🛡️ 4Rent Safety Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                  Built-in Protection
                </h4>
                <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  <li>• Secure messaging system</li>
                  <li>• User verification process</li>
                  <li>• Report and block functionality</li>
                  <li>• Admin moderation of all listings</li>
                </ul>
              </div>
              <div>
                <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                  What We Do
                </h4>
                <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  <li>• Review all listings before publication</li>
                  <li>• Investigate safety reports promptly</li>
                  <li>• Remove suspicious users and listings</li>
                  <li>• Provide 24/7 support for safety issues</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`mt-8 text-center p-6 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
              Need Help or Want to Report Something?
            </h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              If you encounter any suspicious behavior or feel unsafe, please contact us immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Contact Support
              </a>
              <a
                href="tel:911"
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                Emergency: 911
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StaySafeOnlinePage;
