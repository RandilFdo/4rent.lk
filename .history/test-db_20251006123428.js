const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`✅ Found ${userCount} users in database`);
    
    const listingCount = await prisma.listing.count();
    console.log(`✅ Found ${listingCount} listings in database`);
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error.message);
    
    if (error.message.includes('Server selection timeout')) {
      console.log('\n🔧 Fix suggestions:');
      console.log('1. Check your MongoDB Atlas cluster is running');
      console.log('2. Verify your connection string in .env file');
      console.log('3. Check your IP whitelist in MongoDB Atlas');
      console.log('4. Try updating your connection string with timeout options');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();














