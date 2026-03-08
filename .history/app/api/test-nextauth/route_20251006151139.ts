import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test if we can import authOptions
    const { authOptions } = await import('@/lib/auth');
    
    // Test if providers are configured
    const googleProvider = authOptions.providers.find(p => p.id === 'google');
    const credentialsProvider = authOptions.providers.find(p => p.id === 'credentials');
    
    return NextResponse.json({
      success: true,
      message: 'NextAuth configuration loaded successfully',
      providers: {
        google: {
          found: !!googleProvider,
          id: googleProvider?.id,
          name: googleProvider?.name,
          type: googleProvider?.type,
        },
        credentials: {
          found: !!credentialsProvider,
          id: credentialsProvider?.id,
          name: credentialsProvider?.name,
          type: credentialsProvider?.type,
        }
      },
      totalProviders: authOptions.providers.length,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
