# 🏠 4Rent.lk - Sri Lankan Property & Vehicle Rental Platform

A comprehensive rental platform built with Next.js 13, featuring property and vehicle listings with admin approval system.

![4Rent.lk Screenshot](https://github.com/RandilFdo/4rent.lk/assets/screenshot.png)

## 🌟 Features

### 🏠 Property Rentals
- **House4Rent** - Houses, Villas with land size, property size, bedrooms, bathrooms
- **Apartment4Rent** - Apartments, Flats with furnished status, apartment complex
- **Commercial Property4Rent** - Offices, Shops, Warehouses, Restaurants
- **Room & Annex4Rent** - Rooms, Annexes with private entrance, floor selection
- **Holiday4Rent** - Holiday rentals with property type selection
- **Land4Rent** - Agricultural, Commercial, Residential land

### 🚗 Vehicle Rentals
- **Car4Rent** - Cars, SUVs, Vans
- **Bike4Rent** - Motorcycles, Scooters
- **Three Wheeler4Rent** - Tuk-tuks, Three wheelers
- **Bus4Rent** - Buses, Coaches
- **Truck4Rent** - Trucks, Lorries
- **Luxury Vehicle4Rent** - Premium cars, Luxury SUVs

### 🔧 Core Features
- **Admin Dashboard** - Approve/reject listings with detailed review system
- **User Dashboard** - Manage your listings with status tracking
- **Advanced Search** - Filter by location, price, category, and more
- **Image Upload** - Multiple image support with preview
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Real-time Updates** - Live status updates and notifications
- **Location Integration** - Sri Lankan districts and cities
- **Price Negotiation** - Optional negotiable pricing
- **Contact System** - Direct phone and WhatsApp integration

## 🚀 Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MongoDB (with Supabase migration support)
- **Authentication**: NextAuth.js
- **Image Upload**: Cloudinary integration
- **UI Components**: Custom components with Tailwind CSS
- **Icons**: React Icons, Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- MongoDB or Supabase account

### Clone the repository
```bash
git clone https://github.com/RandilFdo/4rent.lk.git
cd 4rent.lk
```

### Install dependencies
```bash
npm install
```

### Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your_mongodb_connection_string"
# or for Supabase:
# DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

### Database Setup

#### Option 1: MongoDB
```bash
npx prisma db push
```

#### Option 2: Supabase (Recommended)
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Update your `prisma/schema.prisma` to use PostgreSQL:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
3. Run the migration:
```bash
npx prisma generate
npx prisma db push
```

### Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎯 Usage

### For Users
1. **Register/Login** - Create an account or sign in
2. **Browse Listings** - Search and filter available properties/vehicles
3. **Create Listing** - Post your property or vehicle for rent
4. **Manage Listings** - View status and edit your listings in dashboard

### For Admins
1. **Admin Login** - Access admin dashboard at `/admin/login`
2. **Review Listings** - Approve or reject pending listings
3. **Manage Content** - Monitor all listings and user activity

## 📁 Project Structure

```
4rent.lk/
├── app/
│   ├── admin/                 # Admin dashboard
│   ├── api/                   # API routes
│   ├── components/            # Reusable components
│   │   ├── forms/            # Form components
│   │   ├── inputs/           # Input components
│   │   ├── listings/         # Listing components
│   │   └── navbar/           # Navigation components
│   ├── dashboard/            # User dashboard
│   ├── listings/             # Listing pages
│   ├── post/                 # Listing creation pages
│   │   ├── building/         # Property forms
│   │   └── vehicle/          # Vehicle forms
│   └── globals.css           # Global styles
├── prisma/
│   └── schema.prisma         # Database schema
├── public/
│   └── images/               # Static images
└── 4rent-mobile/             # Mobile app (React Native)
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma Studio |
| `npx prisma db push` | Push schema to database |

## 🌍 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Compatible with static export
- **Railway**: Full-stack deployment
- **DigitalOcean**: VPS deployment

## 🔐 Admin Access

To access the admin dashboard:
1. Register with an email containing "admin" (e.g., `admin@4rent.lk`)
2. Go to `/admin/login`
3. Sign in with your admin credentials
4. Access the admin dashboard at `/admin`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database management with [Prisma](https://prisma.io/)
- Authentication with [NextAuth.js](https://next-auth.js.org/)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)

## 📞 Support

For support, email support@4rent.lk or create an issue in the repository.

---

**Made with ❤️ for Sri Lanka** 🇱🇰"# 4rent.lk" 
"# 4rent.lk" 
"# 4rent.lk" 
