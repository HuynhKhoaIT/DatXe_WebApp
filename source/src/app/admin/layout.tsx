import { ReactNode } from "react";

import PageUnauthorized from "../components/page/unauthorized";
import NotificationDropDown from "../layout/common/desktop/_component/NotificationDropDown";
import { callApi, getSession, logout } from "@/lib/auth";
import { ROLE_CUSTOMER } from "@/constants";
import DashboardLayout from "../components/layout/Dashboard/DashboardLayout";
import apiConfig from "@/constants/apiConfig";
interface IProps {
  children: ReactNode;
}
export default async function Layout({ children }: IProps) {
  const session = await getSession();
  async function handleLogout() {
    "use server";
    await logout();
  }
  const myGarage = await callApi(apiConfig.admin.garage.myGarage, {});
  if (session?.user?.role === ROLE_CUSTOMER) {
    return <PageUnauthorized />;
  }
  return (
    <DashboardLayout
      user={session?.user}
      children={children}
      logout={handleLogout}
      myGarage={myGarage}
    />
  );
}
