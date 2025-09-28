import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminLoggedIn = searchParams.get('adminLoggedIn');
    const adminLoginTime = searchParams.get('adminLoginTime');

    // Check if admin is logged in via localStorage (passed as query params)
    if (adminLoggedIn === 'true' && adminLoginTime) {
      const loginTime = parseInt(adminLoginTime);
      const currentTime = Date.now();
      const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

      // Check if session is still valid (within 24 hours)
      if (currentTime - loginTime < sessionDuration) {
        return NextResponse.json({ isAdmin: true });
      }
    }

    return NextResponse.json({ isAdmin: false }, { status: 401 });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
