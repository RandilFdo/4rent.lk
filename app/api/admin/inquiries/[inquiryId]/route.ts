import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function PUT(
  request: NextRequest,
  { params }: { params: { inquiryId: string } }
) {
  try {
    const { inquiryId } = params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { 
        status,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ success: true, inquiry });

  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
