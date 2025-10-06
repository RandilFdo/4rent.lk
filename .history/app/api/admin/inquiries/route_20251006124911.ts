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
    const errorDetails = {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'UnknownError'
    };
    
    console.error('❌ Admin inquiries: Error details:', errorDetails);
    return NextResponse.json({ 
      error: 'Internal server error',
      debug: {
        message: errorDetails.message,
        type: errorDetails.name
      }
    }, { status: 500 });
  }
}
