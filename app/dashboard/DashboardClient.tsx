"use client";

import { useState, useEffect } from "react";
import { SafeUser, SafeListing } from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useRouter } from "next/navigation";

interface DashboardClientProps {
  currentUser: SafeUser;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ currentUser }) => {
  const [listings, setListings] = useState<SafeListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalListings: 0,
    approvedListings: 0,
    pendingListings: 0,
    totalViews: 0, // This would need to be tracked in the database
  });
  const router = useRouter();

  useEffect(() => {
    fetchUserListings();
  }, []);

  const fetchUserListings = async () => {
    try {
      const response = await fetch(`/api/listings?userId=${currentUser.id}`);
      if (response.ok) {
        const userListings = await response.json();
        setListings(userListings);
        
        // Calculate stats
        const totalListings = userListings.length;
        const approvedListings = userListings.filter((listing: SafeListing) => listing.status === 'APPROVED').length;
        const pendingListings = userListings.filter((listing: SafeListing) => listing.status === 'PENDING').length;
        
        setStats({
          totalListings,
          approvedListings,
          pendingListings,
          totalViews: 0, // Would need to be tracked in database
        });
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the listing from the local state
        setListings(prevListings => prevListings.filter(listing => listing.id !== listingId));
        
        // Update stats
        setStats(prevStats => ({
          ...prevStats,
          totalListings: prevStats.totalListings - 1,
        }));
        
        alert('Listing deleted successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to delete listing');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Failed to delete listing');
    }
  };

  const handleRenewListing = async (listingId: string) => {
    if (!confirm('Are you sure you want to renew this listing? It will be extended for another 30 days.')) {
      return;
    }

    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: 'POST',
      });

      if (response.ok) {
        // Refresh the listings to show updated expiration date
        fetchUserListings();
        alert('Listing renewed successfully for another 30 days!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to renew listing');
      }
    } catch (error) {
      console.error('Error renewing listing:', error);
      alert('Failed to renew listing');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string, listing: any) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    
    // Check if listing is expired
    const now = new Date();
    let daysUntilExpiry = 0;
    
    if (listing.expiresAt) {
      const expiresAt = new Date(listing.expiresAt);
      daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    } else {
      // Calculate from creation date if no expiry date
      const createdAt = new Date(listing.createdAt);
      const thirtyDaysFromCreation = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);
      daysUntilExpiry = Math.ceil((thirtyDaysFromCreation.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    }
    
    if (daysUntilExpiry <= 0) {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
    
    switch (status) {
      case 'APPROVED':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'PENDING':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'REJECTED':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Container>
        <div>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <Heading
              title="Your Dashboard"
              subtitle={`Welcome back, ${currentUser.name}! Manage your listings here.`}
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Total Listings</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stats.totalListings}</p>
                </div>
                <div className="text-lg sm:text-xl md:text-2xl">📋</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Approved</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">{stats.approvedListings}</p>
                </div>
                <div className="text-lg sm:text-xl md:text-2xl">✅</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Pending</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600">{stats.pendingListings}</p>
                </div>
                <div className="text-lg sm:text-xl md:text-2xl">⏳</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Total Views</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">{stats.totalViews}</p>
                </div>
                <div className="text-lg sm:text-xl md:text-2xl">👁️</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-6 sm:mb-8">
            <button
              onClick={() => router.push('/post')}
              className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
            >
              + Post New Listing
            </button>
          </div>

          {/* Listings */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Your Listings</h3>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
              </span>
            </div>

            {listings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No listings yet</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Start by posting your first listing!</p>
                <button
                  onClick={() => router.push('/post')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Post Your First Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
                {listings.map((listing) => (
                  <div key={listing.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                    {/* Mobile: Card layout, Desktop: Row layout */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4">
                      {/* Image */}
                      <div className="w-full lg:w-48 h-24 sm:h-32 lg:h-32 rounded-lg overflow-hidden flex-shrink-0">
                        {listing.images && listing.images.length > 0 ? (
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400 dark:text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 sm:gap-4 flex-1">
                          <div className="flex-1 flex flex-col min-h-0">
                            {/* Title */}
                            <div className="mb-2">
                              <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">{listing.title}</h4>
                            </div>
                            
                            {/* Location and Price in one row on mobile */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                <span>📍</span>
                                <span className="truncate">{listing.city}, {listing.district}</span>
                              </span>
                              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                <span>💰</span>
                                <span className="font-medium">{formatPrice(listing.price)} {listing.priceUnit}</span>
                              </span>
                            </div>
                            
                            {/* Date */}
                            <div className="mb-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">📅 {new Date(listing.createdAt).toLocaleDateString()}</span>
                            </div>

                            {/* Status Badge */}
                            <div className="mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={getStatusBadge(listing.status, listing)}>
                                  {(() => {
                                    const now = new Date();
                                    let daysUntilExpiry = 0;
                                    
                                    if (listing.expiresAt) {
                                      const expiresAt = new Date(listing.expiresAt);
                                      daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                                    } else {
                                      const createdAt = new Date(listing.createdAt);
                                      const thirtyDaysFromCreation = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);
                                      daysUntilExpiry = Math.ceil((thirtyDaysFromCreation.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                                    }
                                    
                                    if (daysUntilExpiry <= 0) {
                                      return 'EXPIRED';
                                    }
                                    return listing.status;
                                  })()}
                                </span>
                                {listing.isFeatured && (
                                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                                    ⭐ Featured
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Days Remaining Countdown */}
                            <div className="mb-3">
                              {(() => {
                                if (!listing.expiresAt) {
                                  const createdAt = new Date(listing.createdAt);
                                  const thirtyDaysFromCreation = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);
                                  const now = new Date();
                                  const daysUntilExpiry = Math.ceil((thirtyDaysFromCreation.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                                  
                                  if (daysUntilExpiry <= 0) {
                                    return (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        ⏰ EXPIRED
                                      </span>
                                    );
                                  } else if (daysUntilExpiry <= 5) {
                                    return (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                        ⏰ {daysUntilExpiry} days left
                                      </span>
                                    );
                                  } else if (daysUntilExpiry <= 10) {
                                    return (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        ⏰ {daysUntilExpiry} days left
                                      </span>
                                    );
                                  } else {
                                    return (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        ⏰ {daysUntilExpiry} days left
                                      </span>
                                    );
                                  }
                                }
                                
                                const now = new Date();
                                const expiresAt = new Date(listing.expiresAt);
                                const daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                                
                                if (daysUntilExpiry <= 0) {
                                  return (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      ⏰ EXPIRED
                                    </span>
                                  );
                                } else if (daysUntilExpiry <= 5) {
                                  return (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                      ⏰ {daysUntilExpiry} days left
                                    </span>
                                  );
                                } else if (daysUntilExpiry <= 10) {
                                  return (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                      ⏰ {daysUntilExpiry} days left
                                    </span>
                                  );
                                } else {
                                  return (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      ⏰ {daysUntilExpiry} days left
                                    </span>
                                  );
                                }
                              })()}
                            </div>
                          </div>

                          {/* Actions - Fixed positioning */}
                          <div className="flex flex-row sm:flex-col lg:flex-col gap-1 sm:gap-2 flex-shrink-0">
                            <div className="flex flex-row sm:flex-col gap-1 sm:gap-2">
                              <button
                                onClick={() => router.push(`/listings/${listing.id}`)}
                                className="px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs text-gray-700 dark:text-gray-300"
                              >
                                View
                              </button>
                              <button
                                onClick={() => router.push(`/listings/${listing.id}/edit`)}
                                className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
                              >
                                Edit
                              </button>
                              {(() => {
                                if (!listing.expiresAt) return null;
                                const now = new Date();
                                const expiresAt = new Date(listing.expiresAt);
                                const daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                                if (daysUntilExpiry > 0) {
                                  return (
                                    <button
                                      onClick={() => handleRenewListing(listing.id)}
                                      className="px-2 py-1 sm:px-3 sm:py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs"
                                    >
                                      Renew
                                    </button>
                                  );
                                }
                                return null;
                              })()}
                              <button
                                onClick={() => handleDeleteListing(listing.id)}
                                className="px-2 py-1 sm:px-3 sm:py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </Container>
    </div>
  );
};

export default DashboardClient;

