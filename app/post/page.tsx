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
    }
  ];

  const handleCategorySelect = (categoryType: string) => {
    if (categoryType === "vehicle") {
      router.push('/post/vehicle');
    } else if (categoryType === "property") {
      router.push('/post/building');
    }
  };

  return (
    <div className="pt-24 pb-12 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <Heading
              title={editId ? "Edit Your Listing" : "What would you like to rent out?"}
              subtitle={editId ? "Make changes to your listing" : "Choose a category to get started"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.type}
                onClick={() => handleCategorySelect(category.type)}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group card-hover scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold gradient-text mb-3">
                    {category.label}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {category.description}
                  </p>
                  <div className="mt-6">
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
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl slide-in-left">
              <p className="text-blue-800 text-sm font-medium">
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
