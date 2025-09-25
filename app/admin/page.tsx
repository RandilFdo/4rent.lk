"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";

interface AdminStats {
  totalListings: number;
  pendingListings: number;
  approvedListings: number;
  rejectedListings: number;
  featuredListings: number;
  totalViews: number;
}

interface PendingListing {
  id: string;
  title: string;
  mainCategory: string;
  subCategory: string;
  district: string;
  city: string;
  price: number;
  priceUnit: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  images: string[];
  status: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats>({
    totalListings: 0,
    pendingListings: 0,
    approvedListings: 0,
    rejectedListings: 0,
    featuredListings: 0,
    totalViews: 0
  });
  const [pendingListings, setPendingListings] = useState<PendingListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    fetchStats();
    fetchPendingListings();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/admin/check');
      if (response.ok) {
        setIsAdmin(true);
      } else {
        router.push('/');
      }
    } catch (error) {
      router.push('/');
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
    } finally {
      setLoading(false);
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-gray-600">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="py-8">
          <Heading
            title="Admin Dashboard"
            subtitle="Manage property listings and approvals"
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Listings</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalListings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.pendingListings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.approvedListings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.rejectedListings}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Listings */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Pending Listings ({pendingListings.length})</h3>
            </div>
            
            {pendingListings.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No pending listings to review.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {pendingListings.map((listing) => (
                  <div key={listing.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        {listing.images.length > 0 ? (
                          <img
                            className="h-20 w-20 rounded-lg object-cover"
                            src={listing.images[0]}
                            alt={listing.title}
                          />
                        ) : (
                          <div className="h-20 w-20 rounded-lg bg-gray-200 flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-gray-900 truncate">
                            {listing.title}
                          </h4>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </div>
                        
                        <div className="mt-2 text-sm text-gray-600">
                          <p><span className="font-medium">Category:</span> {listing.subCategory}</p>
                          <p><span className="font-medium">Location:</span> {listing.city}, {listing.district}</p>
                          <p><span className="font-medium">Price:</span> LKR {listing.price.toLocaleString()} / {listing.priceUnit}</p>
                          <p><span className="font-medium">Posted by:</span> {listing.user.name} ({listing.user.email})</p>
                          <p><span className="font-medium">Posted on:</span> {new Date(listing.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex-shrink-0 flex space-x-2">
                        <button
                          onClick={() => handleApprove(listing.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;
