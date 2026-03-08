import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
   return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
   try {
      const session = await getSession();

      if (!session?.user?.email) {
         return null;
      }

      try {
         const currentUser = await prisma.user.findUnique({
            where: {
               email: session.user.email as string,
            },
         });

         if (!currentUser) {
            // DB is online but user not found - return session data (e.g., for Google OAuth new users)
            return {
               id: session.user.email,
               email: session.user.email,
               name: session.user.name || "User",
               image: session.user.image || null,
               createdAt: new Date().toISOString(),
               updatedAt: new Date().toISOString(),
               emailVerified: null,
               hashedPassword: null,
               phoneNumber: null,
               whatsappNumber: null,
               isAdmin: false,
               favoriteIds: [],
            };
         }
         return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
         };
      } catch (dbError) {
         // If database is not available, return session data as demo user
         console.log("Database unavailable, returning session as demo user");
         return {
            id: session.user.email,
            email: session.user.email,
            name: session.user.name || "Demo User",
            image: session.user.image || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            emailVerified: null,
            hashedPassword: null,
            phoneNumber: null,
            whatsappNumber: null,
            isAdmin: false,
            favoriteIds: [],
         };
      }
   } catch (error: any) {
      return null;
   }
}
