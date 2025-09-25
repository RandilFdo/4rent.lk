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

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    
    const {
      title,
      description,
      images,
      mainCategory,
      subCategory,
      district,
      city,
      address,
      price,
      priceUnit,
      isNegotiable,
      contactPhone,
      whatsappNumber,
      vehicleAttributes,
      propertyAttributes
    } = body;

    // Validate required fields
    if (!title || !description || !images || images.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        images,
        mainCategory,
        subCategory,
        district,
        city,
        address,
        price: parseInt(price),
        priceUnit,
        isNegotiable: isNegotiable || false,
        contactPhone,
        whatsappNumber,
        vehicleAttributes,
        propertyAttributes,
        userId: currentUser.id,
        status: 'APPROVED' // Changed to APPROVED so posts show up immediately on homepage
      }
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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

    let query: any = {};

    // If userId is provided, get all listings for that user (including pending/rejected)
    // Otherwise, only show approved listings
    if (userId) {
      query.userId = userId;
    } else {
      query.status = 'APPROVED';
    }

    if (mainCategory) query.mainCategory = mainCategory;
    if (subCategory) query.subCategory = subCategory;
    if (district) query.district = district;
    if (city) query.city = city;
    if (minPrice) query.price = { ...query.price, gte: parseInt(minPrice) };
    if (maxPrice) query.price = { ...query.price, lte: parseInt(maxPrice) };

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: [
        { isFeatured: 'desc' },
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

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}