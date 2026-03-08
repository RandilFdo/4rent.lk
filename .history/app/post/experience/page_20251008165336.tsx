"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Input from "../../components/inputs/Input";
import ImageUpload from "../../components/inputs/ImageUpload";
import LocationSelect from "../../components/inputs/LocationSelect";
import Counter from "../../components/inputs/Counter";
import { ExperienceType, ExperienceAttributes } from "../../types";
import useLoginModal from "../../hooks/useLoginModal";
import { useSession } from "next-auth/react";

const ExperiencePostPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams?.get('edit');
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [] as string[],
    location: {
      district: "",
      city: "",
    },
    address: "",
    price: 0,
    priceUnit: "per person",
    isNegotiable: false,
    contactName: "",
    contactPhone: "",
    whatsappNumber: "",
  });

  const [experienceData, setExperienceData] = useState<ExperienceAttributes>({
    experienceType: "TOUR_GUIDE",
    duration: 1,
    maxParticipants: 10,
    minAge: 0,
    difficultyLevel: "EASY",
    includes: [] as string[],
    requirements: [] as string[],
    languages: [] as string[],
    seasonality: "",
    safetyNotes: "",
  });

  // Note: Autofill removed - no profile system implemented yet

  const [includeItem, setIncludeItem] = useState("");
  const [requirementItem, setRequirementItem] = useState("");
  const [languageItem, setLanguageItem] = useState("");

  const experienceTypes: { value: ExperienceType; label: string; icon: string }[] = [
    { value: "TOUR_GUIDE", label: "Tour Guide", icon: "🗺️" },
    { value: "SNORKELING", label: "Snorkeling", icon: "🤿" },
    { value: "SURFING", label: "Surfing", icon: "🏄‍♂️" },
    { value: "HORSE_RIDING", label: "Horse Riding", icon: "🐴" },
    { value: "BOAT_RIDING", label: "Boat Riding", icon: "⛵" },
    { value: "HIKING", label: "Hiking", icon: "🥾" },
    { value: "WILDLIFE_SAFARI", label: "Wildlife Safari", icon: "🦁" },
    { value: "CULTURAL_TOUR", label: "Cultural Tour", icon: "🏛️" },
    { value: "FOOD_TOUR", label: "Food Tour", icon: "🍛" },
    { value: "ADVENTURE_SPORTS", label: "Adventure Sports", icon: "🏔️" },
    { value: "OTHER", label: "Other", icon: "✨" },
  ];

  const difficultyLevels = [
    { value: "EASY", label: "Easy", color: "text-green-600" },
    { value: "MEDIUM", label: "Medium", color: "text-yellow-600" },
    { value: "HARD", label: "Hard", color: "text-red-600" },
  ];

  const priceUnits = [
    { value: "per person", label: "Per Person" },
    { value: "per group", label: "Per Group" },
    { value: "per hour", label: "Per Hour" },
    { value: "per day", label: "Per Day" },
  ];

  useEffect(() => {
    if (status === "unauthenticated") {
      loginModal.onOpen();
    }
  }, [status, loginModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      loginModal.onOpen();
      return;
    }

    // Validation
    if (formData.images.length === 0) {
      alert('Please upload at least one photo');
      return;
    }

    if (!formData.title || !formData.description || !formData.price || !formData.contactName || !formData.contactPhone || !formData.location.district || !formData.location.city) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const requestData = {
        ...formData,
        mainCategory: "EXPERIENCE",
        subCategory: experienceData.experienceType,
        experienceAttributes: experienceData,
        userId: (session.user as any).id || "demo-user",
      };
      
      console.log('Sending data to API:', requestData);
      
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert('Experience listing submitted for review! You will be notified once it\'s approved.');
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        alert(`Failed to create experience listing: ${errorData.error || errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      alert(`An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addIncludeItem = () => {
    if (includeItem.trim()) {
      setExperienceData(prev => ({
        ...prev,
        includes: [...prev.includes, includeItem.trim()]
      }));
      setIncludeItem("");
    }
  };

  const removeIncludeItem = (index: number) => {
    setExperienceData(prev => ({
      ...prev,
      includes: prev.includes.filter((_, i) => i !== index)
    }));
  };

  const addRequirementItem = () => {
    if (requirementItem.trim()) {
      setExperienceData(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirementItem.trim()]
      }));
      setRequirementItem("");
    }
  };

  const removeRequirementItem = (index: number) => {
    setExperienceData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addLanguageItem = () => {
    if (languageItem.trim()) {
      setExperienceData(prev => ({
        ...prev,
        languages: [...prev.languages, languageItem.trim()]
      }));
      setLanguageItem("");
    }
  };

  const removeLanguageItem = (index: number) => {
    setExperienceData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center pt-32 mb-6 sm:mb-8">
            <Heading
              title={editId ? "Edit Your Experience" : "Share Your Experience"}
              subtitle={editId ? "Update your experience listing" : "Tell us about the amazing experience you want to offer"}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="md:col-span-2">
                  <Input
                    id="title"
                    label="Experience Title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    disabled={isLoading}
                    required
                    placeholder="e.g., Amazing Snorkeling Adventure in Hikkaduwa"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    disabled={isLoading}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Describe your experience in detail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience Type
                  </label>
                  <select
                    value={experienceData.experienceType}
                    onChange={(e) => setExperienceData(prev => ({ ...prev, experienceType: e.target.value as ExperienceType }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {experienceTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={experienceData.difficultyLevel}
                    onChange={(e) => setExperienceData(prev => ({ ...prev, difficultyLevel: e.target.value as "EASY" | "MEDIUM" | "HARD" }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {difficultyLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

                    {/* Experience Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Experience Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={experienceData.duration}
                    onChange={(e) => setExperienceData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={experienceData.maxParticipants}
                    onChange={(e) => setExperienceData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Age
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={experienceData.minAge || 0}
                    onChange={(e) => setExperienceData(prev => ({ ...prev, minAge: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Seasonality (Best time of year)
                </label>
                <input
                  type="text"
                  value={experienceData.seasonality || ""}
                  onChange={(e) => setExperienceData(prev => ({ ...prev, seasonality: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., December to March (dry season)"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Safety Notes
                </label>
                <textarea
                  value={experienceData.safetyNotes || ""}
                  onChange={(e) => setExperienceData(prev => ({ ...prev, safetyNotes: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Important safety information for participants..."
                />
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">What's Included</h3>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={includeItem}
                    onChange={(e) => setIncludeItem(e.target.value)}
                    placeholder="e.g., Equipment, Meals, Transport"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addIncludeItem}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {experienceData.includes.map((item, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeIncludeItem(index)}
                        className="text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Requirements</h3>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={requirementItem}
                    onChange={(e) => setRequirementItem(e.target.value)}
                    placeholder="e.g., Swimming ability, Comfortable shoes"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addRequirementItem}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {experienceData.requirements.map((item, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeRequirementItem(index)}
                        className="text-orange-600 dark:text-orange-300 hover:text-orange-800 dark:hover:text-orange-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Languages Spoken</h3>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={languageItem}
                    onChange={(e) => setLanguageItem(e.target.value)}
                    placeholder="e.g., English, Sinhala, Tamil"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addLanguageItem}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {experienceData.languages.map((item, index) => (
                    <span
                      key={index}
                      className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeLanguageItem(index)}
                        className="text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

                    {/* Location & Pricing */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Location & Pricing</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <LocationSelect
                    value={formData.location}
                    onChange={(location) => setFormData(prev => ({ ...prev, location }))}
                  />
                </div>

                <div className="md:col-span-2">
                  <Input
                    id="address"
                    label="Address (Optional)"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Input
                    id="price"
                    label="Price"
                    type="number"
                    value={formData.price.toString()}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Unit
                  </label>
                  <select
                    value={formData.priceUnit}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceUnit: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {priceUnits.map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Input
                    id="contactName"
                    label="Contact Name"
                    value={formData.contactName}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <Input
                    id="contactPhone"
                    label="Contact Phone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <Input
                    id="whatsappNumber"
                    label="WhatsApp Number (Optional)"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Photos</h3>
              <ImageUpload
                value={formData.images}
                onChange={(images) => setFormData(prev => ({ ...prev, images }))}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Create Experience"}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ExperiencePostPage;
