import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
   try {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
         return [];
      }

      const favorites = await prisma.listing.findMany({
         where: {
            id: {
               in: [...(('favoriteIds' in currentUser ? currentUser.favoriteIds : []) || [])],
            },
         },
      });

      const safeFavorites = favorites.map((favorite) => ({
         ...favorite,
         createdAt: favorite.createdAt.toISOString(),
         updatedAt: favorite.updatedAt.toISOString(),
         expiresAt: favorite.expiresAt ? favorite.expiresAt.toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default to 30 days from now if not set
         lastRenewedAt: favorite.lastRenewedAt ? favorite.lastRenewedAt.toISOString() : undefined,
         vehicleAttributes: favorite.vehicleAttributes as any,
         propertyAttributes: favorite.propertyAttributes as any,
         experienceAttributes: favorite.experienceAttributes as any,
      }));

      return safeFavorites;
   } catch (error: any) {
      throw new Error(error);
   }
}
