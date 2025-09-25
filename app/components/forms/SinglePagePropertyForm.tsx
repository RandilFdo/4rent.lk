"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../inputs/Input";
import LocationSelect from "../inputs/LocationSelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

interface PropertyFormData {
  // Location
  location: { district: string; city: string };
  address: string;
  
  // Property Details
  bedrooms: number;
  bathrooms: number;
  landSize: string;
  landSizeUnit: string;
  propertySize: string;
  propertyType: string;
  furnishedStatus: string;
  apartmentComplex: string;
  landType: string;
  
  // Features (for room & annex)
  privateEntrance: boolean;
  floor: string;
  
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
}

interface SinglePagePropertyFormProps {
  propertyType: string;
  onComplete: (data: PropertyFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<PropertyFormData>;
}

const SinglePagePropertyForm: React.FC<SinglePagePropertyFormProps> = ({
  propertyType,
  onComplete,
  onCancel,
  isLoading = false,
  initialData
}) => {
  const [activeTab, setActiveTab] = useState("location");
  const [formData, setFormData] = useState<PropertyFormData>({
    location: initialData?.location || { district: "", city: "" },
    address: initialData?.address || "",
    bedrooms: initialData?.bedrooms || 1,
    bathrooms: initialData?.bathrooms || 1,
    landSize: initialData?.landSize || "",
    landSizeUnit: initialData?.landSizeUnit || "perches",
    propertySize: initialData?.propertySize || "",
    propertyType: initialData?.propertyType || "",
    furnishedStatus: initialData?.furnishedStatus || "unfurnished",
    apartmentComplex: initialData?.apartmentComplex || "",
    landType: initialData?.landType || "",
    privateEntrance: initialData?.privateEntrance || false,
    floor: initialData?.floor || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    priceUnit: initialData?.priceUnit || "per month",
    isNegotiable: initialData?.isNegotiable || false,
    images: initialData?.images || [],
    contactPhone: initialData?.contactPhone || "",
    contactName: initialData?.contactName || ""
  });

  const updateFormData = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPropertyTypeInfo = () => {
    switch (propertyType) {
      case "house":
        return { 
          icon: "🏠", 
          name: "House", 
          priceUnit: "per month",
          features: ["bedrooms", "bathrooms", "landSize", "propertySize", "address"]
        };
      case "apartment":
        return { 
          icon: "🏢", 
          name: "Apartment", 
          priceUnit: "per month",
          features: ["bedrooms", "bathrooms", "propertySize", "furnishedStatus", "apartmentComplex", "address"]
        };
      case "commercial":
        return { 
          icon: "🏪", 
          name: "Commercial Property", 
          priceUnit: "per month",
          features: ["propertyType", "propertySize", "address"]
        };
      case "room":
        return { 
          icon: "🚪", 
          name: "Room & Annex", 
          priceUnit: "per month",
          features: ["bedrooms", "bathrooms", "propertyType", "privateEntrance", "floor", "address"]
        };
      case "holiday":
        return { 
          icon: "🏖️", 
          name: "Holiday Rental", 
          priceUnit: "per night",
          features: ["bedrooms", "bathrooms", "propertyType", "address"]
        };
      case "land":
        return { 
          icon: "🌾", 
          name: "Land", 
          priceUnit: "per year",
          features: ["landType", "landSize", "address"]
        };
      default:
        return { 
          icon: "🏠", 
          name: "Property", 
          priceUnit: "per month",
          features: ["bedrooms", "bathrooms", "propertySize", "address"]
        };
    }
  };

  const propertyInfo = getPropertyTypeInfo();

  const tabs = [
    { id: "location", label: "Location", icon: "📍" },
    { id: "property", label: "Property Details", icon: propertyInfo.icon },
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
      case "property":
        switch (propertyType) {
          case "house":
            return formData.bedrooms > 0 && formData.bathrooms > 0 && formData.landSize && formData.propertySize;
          case "apartment":
            return formData.bedrooms > 0 && formData.bathrooms > 0 && formData.propertySize && formData.furnishedStatus;
          case "commercial":
            return formData.propertyType && formData.propertySize;
          case "room":
            return formData.bedrooms > 0 && formData.bathrooms > 0 && formData.propertyType;
          case "holiday":
            return formData.bedrooms > 0 && formData.bathrooms > 0 && formData.propertyType;
          case "land":
            return formData.landType && formData.landSize;
          default:
            return true;
        }
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

    if (!formData.title || !formData.description || !formData.price || !formData.contactPhone || !formData.area) {
      alert('Please fill in all required fields');
      return;
    }

    onComplete(formData);
  };


  return (
    <div className="max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => {
            const canAccess = canSwitchToTab(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                disabled={!canAccess}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  canAccess ? 'hover:scale-105' : ''
                } ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg border-2 border-blue-600'
                    : canAccess
                    ? 'bg-white text-gray-800 hover:bg-blue-50 hover:shadow-md border-2 border-gray-300 hover:border-blue-300'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed border-2 border-gray-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Main Details */}
          <div className="space-y-6">
            {/* Location */}
            {activeTab === "location" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>📍</span> Location Details
                </h3>
                <div className="space-y-4">
                  <LocationSelect
                    value={formData.location}
                    onChange={(value) => updateFormData("location", value)}
                  />
                  
                  <Input
                    label="Enter the street, house number, and/or post code."
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    placeholder="Address (optional)"
                  />
                </div>
              </div>
            )}

