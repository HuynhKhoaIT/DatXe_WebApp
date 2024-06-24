import { ReactNode } from "react";

import PageUnauthorized from "../components/page/unauthorized";
import NotificationDropDown from "../layout/common/desktop/_component/NotificationDropDown";
import { getSession, logout } from "@/lib/auth";
import { ROLE_CUSTOMER } from "@/constants";
import DashboardLayout from "../components/layout/Dashboard/DashboardLayout";
interface IProps {
  children: ReactNode;
}
export default async function Layout({ children }: IProps) {
  const session = await getSession();
  async function handleLogout() {
    "use server";
    await logout();
  }
  // if (isLoading) {
  //   return (
  //     <Box pos={"relative"} w="100vw" h="100vh">
  //       <LoadingOverlay zIndex={9} visible={true} />
  //     </Box>
  //   );
  // }
  if (session?.user?.role === ROLE_CUSTOMER) {
    return <PageUnauthorized />;
  }
  return (
    <DashboardLayout
      user={session?.user}
      children={children}
      logout={handleLogout}
    />
  );
}
