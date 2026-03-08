"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Button from "../components/Button";
import useLoginModal from "../hooks/useLoginModal";

const PostPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams?.get('edit');
  const loginModal = useLoginModal();

  // Check if user is logged in, if not show login modal
  useEffect(() => {
    // This will be handled by the parent component or middleware
    // For now, we'll let the user proceed but require login for actual posting
  }, []);

  const categories = [
    {
      type: "vehicle",
      label: "Vehicle4Rent",
      icon: "🚗",
      description: "Cars, Bikes, Vans, SUVs, Buses, Three Wheelers"
    },
    {
      type: "property",
      label: "Property4Rent", 
      icon: "🏠",
      description: "Houses, Apartments, Rooms, Commercial spaces"
    },
    {
      type: "experience",
      label: "Experience4Rent",
      icon: "🎯",
      description: "Tours, Activities, Adventures, Cultural Experiences"
    }
  ];

  const handleCategorySelect = (categoryType: string) => {
    if (categoryType === "vehicle") {
      router.push('/post/vehicle');
    } else if (categoryType === "property") {
      router.push('/post/building');
    } else if (categoryType === "experience") {
      router.push('/post/experience');
    }
  };

  return (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center pt-32 fade-in">
            <Heading
              title={editId ? "Edit Your Listing" : "What would you like to rent out?"}
              subtitle={editId ? "Make changes to your listing" : "Choose a category to get started"}
            />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {categories.map((category, index) => (
                      <div
                        key={category.type}
                        onClick={() => handleCategorySelect(category.type)}
                        className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group card-hover scale-in flex flex-col h-full"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                <div className="text-center flex flex-col h-full">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text dark:text-white mb-2 sm:mb-3">
                    {category.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg flex-grow">
                    {category.description}
                  </p>
                  <div className="mt-auto">
                    <Button
                      label={editId ? "Edit Listing" : "Get Started"}
                      onClick={() => handleCategorySelect(category.type)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {editId && (
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl sm:rounded-2xl slide-in-left">
              <p className="text-blue-800 text-xs sm:text-sm font-medium">
                <strong>Note:</strong> You are editing listing ID: {editId}. 
                The form will be pre-filled with your existing listing data.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PostPage;
