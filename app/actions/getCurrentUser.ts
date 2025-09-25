import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
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
            return null;
         }
         return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
         };
      } catch (dbError) {
         // If database is down, return demo user data
         console.log("Database connection failed, returning demo user");
         return {
            id: "demo-user",
            email: session.user.email,
            name: session.user.name || "Demo User",
            image: session.user.image || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            emailVerified: null,
            hashedPassword: null,
         };
      }
   } catch (error: any) {
      return null;
   }
}
