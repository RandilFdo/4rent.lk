"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../inputs/Input";
import LocationSelect from "../inputs/LocationSelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import { VehicleType } from "../../types";

interface VehicleFormData {
  // Location
  location: { district: string; city: string };
  
  // Vehicle Details
  brand: string;
  model: string;
  year: string;
  transmission: string;
  fuelType: string;
  seats: number;
  mileage: string;
  
  // Listing Details
  title: string;
  description: string;
  price: string;
  priceUnit: string;
  isNegotiable: boolean;
  
  // Media & Contact
  images: string[];
  contactPhone: string;
  contactName: string;
  
  // Featured Option
}

interface SinglePageVehicleFormProps {
  vehicleType: VehicleType;
  onComplete: (data: VehicleFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<VehicleFormData>;
}

const SinglePageVehicleForm: React.FC<SinglePageVehicleFormProps> = ({
  vehicleType,
  onComplete,
  onCancel,
  isLoading = false,
  initialData
}) => {
  const [activeTab, setActiveTab] = useState("location");
  const [formData, setFormData] = useState<VehicleFormData>({
    location: initialData?.location || { district: "", city: "" },
    brand: initialData?.brand || "",
    model: initialData?.model || "",
    year: initialData?.year || "",
    transmission: initialData?.transmission || "",
    fuelType: initialData?.fuelType || "",
    seats: initialData?.seats || (vehicleType === "BIKE" ? 2 : vehicleType === "VAN" ? 8 : 4),
    mileage: initialData?.mileage || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    priceUnit: initialData?.priceUnit || "per day",
    isNegotiable: initialData?.isNegotiable || false,
    images: initialData?.images || [],
    contactPhone: initialData?.contactPhone || "",
    contactName: initialData?.contactName || "",
  });

  // Note: Autofill removed - no profile system implemented yet

  const updateFormData = (field: keyof VehicleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getVehicleTypeInfo = () => {
    switch (vehicleType) {
      case "CAR":
        return { icon: "🚗", name: "Car", seats: 4 };
      case "BIKE":
        return { icon: "🏍️", name: "Bike", seats: 2 };
      case "VAN":
        return { icon: "🚐", name: "Van", seats: 8 };
      case "SUV":
        return { icon: "🚙", name: "SUV", seats: 7 };
      case "LUXURY":
        return { icon: "✨", name: "Luxury Vehicle", seats: 4 };
      case "WEDDING_CAR":
        return { icon: "💒", name: "Wedding Car", seats: 4 };
      case "BUS":
        return { icon: "🚌", name: "Bus", seats: 30 };
      case "THREE_WHEELER":
        return { icon: "🛺", name: "Three Wheeler", seats: 3 };
      case "TRUCK":
        return { icon: "🚛", name: "Truck", seats: 2 };
      default:
        return { icon: "🚗", name: "Vehicle", seats: 4 };
    }
  };

  const vehicleInfo = getVehicleTypeInfo();

  const tabs = [
    { id: "location", label: "Location", icon: "📍" },
    { id: "vehicle", label: "Vehicle Details", icon: vehicleInfo.icon },
    { id: "listing", label: "Listing", icon: "📝" },
    { id: "pricing", label: "Pricing", icon: "💰" },
    { id: "media", label: "Photos", icon: "📸" },
    { id: "contact", label: "Contact", icon: "📞" }
  ];

  const currentStepIndex = tabs.findIndex(tab => tab.id === activeTab);
  const isLastStep = currentStepIndex === tabs.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const validateCurrentStep = () => {
    switch (activeTab) {
      case "location":
        return formData.location.district && formData.location.city;
      case "vehicle":
        return formData.brand && formData.model && formData.year && formData.transmission && formData.fuelType;
      case "listing":
        return formData.title && formData.description;
      case "pricing":
        return formData.price;
      case "media":
        return formData.images.length > 0;
      case "contact":
        return formData.contactName && formData.contactPhone;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) {
      alert('Please fill in all required fields before proceeding to the next step.');
      return;
    }

    if (isLastStep) {
      handleSubmit(new Event('submit') as any);
    } else {
      const nextIndex = currentStepIndex + 1;
      setActiveTab(tabs[nextIndex].id);
    }
  };

  const handlePrevStep = () => {
    if (!isFirstStep) {
      const prevIndex = currentStepIndex - 1;
      setActiveTab(tabs[prevIndex].id);
    }
  };

  const canSwitchToTab = (tabId: string) => {
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    const currentIndex = currentStepIndex;
    
    // Can always go to previous tabs or current tab
    if (tabIndex <= currentIndex) return true;
    
    // Can only go to next tab if current tab is completed
    return validateCurrentStep();
  };

  const handleTabClick = (tabId: string) => {
    if (canSwitchToTab(tabId)) {
      setActiveTab(tabId);
    } else {
      alert('Please complete the current step before proceeding to the next tab.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      alert('Please upload at least one photo');
      return;
    }

    if (!formData.title || !formData.description || !formData.price || !formData.contactPhone || !formData.brand || !formData.model || !formData.year || !formData.transmission || !formData.fuelType) {
      alert('Please fill in all required fields');
      return;
    }

    onComplete(formData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="mb-3 sm:mb-4">
        <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
          {tabs.map((tab) => {
            const canAccess = canSwitchToTab(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                disabled={!canAccess}
                 className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                   canAccess ? 'hover:scale-105' : ''
                 } ${
                   activeTab === tab.id
                     ? 'bg-blue-500 text-white shadow-lg border-2 border-blue-600'
                     : canAccess
                     ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-600 hover:shadow-md border-2 border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400'
                     : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed border-2 border-gray-200 dark:border-gray-500'
                 }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Main Details */}
          <div className="space-y-6">
            {/* Location */}
            {activeTab === "location" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                  <span>📍</span> Location Details
                </h3>
                <LocationSelect
                  value={formData.location}
                  onChange={(value) => updateFormData("location", value)}
                />
              </div>
            )}

            {/* Vehicle Details */}
            {activeTab === "vehicle" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                  <span>{vehicleInfo.icon}</span> {vehicleInfo.name} Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Brand *"
                    value={formData.brand}
                    onChange={(e) => updateFormData("brand", e.target.value)}
                    placeholder={`e.g., ${vehicleType === "BIKE" ? "Honda, Yamaha" : "Toyota, Honda"}`}
                    required
                  />
                  <Input
                    label="Model *"
                    value={formData.model}
                    onChange={(e) => updateFormData("model", e.target.value)}
                    placeholder={`e.g., ${vehicleType === "BIKE" ? "CBR 150R" : "Camry"}`}
                    required
                  />
                  <Input
                    label="Year *"
                    type="number"
                    value={formData.year}
                    onChange={(e) => updateFormData("year", e.target.value)}
                    placeholder="e.g., 2020"
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Transmission *
                    </label>
                    <select
                      value={formData.transmission}
                      onChange={(e) => updateFormData("transmission", e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="">Select Transmission</option>
                      <option value="AUTO">Automatic</option>
                      <option value="MANUAL">Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fuel Type *
                    </label>
                    <select
                      value={formData.fuelType}
                      onChange={(e) => updateFormData("fuelType", e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="PETROL">Petrol</option>
                      <option value="DIESEL">Diesel</option>
                      <option value="HYBRID">Hybrid</option>
                      <option value="ELECTRIC">Electric</option>
                    </select>
                  </div>
                  <Input
                    label="Mileage (km)"
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => updateFormData("mileage", e.target.value)}
                    placeholder="e.g., 50000"
                  />
                </div>
                
                {(vehicleType !== "BIKE" && vehicleType !== "THREE_WHEELER") && (
                  <div className="mt-4">
                    <Counter
                      title="Seats *"
                      subTitle="Number of seats"
                      value={formData.seats}
                      onChange={(value) => updateFormData("seats", value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Listing Details */}
            {activeTab === "listing" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                  <span>📝</span> Listing Details
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Title *"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    placeholder={`e.g., ${formData.brand} ${formData.model} ${formData.year} - ${formData.transmission}`}
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description * (0/5000)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateFormData("description", e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={4}
                      maxLength={5000}
                      placeholder="More details = more interested buyers! Describe the condition, features, and any special notes."
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.description.length}/5000 characters
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing */}
            {activeTab === "pricing" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                  <span>💰</span> Pricing
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Price (LKR) *"
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateFormData("price", e.target.value)}
                      placeholder="e.g., 5000"
                      required
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price Unit *
                      </label>
                      <select
                        value={formData.priceUnit}
                        onChange={(e) => updateFormData("priceUnit", e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="per day">Per Day</option>
                        <option value="per month">Per Month</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="negotiable"
                      checked={formData.isNegotiable}
                      onChange={(e) => updateFormData("isNegotiable", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="negotiable" className="text-sm text-gray-700">
                      Price is negotiable
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Photos */}
            {activeTab === "media" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                  <span>📸</span> Add Photos
                </h3>
                <ImageUpload
                  value={formData.images}
                  onChange={(value) => updateFormData("images", value)}
                  maxImages={5}
                />
                {formData.images.length === 0 && (
                  <p className="text-sm text-red-600 mt-2">
                    You must upload at least one photo
                  </p>
                )}
              </div>
            )}

            {/* Contact Details */}
            {activeTab === "contact" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                  <span>📞</span> Contact Details
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Your Name *"
                    value={formData.contactName}
                    onChange={(e) => updateFormData("contactName", e.target.value)}
                    placeholder="e.g., John Doe"
                    required
                  />
                  
                  <Input
                    label="Phone Number *"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => updateFormData("contactPhone", e.target.value)}
                    placeholder="+94 77 123 4567"
                    required
                  />
                </div>
              </div>
            )}

          </div>

          {/* Right Column - Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Listing Summary</h3>
            
            {/* Cover Image */}
            {formData.images.length > 0 && (
              <div className="mb-4">
                <img
                  src={formData.images[0]}
                  alt="Cover image"
                  className="w-full h-32 object-contain rounded-lg bg-gray-100"
                />
              </div>
            )}
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <span className="font-medium">Location:</span>
                <span className="ml-2">
                  {formData.location.district && formData.location.city
                    ? `${formData.location.city.charAt(0).toUpperCase() + formData.location.city.slice(1).toLowerCase()}, ${formData.location.district.charAt(0).toUpperCase() + formData.location.district.slice(1).toLowerCase()}`
                    : "Not specified"}
                </span>
              </div>
              <div>
                <span className="font-medium">Vehicle:</span>
                <span className="ml-2">
                  {formData.brand && formData.model && formData.year
                    ? `${formData.brand} ${formData.model} ${formData.year}`
                    : "Not specified"}
                </span>
              </div>
              <div>
                <span className="font-medium">Title:</span>
                <span className="ml-2">
                  {formData.title || "Not specified"}
                </span>
              </div>
              <div>
                <span className="font-medium">Price:</span>
                <span className="ml-2">
                  {formData.price ? (
                    <span>
                      LKR {formData.price}/{formData.priceUnit}
                      {formData.isNegotiable && (
                        <span className="text-xs text-green-600 dark:text-green-400 ml-1">(Negotiable)</span>
                      )}
                    </span>
                  ) : "Not specified"}
                </span>
              </div>
              <div>
                <span className="font-medium">Photos:</span>
                <span className="ml-2">
                  {formData.images.length} uploaded
                </span>
              </div>
              <div>
                <span className="font-medium">Contact:</span>
                <span className="ml-2">
                  {formData.contactName || "Not specified"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white"
              disabled={isLoading}
            >
              Cancel
            </button>
            {!isFirstStep && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white"
                disabled={isLoading}
              >
                Previous
              </button>
            )}
          </div>
          
          <button
            type="button"
            onClick={handleNextStep}
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isLastStep
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            {isLoading 
              ? 'Posting...' 
              : isLastStep 
                ? 'Post Listing'
                : 'Next Step'
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default SinglePageVehicleForm;
