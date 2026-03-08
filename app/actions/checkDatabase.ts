import prisma from "@/app/libs/prismadb";

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // Simple connection test for MongoDB
    await prisma.$connect();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

export default checkDatabaseConnection;
