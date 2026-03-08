'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';

const FAQPage = () => {
  const { isDarkMode } = useDarkMode();

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I post a listing on 4Rent?",
          answer: "Posting a listing is completely free! Simply click on 'Offer Something 4Rent' in the top menu, choose your category (Vehicle, Property, or Experience), fill out the form with details and photos, and submit. Your listing will be reviewed by our admin team and published once approved."
        },
        {
          question: "What types of items can I list?",
          answer: "You can list vehicles (cars, bikes, trucks, etc.), properties (houses, apartments, rooms, land, etc.), and experiences (tours, activities, services, etc.). All categories are completely free to post."
        },
        {
          question: "Do I need to create an account?",
          answer: "Yes, you need to create a free account to post listings and manage your ads. You can sign up using your email address or social media accounts."
        }
      ]
    },
    {
      category: "Listing Management",
      questions: [
        {
          question: "How long do my listings stay active?",
          answer: "Your listings remain active for 30 days from the approval date. You can renew them for another 30 days from your dashboard before they expire."
        },
        {
          question: "Can I edit my listing after posting?",
          answer: "Yes! You can edit your listings anytime from your dashboard. Changes will be reviewed by our admin team before going live."
        },
        {
          question: "How do I delete a listing?",
          answer: "You can delete your listings directly from your dashboard. Once deleted, the listing will be permanently removed from the platform."
        }
      ]
    },
    {
      category: "Safety & Security",
      questions: [
        {
          question: "How do I stay safe when meeting with potential renters?",
          answer: "Always meet in public places, bring a friend if possible, verify the person's identity, and trust your instincts. Never share personal financial information or send money in advance."
        },
        {
          question: "What should I do if I encounter a scammer?",
          answer: "Report suspicious activity immediately through our contact form. We take safety seriously and will investigate all reports promptly."
        },
        {
          question: "Is my personal information protected?",
          answer: "Yes, we protect your personal information according to our Privacy Policy. We never share your contact details without your permission."
        }
      ]
    },
    {
      category: "Payment & Fees",
      questions: [
        {
          question: "Are there any fees for using 4Rent?",
          answer: "No! 4Rent is completely free to use. You can post unlimited listings, browse all ads, and contact other users without any charges."
        },
        {
          question: "How do I handle payments with renters?",
          answer: "All payments are handled directly between you and the renter. We recommend using secure payment methods and always getting a receipt for transactions."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "I'm having trouble uploading photos. What should I do?",
          answer: "Make sure your photos are in JPG, PNG, or WebP format and under 10MB each. Try refreshing the page and uploading again. If the problem persists, contact our support team."
        },
        {
          question: "Why is my listing not showing up?",
          answer: "New listings go through an approval process and may take 24-48 hours to appear. Check your dashboard for the current status of your listing."
        },
        {
          question: "How do I contact support?",
          answer: "You can reach our support team through the Contact Us page or email us directly. We typically respond within 24 hours."
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Container>
        <div className="max-w-4xl mx-auto py-4 sm:py-8">
          <Heading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about using 4Rent"
          />
          
          <div className="mt-8 space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-6`}>
                <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {faq.question}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-12 text-center p-6 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
              Still have questions?
            </h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <a
              href="/contact"
              className={`inline-block px-6 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Contact Support
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQPage;
