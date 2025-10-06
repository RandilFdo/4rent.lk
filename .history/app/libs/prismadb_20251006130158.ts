import { PrismaClient } from "@prisma/client";

declare global {
   var prisma: PrismaClient | undefined;
}

// Prisma client configuration
const client = globalThis.prisma || new PrismaClient({
   log: ['error', 'warn'],
   errorFormat: 'minimal',
});

// Ensure connection in all environments
client.$connect()
   .then(() => {
      console.log('✅ Prisma: Successfully connected to database');
   })
   .catch((error) => {
      console.error('❌ Prisma: Failed to connect to database:', {
         message: error.message,
         code: error.code
      });
   });

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
