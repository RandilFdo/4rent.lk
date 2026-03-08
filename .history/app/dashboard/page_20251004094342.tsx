import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/");
  }

  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    redirect("/");
  }

  return <DashboardClient currentUser={currentUser as any} />;
};

export default DashboardPage;

