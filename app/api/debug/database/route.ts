import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    console.log('🔍 Database Debug: Starting connection test');
    
    // Test basic connection
    await prisma.$connect();
    
    // Test a simple query
    const userCount = await prisma.user.count();
    
    const dbCheck = {
      success: true,
      connection: "✅ Connected",
      userCount,
      databaseUrl: process.env.DATABASE_URL ? "✅ Set" : "❌ Missing",
      timestamp: new Date().toISOString()
    };

    console.log('✅ Database Debug: Success:', dbCheck);
    return NextResponse.json(dbCheck);
  } catch (error: any) {
    console.error('❌ Database Debug Error:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    return NextResponse.json({
      success: false,
      error: {
        message: error.message,
        code: error.code,
        name: error.constructor.name
      },
      databaseUrl: process.env.DATABASE_URL ? "✅ Set" : "❌ Missing",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
