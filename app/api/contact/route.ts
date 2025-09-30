import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, category } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create inquiry in database
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        subject,
        message,
        category: category || 'general',
        status: 'new'
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry submitted successfully',
      id: inquiry.id 
    });

  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
