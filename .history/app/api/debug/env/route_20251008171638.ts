import { NextResponse } from "next/server";

export async function GET() {
  try {
    const envCheck = {
      success: true,
      environment: process.env.NODE_ENV,
      variables: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL ? "✅ Set" : "❌ Missing",
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✅ Set" : "❌ Missing",
        DATABASE_URL: process.env.DATABASE_URL ? "✅ Set" : "❌ Missing",
      },
      timestamp: new Date().toISOString()
    };

    console.log('🔍 Environment Debug:', envCheck);
    return NextResponse.json(envCheck);
  } catch (error: any) {
    console.error('❌ Environment Debug Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
