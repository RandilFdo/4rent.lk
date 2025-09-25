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
               in: [...(currentUser.favoriteIds || [])],
            },
         },
      });

      const safeFavorites = favorites.map((favorite) => ({
         ...favorite,
         createdAt: favorite.createdAt.toISOString(),
         updatedAt: favorite.updatedAt.toISOString(),
         vehicleAttributes: favorite.vehicleAttributes as any,
         propertyAttributes: favorite.propertyAttributes as any,
      }));

      return safeFavorites;
   } catch (error: any) {
      throw new Error(error);
   }
}
