import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/app/libs/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!currentUser) {
      // If user doesn't exist, create a demo user
      currentUser = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || 'Demo User',
          hashedPassword: 'demo-password',
          isAdmin: false
        }
      });
    }

    const body = await request.json();
    
    // Debug logging
    console.log('📝 Received listing data:', {
      title: body.title,
      location: body.location,
      district: body.district,
      city: body.city,
      mainCategory: body.mainCategory
    });
    
    const {
      title,
      description,
      images,
      mainCategory,
      subCategory,
      location,
      district,
      city,
      address,
      price,
      priceUnit,
      isNegotiable,
      contactPhone,
      whatsappNumber,
      vehicleAttributes,
      propertyAttributes,
      experienceAttributes
    } = body;

    // Validate required fields
    if (!title || !description || !images || images.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate location data
    const finalDistrict = location?.district || district || '';
    const finalCity = location?.city || city || '';
    
    if (!finalDistrict || !finalCity) {
      return NextResponse.json({ error: 'Location (district and city) is required' }, { status: 400 });
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        images,
        mainCategory,
        subCategory,
        district: finalDistrict,
        city: finalCity,
        address,
        price: parseInt(price),
        priceUnit,
        isNegotiable: isNegotiable || false,
        contactPhone,
        whatsappNumber,
        vehicleAttributes,
        propertyAttributes,
        experienceAttributes,
        userId: currentUser.id,
        status: 'PENDING' // Changed back to PENDING so admin can review
      }
    });

    console.log('✅ Listing created successfully:', listing.id);
    return NextResponse.json(listing);
  } catch (error) {
    console.error('❌ Error creating listing:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const mainCategory = searchParams.get('mainCategory');
    const subCategory = searchParams.get('subCategory');
    const district = searchParams.get('district');
    const city = searchParams.get('city');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const expiringSoon = searchParams.get('expiringSoon'); // New parameter

    let query: any = {};

    // If userId is provided, get all listings for that user (including pending/rejected)
    // Otherwise, only show approved listings
    if (userId) {
      query.userId = userId;
    } else {
      query.status = 'APPROVED';
      // Note: expiresAt field is not available in current schema
    }

    // Note: expiringSoon functionality disabled until expiresAt field is added to schema
    // if (expiringSoon === 'true') {
    //   const now = new Date();
    //   const fiveDaysFromNow = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    //   query.expiresAt = { gte: now, lte: fiveDaysFromNow };
    // }

    if (mainCategory) query.mainCategory = mainCategory;
    if (subCategory) query.subCategory = subCategory;
    if (district) query.district = district;
    if (city) query.city = city;
    if (minPrice) query.price = { ...query.price, gte: parseInt(minPrice) };
    if (maxPrice) query.price = { ...query.price, lte: parseInt(maxPrice) };

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: [
        { createdAt: 'desc' }
      ],
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    });

    const response = NextResponse.json(listings);
    
    // Add aggressive caching headers for better performance
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600, max-age=60');
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=300');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=300');
    
    return response;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}