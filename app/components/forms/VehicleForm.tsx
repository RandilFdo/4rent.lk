"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MultiStepForm from "./MultiStepForm";
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
  isNegotiable: boolean;
  
  // Media & Contact
  images: string[];
  contactPhone: string;
  contactName: string;
}

interface VehicleFormProps {
  vehicleType: VehicleType;
  onComplete: (data: VehicleFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  vehicleType,
  onComplete,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<VehicleFormData>({
    location: { district: "", city: "" },
    brand: "",
    model: "",
    year: "",
    transmission: "",
    fuelType: "",
    seats: vehicleType === "BIKE" ? 2 : 5,
    mileage: "",
    title: "",
    description: "",
    price: "",
    isNegotiable: false,
    images: [],
    contactPhone: "",
    contactName: ""
  });

  const updateFormData = (field: keyof VehicleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getVehicleTypeInfo = () => {
    switch (vehicleType) {
      case "CAR":
        return { icon: "🚗", name: "Car", seats: 5 };
      case "BIKE":
        return { icon: "🏍️", name: "Bike", seats: 2 };
      case "VAN":
        return { icon: "🚐", name: "Van", seats: 8 };
      case "SUV":
        return { icon: "🚙", name: "SUV", seats: 7 };
      case "LUXURY":
        return { icon: "🏎️", name: "Luxury Car", seats: 4 };
      case "WEDDING_CAR":
        return { icon: "💒", name: "Wedding Car", seats: 4 };
      case "BUS":
        return { icon: "🚌", name: "Bus", seats: 30 };
      case "THREE_WHEELER":
        return { icon: "🛺", name: "Three Wheeler", seats: 3 };
      default:
        return { icon: "🚗", name: "Vehicle", seats: 5 };
    }
  };

  const vehicleInfo = getVehicleTypeInfo();

  const steps = [
    {
      id: "location",
      title: "Location Details",
      description: "Where is your vehicle located?",
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{vehicleInfo.icon}</div>
            <h3 className="text-xl font-semibold">Location Details</h3>
            <p className="text-gray-600">Tell us where your {vehicleInfo.name.toLowerCase()} is located</p>
          </div>
          <LocationSelect
            value={formData.location}
            onChange={(value) => updateFormData("location", value)}
          />
        </div>
      )
    },
    {
      id: "vehicle-details",
      title: `${vehicleInfo.name} Details`,
      description: `Basic information about your ${vehicleInfo.name.toLowerCase()}`,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{vehicleInfo.icon}</div>
            <h3 className="text-xl font-semibold">{vehicleInfo.name} Details</h3>
            <p className="text-gray-600">Tell us about your vehicle specifications</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transmission *
              </label>
              <select
                value={formData.transmission}
                onChange={(e) => updateFormData("transmission", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Transmission</option>
                <option value="AUTO">Automatic</option>
                <option value="MANUAL">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type *
              </label>
              <select
                value={formData.fuelType}
                onChange={(e) => updateFormData("fuelType", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          
          {vehicleType !== "BIKE" && (
            <Counter
              title="Seats *"
              subTitle="Number of seats"
              value={formData.seats}
              onChange={(value) => updateFormData("seats", value)}
            />
          )}
        </div>
      )
    },
    {
      id: "listing-details",
      title: "Listing Details",
      description: "Create an attractive listing for your vehicle",
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{vehicleInfo.icon}</div>
            <h3 className="text-xl font-semibold">Listing Details</h3>
            <p className="text-gray-600">Make your listing stand out</p>
          </div>
          
          <Input
            label="Title *"
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            placeholder={`e.g., ${formData.brand} ${formData.model} ${formData.year} - ${formData.transmission}`}
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
              placeholder="More details = more interested buyers! Describe the condition, features, and any special notes."
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.description.length}/5000 characters
            </p>
          </div>
        </div>
      )
    },
    {
      id: "pricing",
      title: "Pricing",
      description: "Set your rental price and terms",
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">💰</div>
            <h3 className="text-xl font-semibold">Pricing</h3>
            <p className="text-gray-600">Set a competitive price for your vehicle</p>
          </div>
          
          <div className="max-w-md mx-auto space-y-4">
            <Input
              label="Price per Day (LKR) *"
              type="number"
              value={formData.price}
              onChange={(e) => updateFormData("price", e.target.value)}
              placeholder="e.g., 5000"
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
                Price is negotiable
              </label>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "media",
      title: "Photos",
      description: "Add photos to showcase your vehicle",
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">📸</div>
            <h3 className="text-xl font-semibold">Add Photos</h3>
            <p className="text-gray-600">Good photos attract more renters</p>
          </div>
          
          <ImageUpload
            value={formData.images}
            onChange={(value) => updateFormData("images", value)}
            maxImages={5}
          />
          
          {formData.images.length === 0 && (
            <p className="text-sm text-red-600 text-center">
              You must upload at least one photo
            </p>
          )}
        </div>
      )
    },
    {
      id: "contact",
      title: "Contact Details",
      description: "How can renters reach you?",
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">📞</div>
            <h3 className="text-xl font-semibold">Contact Details</h3>
            <p className="text-gray-600">How can interested renters contact you?</p>
          </div>
          
          <div className="max-w-md mx-auto space-y-4">
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
      )
    }
  ];

  const handleComplete = () => {
    onComplete(formData);
  };

  return (
    <MultiStepForm
      steps={steps}
      onComplete={handleComplete}
      onCancel={onCancel}
      isLoading={isLoading}
      submitLabel="Post Listing"
    />
  );
};

export default VehicleForm;
