import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    // Get providers from actual authOptions
    const providers = authOptions.providers.map(provider => ({
      id: provider.id,
      name: provider.name,
      type: provider.type,
      available: true, // If it's in the config, it should be available
    }));

    return NextResponse.json({
      success: true,
      providers: {
        google: providers.find(p => p.id === 'google'),
        credentials: providers.find(p => p.id === 'credentials'),
      },
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
