import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const providers = {
      google: {
        id: 'google',
        name: 'Google',
        type: 'oauth',
        available: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
      },
      github: {
        id: 'github', 
        name: 'GitHub',
        type: 'oauth',
        available: !!(process.env.GITHUB_ID && process.env.GITHUB_SECRET),
      },
      credentials: {
        id: 'credentials',
        name: 'Credentials',
        type: 'credentials',
        available: true,
      },
    };

    return NextResponse.json({
      success: true,
      providers,
      environment: process.env.NODE_ENV,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
