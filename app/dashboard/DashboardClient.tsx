"use client";

import { useState, useEffect } from "react";
import { SafeUser, SafeListing } from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
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
      <Container>
        <div className="pt-24">
          <div className="text-center">Loading your dashboard...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Heading
              title="Your Dashboard"
              subtitle={`Welcome back, ${currentUser.name}! Manage your listings here.`}
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Listings</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalListings}</p>
                </div>
                <div className="text-2xl">📋</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approvedListings}</p>
                </div>
                <div className="text-2xl">✅</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pendingListings}</p>
                </div>
                <div className="text-2xl">⏳</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalViews}</p>
                </div>
                <div className="text-2xl">👁️</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/post')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Post New Listing
            </button>
          </div>

          {/* Listings */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Your Listings</h3>
              <span className="text-sm text-gray-600">
                {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
              </span>
            </div>

            {listings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h4>
                <p className="text-gray-600 mb-6">Start by posting your first listing!</p>
                <button
                  onClick={() => router.push('/post')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Post Your First Listing
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {listings.map((listing) => (
                  <div key={listing.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Image */}
                      <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden">
                        {listing.images && listing.images.length > 0 ? (
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{listing.title}</h4>
                            <p className="text-gray-600 mb-3 line-clamp-2">{listing.description}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                              <span>📍 {listing.city}, {listing.district}</span>
                              <span>💰 {formatPrice(listing.price)} {listing.priceUnit}</span>
                              <span>📅 {new Date(listing.createdAt).toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className={getStatusBadge(listing.status)}>
                                {listing.status}
                              </span>
                              {listing.isFeatured && (
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                  ⭐ Featured
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      listing.status === 'APPROVED' 
                        ? 'bg-green-100 text-green-800' 
                        : listing.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {listing.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/listings/${listing.id}`)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => router.push(`/listings/${listing.id}/edit`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteListing(listing.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
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
  );
};

export default DashboardClient;

