import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const authCheck = {
      success: true,
      environment: process.env.NODE_ENV,
      variables: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL ? '✅ Set' : '❌ Missing',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing',
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing',
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing',
        DATABASE_URL: process.env.DATABASE_URL ? '✅ Set' : '❌ Missing',
        GITHUB_ID: process.env.GITHUB_ID ? '✅ Set' : '❌ Missing',
        GITHUB_SECRET: process.env.GITHUB_SECRET ? '✅ Set' : '❌ Missing',
      },
      timestamp: new Date().toISOString(),
      // Test if we can access the auth options
      authOptionsAvailable: true,
    };

    return NextResponse.json(authCheck);
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
