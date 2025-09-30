import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET(request: NextRequest) {
  try {
    // Get all inquiries ordered by creation date (newest first)
    const inquiries = await prisma.inquiry.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(inquiries);

  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
