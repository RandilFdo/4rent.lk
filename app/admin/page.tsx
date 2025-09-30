"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import LoadingSpinner from "../components/LoadingSpinner";

interface AdminStats {
  totalListings: number;
  pendingListings: number;
  approvedListings: number;
  rejectedListings: number;
  totalViews: number;
}

interface Listing {
  id: string;
  title: string;
  mainCategory: string;
  subCategory: string;
  district: string;
  city: string;
  price: number;
  priceUnit: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  user: {
    name: string;
    email: string;
  };
  images: string[];
  description: string;
  vehicleAttributes?: any;
  propertyAttributes?: any;
  experienceAttributes?: any;
}


const AdminDashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats>({
    totalListings: 0,
    pendingListings: 0,
    approvedListings: 0,
    rejectedListings: 0,
    totalViews: 0
  });
  const [pendingListings, setPendingListings] = useState<Listing[]>([]);
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    fetchStats();
    fetchPendingListings();
    fetchAllListings();
  }, []);

  const checkAdminStatus = async () => {
    try {
      // Check localStorage for admin login
      const adminLoggedIn = localStorage.getItem("adminLoggedIn");
      const adminLoginTime = localStorage.getItem("adminLoginTime");

      if (adminLoggedIn === 'true' && adminLoginTime) {
        const loginTime = parseInt(adminLoginTime);
        const currentTime = Date.now();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

        // Check if session is still valid
        if (currentTime - loginTime < sessionDuration) {
          setIsAdmin(true);
          return;
        } else {
          // Session expired, clear localStorage
          localStorage.removeItem("adminLoggedIn");
          localStorage.removeItem("adminLoginTime");
        }
      }

      // Not logged in or session expired, redirect to login
      router.push('/admin/login');
    } catch (error) {
      console.error('Error checking admin status:', error);
      router.push('/admin/login');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchPendingListings = async () => {
    try {
      const response = await fetch('/api/admin/pending');
      if (response.ok) {
        const data = await response.json();
        setPendingListings(data);
      }
    } catch (error) {
      console.error('Error fetching pending listings:', error);
    }
  };

  const fetchAllListings = async () => {
    try {
      const response = await fetch('/api/admin/all-listings');
      if (response.ok) {
        const data = await response.json();
        setAllListings(data);
      }
    } catch (error) {
      console.error('Error fetching all listings:', error);
    }
  };


  const handleApprove = async (listingId: string) => {
    try {
      const response = await fetch(`/api/admin/approve/${listingId}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setPendingListings(prev => prev.filter(listing => listing.id !== listingId));
        fetchStats();
        alert('Listing approved successfully!');
      } else {
        alert('Failed to approve listing');
      }
    } catch (error) {
      console.error('Error approving listing:', error);
      alert('Failed to approve listing');
    }
  };

  const handleReject = async (listingId: string, reason: string) => {
    try {
      const response = await fetch(`/api/admin/reject/${listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });
      
      if (response.ok) {
        setPendingListings(prev => prev.filter(listing => listing.id !== listingId));
        fetchStats();
        alert('Listing rejected successfully!');
      } else {
        alert('Failed to reject listing');
      }
    } catch (error) {
      console.error('Error rejecting listing:', error);
      alert('Failed to reject listing');
    }
  };

  const handlePreview = (listing: Listing) => {
    setSelectedListing(listing);
    setShowPreview(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminLoginTime");
    
    // Clear cookies
    document.cookie = "adminLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "adminLoginTime=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    router.push('/admin/login');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'EXPIRED':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };


  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-300">You don't have admin privileges.</p>
          <button
            onClick={() => router.push('/admin/login')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading admin dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <Heading
                title="Admin Dashboard"
                subtitle="Manage property listings and approvals"
              />
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Listings</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalListings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.pendingListings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Approved</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.approvedListings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="ml-4">
                </div>
              </div>
            </div>

          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8 px-6">
                {[
                  { id: 'pending', name: 'Pending Listings', count: pendingListings.length },
                  { id: 'history', name: 'All Listings', count: allListings.length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.name} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Pending Listings Tab */}
              {activeTab === 'pending' && (
                <div>
                  {pendingListings.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      No pending listings to review.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingListings.map((listing) => (
                        <div key={listing.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              {listing.images && listing.images.length > 0 ? (
                                <img
                                  className="h-20 w-20 rounded-lg object-cover"
                                  src={listing.images[0]}
                                  alt={listing.title}
                                />
                              ) : (
                                <div className="h-20 w-20 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                  <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                                    {listing.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {listing.mainCategory} - {listing.subCategory}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {listing.district}, {listing.city}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    LKR {listing.price.toLocaleString()} {listing.priceUnit}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-500">
                                    Posted by {listing.user.name} on {new Date(listing.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handlePreview(listing)}
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                  >
                                    Preview
                                  </button>
                                  <button
                                    onClick={() => handleApprove(listing.id)}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => {
                                      const reason = prompt('Reason for rejection:');
                                      if (reason) {
                                        handleReject(listing.id, reason);
                                      }
                                    }}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* All Listings History Tab */}
              {activeTab === 'history' && (
                <div>
                  <div className="mb-4 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">All Listings History</h3>
                    <div className="flex space-x-2">
                      <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm">
                        <option value="">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="EXPIRED">Expired</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {allListings.map((listing) => (
                      <div key={listing.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {listing.images && listing.images.length > 0 ? (
                              <img
                                className="h-16 w-16 rounded-lg object-cover"
                                src={listing.images[0]}
                                alt={listing.title}
                              />
                            ) : (
                              <div className="h-16 w-16 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                                    {listing.title}
                                  </h4>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {listing.mainCategory} - {listing.subCategory}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {listing.district}, {listing.city} • LKR {listing.price.toLocaleString()} {listing.priceUnit}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-500">
                                  Posted by {listing.user.name} on {new Date(listing.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(listing.status)}`}>
                                  {listing.status}
                                </span>
                                <button
                                  onClick={() => handlePreview(listing)}
                                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                  Preview
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </Container>

      {/* Preview Modal */}
      {showPreview && selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Listing Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Preview Content - Similar to ListingCard */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* Images */}
                <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                  {selectedListing.images && selectedListing.images.length > 0 ? (
                    <img
                      src={selectedListing.images[0]}
                      alt={selectedListing.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {selectedListing.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {selectedListing.mainCategory} - {selectedListing.subCategory}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        📍 {selectedListing.district}, {selectedListing.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        LKR {selectedListing.price.toLocaleString()}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {selectedListing.priceUnit}
                      </p>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {selectedListing.description}
                    </p>
                  </div>
                  
                  {/* Attributes */}
                  {(selectedListing.vehicleAttributes || selectedListing.propertyAttributes || selectedListing.experienceAttributes) && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {selectedListing.vehicleAttributes && Object.entries(selectedListing.vehicleAttributes).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="text-gray-900 dark:text-white font-medium">{String(value)}</span>
                          </div>
                        ))}
                        {selectedListing.propertyAttributes && Object.entries(selectedListing.propertyAttributes).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="text-gray-900 dark:text-white font-medium">{String(value)}</span>
                          </div>
                        ))}
                        {selectedListing.experienceAttributes && Object.entries(selectedListing.experienceAttributes).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="text-gray-900 dark:text-white font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Contact Info */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Contact Information</h4>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600 dark:text-gray-300">👤</span>
                        <span className="text-gray-900 dark:text-white">{selectedListing.user.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600 dark:text-gray-300">📧</span>
                        <span className="text-gray-900 dark:text-white">{selectedListing.user.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedListing.status)}`}>
                      Status: {selectedListing.status}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Posted: {new Date(selectedListing.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;


