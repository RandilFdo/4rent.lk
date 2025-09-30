import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import prisma from "@/app/libs/prismadb";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/");
  }

  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    redirect("/");
  }

  // Fetch user's business data
  const userBusiness = await prisma.business.findFirst({
    where: { userId: currentUser.id },
    select: {
      id: true,
      businessName: true,
      status: true,
      verified: true,
      trialEndDate: true,
      nextPaymentDue: true
    }
  });

  // Convert Date objects to strings for the component
  const userBusinessWithStringDates = userBusiness ? {
    ...userBusiness,
    trialEndDate: userBusiness.trialEndDate.toISOString(),
    nextPaymentDue: userBusiness.nextPaymentDue.toISOString()
  } : null;

  return <DashboardClient currentUser={currentUser as any} userBusiness={userBusinessWithStringDates} />;
};

export default DashboardPage;

