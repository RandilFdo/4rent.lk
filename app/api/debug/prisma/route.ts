import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    console.log('🔍 Prisma Debug: Starting client test');
    
    // Test Prisma client initialization
    const clientInfo = {
      isConnected: false,
      canQuery: false,
      schemaLoaded: false
    };

    // Test connection
    try {
      await prisma.$connect();
      clientInfo.isConnected = true;
      console.log('✅ Prisma: Connected successfully');
    } catch (connError) {
      console.error('❌ Prisma: Connection failed:', connError);
    }

    // Test basic query
    try {
      const result = await prisma.$queryRaw`SELECT 1 as test`;
      clientInfo.canQuery = true;
      console.log('✅ Prisma: Query successful:', result);
    } catch (queryError) {
      console.error('❌ Prisma: Query failed:', queryError);
    }

    // Test schema access
    try {
      await prisma.user.findFirst();
      clientInfo.schemaLoaded = true;
      console.log('✅ Prisma: Schema loaded successfully');
    } catch (schemaError) {
      console.error('❌ Prisma: Schema access failed:', schemaError);
    }

    const prismaCheck = {
      success: clientInfo.isConnected && clientInfo.canQuery && clientInfo.schemaLoaded,
      ...clientInfo,
      timestamp: new Date().toISOString()
    };

    console.log('🔍 Prisma Debug Result:', prismaCheck);
    return NextResponse.json(prismaCheck);
  } catch (error: any) {
    console.error('❌ Prisma Debug Error:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        message: error.message,
        name: error.constructor.name,
        stack: error.stack
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
