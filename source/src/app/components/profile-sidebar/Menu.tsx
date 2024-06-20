import { ProfileSidebar } from "./sidebar";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
export default async function Menu() {
  const myAccount = await callApi(apiConfig.account.getAccount, {});
  return <ProfileSidebar myAccount={myAccount} />;
}
