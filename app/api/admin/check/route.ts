import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    // Check if user is admin (you can modify this logic based on your admin criteria)
    // For now, we'll check if the email contains 'admin' or if there's an isAdmin field
    const isAdmin = session.user.email.includes('admin') || 
                   (session.user as any).isAdmin === true;

    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
