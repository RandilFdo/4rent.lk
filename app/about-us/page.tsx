'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';

const AboutUsPage = () => {
  const { isDarkMode } = useDarkMode();

  const teamMembers = [
    {
      name: "Our Team",
      role: "4Rent Development Team",
      description: "A passionate group of developers and designers dedicated to creating the best rental platform for Sri Lanka."
    }
  ];

  const values = [
    {
      title: "100% Free",
      description: "We believe everyone should have access to a platform to share their resources without financial barriers.",
      icon: "💰"
    },
    {
      title: "Community First",
      description: "Building a trusted community where people can safely share and discover amazing rentals.",
      icon: "🤝"
    },
    {
      title: "Safety & Security",
      description: "Your safety is our top priority. We implement multiple layers of protection and verification.",
      icon: "🛡️"
    },
    {
      title: "Local Focus",
      description: "Designed specifically for Sri Lankan users with local categories, locations, and cultural understanding.",
      icon: "🇱🇰"
    }
  ];

  const stats = [
    { number: "100%", label: "Free to Use" },
    { number: "24/7", label: "Admin Support" },
    { number: "3", label: "Main Categories" },
    { number: "30", label: "Days Listing Duration" }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Container>
        <div className="max-w-4xl mx-auto py-8 sm:py-12">
          <Heading
            title="About 4Rent"
            subtitle="Sri Lanka's premier free rental platform"
          />
          
          {/* Hero Section */}
          <div className={`mt-8 p-8 rounded-lg ${isDarkMode ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'}`}>
            <div className="text-center">
              <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Welcome to 4Rent
              </h2>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                The completely free platform that connects Sri Lankans to share vehicles, properties, and experiences. 
                No fees, no subscriptions, no hidden costs - just a simple way to rent and share what you have.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>
                  🚗 Vehicles
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${isDarkMode ? 'bg-green-600 text-white' : 'bg-green-600 text-white'}`}>
                  🏠 Properties
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${isDarkMode ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'}`}>
                  🎯 Experiences
                </span>
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="mt-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Story
            </h2>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                4Rent was born from a simple idea: what if sharing resources in Sri Lanka could be completely free and accessible to everyone? 
                We noticed that existing rental platforms often charged high fees or had complex subscription models that excluded many people.
              </p>
              <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our mission is to democratize the sharing economy in Sri Lanka by providing a platform where anyone can list their vehicles, 
                properties, or experiences without any financial barriers. Whether you're a student looking to rent a bike for a day, 
                a family wanting to rent a house for vacation, or someone offering a unique experience - 4Rent is here for you.
              </p>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We believe that the best communities are built on trust, transparency, and mutual benefit. That's why we've made 4Rent 
                completely free and focused on creating a safe, user-friendly experience for all Sri Lankans.
              </p>
            </div>
          </div>

          {/* Our Values */}
          <div className="mt-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {value.title}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12">
            <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Why Choose 4Rent?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="text-4xl mb-4">📝</div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  1. Post Your Listing
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Create a free account and post your vehicle, property, or experience with photos and details.
                </p>
              </div>
              <div className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="text-4xl mb-4">✅</div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  2. Get Approved
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Our admin team reviews your listing to ensure quality and safety before publishing.
                </p>
              </div>
              <div className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="text-4xl mb-4">🤝</div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  3. Connect & Rent
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Interested users contact you directly, and you arrange the rental terms safely.
                </p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mt-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Team
            </h2>
            <div className="grid md:grid-cols-1 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {member.role}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className={`mt-12 text-center p-8 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
              Ready to Get Started?
            </h2>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              Join thousands of Sri Lankans who are already using 4Rent to share and discover amazing rentals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/post"
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Post Your First Listing
              </a>
              <a
                href="/"
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                Browse Listings
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUsPage;
