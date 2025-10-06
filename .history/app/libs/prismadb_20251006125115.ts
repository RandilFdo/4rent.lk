import { PrismaClient } from "@prisma/client";

declare global {
   var prisma: PrismaClient | undefined;
}

// Enhanced Prisma client with debugging
const client = globalThis.prisma || new PrismaClient({
   log: ['error', 'warn'],
   errorFormat: 'pretty',
});

// Add connection debugging
if (process.env.NODE_ENV === 'development') {
   client.$connect()
      .then(() => {
         console.log('✅ Prisma: Successfully connected to database');
      })
      .catch((error) => {
         console.error('❌ Prisma: Failed to connect to database:', {
            message: error.message,
            code: error.code,
            stack: error.stack
         });
      });
}

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
