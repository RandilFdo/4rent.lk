import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Temporarily disabled due to Prisma build issues
    // TODO: Re-enable after fixing Prisma client generation
    return NextResponse.json([]);

  } catch (error: any) {
    console.error('Error fetching all listings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
