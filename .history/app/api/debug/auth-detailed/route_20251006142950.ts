import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get all environment variables
    const allEnvVars = Object.keys(process.env)
      .filter(key => key.includes('NEXT') || key.includes('GOOGLE') || key.includes('GITHUB') || key.includes('DATABASE'))
      .reduce((obj, key) => {
        obj[key] = process.env[key] ? 'Set' : 'Missing';
        return obj;
      }, {} as Record<string, string>);

    // Check specific auth-related variables
    const authDebug = {
      NEXTAUTH_URL: {
        value: process.env.NEXTAUTH_URL,
        status: process.env.NEXTAUTH_URL ? 'Set' : 'Missing'
      },
      NEXTAUTH_SECRET: {
        value: process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing',
        status: process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing'
      },
      GOOGLE_CLIENT_ID: {
        value: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Missing',
        status: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Missing'
      },
      GOOGLE_CLIENT_SECRET: {
        value: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Missing',
        status: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Missing'
      },
      GITHUB_ID: {
        value: process.env.GITHUB_ID ? 'Set' : 'Missing',
        status: process.env.GITHUB_ID ? 'Set' : 'Missing'
      },
      GITHUB_SECRET: {
        value: process.env.GITHUB_SECRET ? 'Set' : 'Missing',
        status: process.env.GITHUB_SECRET ? 'Set' : 'Missing'
      },
      DATABASE_URL: {
        value: process.env.DATABASE_URL ? 'Set' : 'Missing',
        status: process.env.DATABASE_URL ? 'Set' : 'Missing'
      }
    };

    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      currentUrl: process.env.NEXTAUTH_URL || 'Not set',
      timestamp: new Date().toISOString(),
      authDebug,
      allEnvVars,
      // Check if we can import authOptions
      authOptionsImport: 'Will test in next request'
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
