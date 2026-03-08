// SWR fetcher function
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

// API endpoints
export const API_ENDPOINTS = {
  LISTINGS: '/api/listings',
  VEHICLES: '/api/listings?mainCategory=vehicles',
  PROPERTIES: '/api/listings?mainCategory=properties', 
  EXPERIENCES: '/api/listings?mainCategory=experiences',
  FAVORITES: '/api/favorites',
  USER_LISTINGS: (userId: string) => `/api/listings?userId=${userId}`,
} as const;
