import { NextResponse } from "next/server";

export async function GET() {
  try {
    // For now, we'll allow access to admin dashboard
    // In production, you should implement proper authentication
    return NextResponse.json({ isAdmin: true });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
