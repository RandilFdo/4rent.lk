const { PrismaClient } = require("@prisma/client");

async function testConnection() {
  const prisma = new PrismaClient();
  try {
    console.log("Connecting to MongoDB...");
    await prisma.$connect();
    console.log("✅ Successfully connected to MongoDB");
    const userCount = await prisma.user.count();
    console.log(`User count: ${userCount}`);
  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