            {/* Property Details */}
            {activeTab === "property" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>{propertyInfo.icon}</span> {propertyInfo.name} Details
                </h3>
                <div className="space-y-4">
                  {/* House4Rent */}
                  {propertyType === "house" && (
                    <>
                      <Counter
                        title="Beds *"
                        subTitle="Beds"
                        value={formData.bedrooms}
                        onChange={(value) => updateFormData("bedrooms", value)}
                      />
                      
                      <Counter
                        title="Baths *"
                        subTitle="Baths"
                        value={formData.bathrooms}
                        onChange={(value) => updateFormData("bathrooms", value)}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            What's the size of your land? *
                          </label>
                          <Input
                            value={formData.landSize}
                            onChange={(e) => updateFormData("landSize", e.target.value)}
                            placeholder="Land size"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Unit *
                          </label>
                          <select
                            value={formData.landSizeUnit}
                            onChange={(e) => updateFormData("landSizeUnit", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            required
                          >
                            <option value="perches">Perches</option>
                            <option value="acres">Acres</option>
                            <option value="sqft">Square Feet</option>
                          </select>
                        </div>
                      </div>
                      
                      <Input
                        label="What's the size of your property? *"
                        value={formData.propertySize}
                        onChange={(e) => updateFormData("propertySize", e.target.value)}
                        placeholder="House size (sqft)"
                        required
                      />
                    </>
                  )}

                  {/* Apartment4Rent */}
                  {propertyType === "apartment" && (
                    <>
                      <Counter
                        title="Beds *"
                        subTitle="Beds"
                        value={formData.bedrooms}
                        onChange={(value) => updateFormData("bedrooms", value)}
                      />
                      
                      <Counter
                        title="Baths *"
                        subTitle="Baths"
                        value={formData.bathrooms}
                        onChange={(value) => updateFormData("bathrooms", value)}
                      />
                      
                      <Input
                        label="What's the size of your property? *"
                        value={formData.propertySize}
                        onChange={(e) => updateFormData("propertySize", e.target.value)}
                        placeholder="Size (sqft)"
                        required
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Furnished status *
                        </label>
                        <select
                          value={formData.furnishedStatus}
                          onChange={(e) => updateFormData("furnishedStatus", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                          required
                        >
                          <option value="unfurnished">Unfurnished</option>
                          <option value="semi-furnished">Semi furnished</option>
                          <option value="fully-furnished">Fully furnished</option>
                        </select>
                      </div>
                      
                      <Input
                        label="Apartment Complex"
                        value={formData.apartmentComplex}
                        onChange={(e) => updateFormData("apartmentComplex", e.target.value)}
                        placeholder="Apartment Complex"
                      />
                    </>
                  )}

                  {/* Commercial Property4Rent */}
                  {propertyType === "commercial" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property type * (building, factory/workshop, hotel, office, restaurant, shop, warehouse/storage, other)
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => updateFormData("propertyType", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                          required
                        >
                          <option value="">Select Property Type</option>
                          <option value="building">Building</option>
                          <option value="factory-workshop">Factory/Workshop</option>
                          <option value="hotel">Hotel</option>
                          <option value="office">Office</option>
                          <option value="restaurant">Restaurant</option>
                          <option value="shop">Shop</option>
                          <option value="warehouse-storage">Warehouse/Storage</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <Input
                        label="What's the size of your property? *"
                        value={formData.propertySize}
                        onChange={(e) => updateFormData("propertySize", e.target.value)}
                        placeholder="Size (sqft)"
                        required
                      />
                    </>
                  )}

                  {/* Room & Annex4Rent */}
                  {propertyType === "room" && (
                    <>
                      <Counter
                        title="Beds *"
                        subTitle="Beds"
                        value={formData.bedrooms}
                        onChange={(value) => updateFormData("bedrooms", value)}
                      />
                      
                      <Counter
                        title="Baths *"
                        subTitle="Baths"
                        value={formData.bathrooms}
                        onChange={(value) => updateFormData("bathrooms", value)}
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property type *
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => updateFormData("propertyType", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                          required
                        >
                          <option value="">Select Property Type</option>
                          <option value="room">Room</option>
                          <option value="annex">Annex</option>
                          <option value="studio">Studio</option>
                        </select>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-700">Features (optional)</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="privateEntrance"
                              checked={formData.privateEntrance}
                              onChange={(e) => updateFormData("privateEntrance", e.target.checked)}
                              className="rounded"
                            />
                            <label htmlFor="privateEntrance" className="text-sm text-gray-700">
                              Private entrance
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Floor
                          </label>
                          <select
                            value={formData.floor}
                            onChange={(e) => updateFormData("floor", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                          >
                            <option value="">Select Floor</option>
                            <option value="lower">Lower</option>
                            <option value="upper">Upper</option>
                            <option value="ground">Ground</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Holiday4Rent */}
                  {propertyType === "holiday" && (
                    <>
                      <Counter
                        title="Beds *"
                        subTitle="Beds"
                        value={formData.bedrooms}
                        onChange={(value) => updateFormData("bedrooms", value)}
                      />
                      
                      <Counter
                        title="Baths *"
                        subTitle="Baths"
                        value={formData.bathrooms}
                        onChange={(value) => updateFormData("bathrooms", value)}
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property type *
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => updateFormData("propertyType", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                          required
                        >
                          <option value="">Select Property Type</option>
                          <option value="house">House</option>
                          <option value="apartment">Apartment</option>
                          <option value="villa">Villa</option>
                          <option value="bungalow">Bungalow</option>
                          <option value="cottage">Cottage</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Land4Rent */}
                  {propertyType === "land" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Land type *
                        </label>
                        <select
                          value={formData.landType}
                          onChange={(e) => updateFormData("landType", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                          required
                        >
                          <option value="">Select Land Type</option>
                          <option value="agricultural">Agricultural</option>
                          <option value="commercial">Commercial</option>
                          <option value="residential">Residential</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            What's the size of your land? *
                          </label>
                          <Input
                            value={formData.landSize}
                            onChange={(e) => updateFormData("landSize", e.target.value)}
                            placeholder="Land size"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Unit *
                          </label>
                          <select
                            value={formData.landSizeUnit}
                            onChange={(e) => updateFormData("landSizeUnit", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            required
                          >
                            <option value="perches">Perches</option>
                            <option value="acres">Acres</option>
                            <option value="sqft">Square Feet</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Listing Details */}
            {activeTab === "listing" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>📝</span> Listing Details
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Title *"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    placeholder={`e.g., Beautiful ${propertyInfo.name} in ${formData.location.city || 'Colombo'}`}
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description * (0/5000)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateFormData("description", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      maxLength={5000}
                      placeholder="Describe your property, its features, location advantages, and what makes it special..."
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
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>💰</span> Pricing
                </h3>
                <div className="space-y-4">
                  <Input
                    label={`What's the rent of the property? *`}
                    type="number"
                    value={formData.price}
                    onChange={(e) => updateFormData("price", e.target.value)}
                    placeholder={`Rent (Rs) ${propertyInfo.priceUnit}`}
                    required
                  />
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="negotiable"
                      checked={formData.isNegotiable}
                      onChange={(e) => updateFormData("isNegotiable", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="negotiable" className="text-sm text-gray-700">
                      Negotiable
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Photos */}
            {activeTab === "media" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>📸</span> Add Photos
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add up to 5 photos
                    </label>
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
                </div>
              </div>
            )}

            {/* Contact Details */}
            {activeTab === "contact" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>📞</span> Contact Details
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Contact details *"
                    value={formData.contactName}
                    onChange={(e) => updateFormData("contactName", e.target.value)}
                    placeholder="Your name"
                    required
                  />
                  
                  <Input
                    label="Phone Number *"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => updateFormData("contactPhone", e.target.value)}
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Listing Summary</h3>
            
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
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Location:</span>
                <span className="ml-2">
                  {formData.location.district && formData.location.city
                    ? `${formData.location.city.charAt(0).toUpperCase() + formData.location.city.slice(1).toLowerCase()}, ${formData.location.district.charAt(0).toUpperCase() + formData.location.district.slice(1).toLowerCase()}`
                    : "Not specified"}
                </span>
              </div>
              
              {formData.address && (
                <div>
                  <span className="font-medium">Address:</span>
                  <span className="ml-2">{formData.address}</span>
                </div>
              )}
              
              <div>
                <span className="font-medium">Property:</span>
                <span className="ml-2">
                  {propertyType === "house" && formData.bedrooms > 0 && formData.bathrooms > 0
                    ? `${formData.bedrooms} bed • ${formData.bathrooms} bath • ${formData.propertySize} sq ft`
                    : propertyType === "apartment" && formData.bedrooms > 0 && formData.bathrooms > 0
                    ? `${formData.bedrooms} bed • ${formData.bathrooms} bath • ${formData.propertySize} sq ft • ${formData.furnishedStatus}`
                    : propertyType === "commercial"
                    ? `${formData.propertyType} • ${formData.propertySize} sq ft`
                    : propertyType === "room" && formData.bedrooms > 0 && formData.bathrooms > 0
                    ? `${formData.bedrooms} bed • ${formData.bathrooms} bath • ${formData.propertyType}`
                    : propertyType === "holiday" && formData.bedrooms > 0 && formData.bathrooms > 0
                    ? `${formData.bedrooms} bed • ${formData.bathrooms} bath • ${formData.propertyType}`
                    : propertyType === "land"
                    ? `${formData.landType} • ${formData.landSize} ${formData.landSizeUnit}`
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
                      LKR {formData.price}/{propertyInfo.priceUnit}
                      {formData.isNegotiable && (
                        <span className="text-xs text-green-600 ml-1">(Negotiable)</span>
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
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            {!isFirstStep && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
              ? 'Creating...' 
              : isLastStep 
                ? 'Create Listing' 
                : 'Next Step'
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default SinglePagePropertyForm;
