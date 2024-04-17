import React, { useEffect, useState } from "react";
import { ProfileSidebar } from "./sidebar";
import { getMyAccount } from "@/utils/user";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
export default async function Menu() {
  const myAccount = await callApi(apiConfig.account.getAccount, {});
  return <ProfileSidebar myAccount={myAccount} />;
}
