"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MainCategory } from "@/app/types";
import qs from "query-string";

interface CategorySelectorProps {
  currentCategory?: MainCategory;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ currentCategory }) => {
  const router = useRouter();
  const params = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>(currentCategory || "VEHICLE");

  const categories = [
    {
      label: "🚗 Vehicles",
      value: "VEHICLE" as MainCategory,
      description: "Cars, Bikes, Vans & More"
    },
    {
      label: "🏠 Properties", 
      value: "PROPERTY" as MainCategory,
      description: "Houses, Apartments & Rooms"
    }
  ];

  const handleCategoryChange = (category: MainCategory) => {
    setSelectedCategory(category);
    
    let currentQuery = {};
    
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    
    const updatedQuery: any = {
      ...currentQuery,
      mainCategory: category
    };
    
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });
    
    router.push(url);
  };

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          What would you like to rent?
        </h2>
      </div>
      
      <div className="flex gap-4 justify-center mt-6">
        {categories.map((category) => (
          <div
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={`
              flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
              ${selectedCategory === category.value
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
              }
            `}
          >
            <div className="text-3xl mb-2">{category.label.split(' ')[0]}</div>
            <div className="font-semibold text-gray-900">{category.label.split(' ')[1]}</div>
            <div className="text-sm text-gray-600 mt-1">{category.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;

