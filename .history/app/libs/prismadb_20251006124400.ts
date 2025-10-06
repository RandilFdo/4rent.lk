import { PrismaClient } from "@prisma/client";

declare global {
   var prisma: PrismaClient | undefined;
}

// Enhanced Prisma client with comprehensive debugging
const client = globalThis.prisma || new PrismaClient({
   log: [
      {
         emit: 'event',
         level: 'query',
      },
      {
         emit: 'event',
         level: 'error',
      },
      {
         emit: 'event',
         level: 'info',
      },
      {
         emit: 'event',
         level: 'warn',
      },
   ],
   errorFormat: 'pretty',
});

// Add event listeners for debugging
client.$on('query', (e) => {
   console.log('🔍 Prisma Query:', {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`,
      timestamp: new Date().toISOString()
   });
});

client.$on('error', (e) => {
   console.error('❌ Prisma Error:', {
      message: e.message,
      target: e.target,
      timestamp: new Date().toISOString()
   });
});

client.$on('info', (e) => {
   console.info('ℹ️ Prisma Info:', {
      message: e.message,
      target: e.target,
      timestamp: new Date().toISOString()
   });
});

client.$on('warn', (e) => {
   console.warn('⚠️ Prisma Warning:', {
      message: e.message,
      target: e.target,
      timestamp: new Date().toISOString()
   });
});

// Add connection debugging
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

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
