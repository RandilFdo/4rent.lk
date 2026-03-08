import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Admin inquiries: Starting request');
    
    // Get all inquiries ordered by creation date (newest first)
    const inquiries = await prisma.inquiry.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('✅ Admin inquiries: Successfully fetched', inquiries.length, 'inquiries');
    return NextResponse.json(inquiries);

  } catch (error) {
    console.error('❌ Admin inquiries: Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ 
      error: 'Internal server error',
      debug: {
        message: error.message,
        type: error.constructor.name
      }
    }, { status: 500 });
  }
}
