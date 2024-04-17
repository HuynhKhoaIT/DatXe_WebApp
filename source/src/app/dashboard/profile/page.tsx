import React from "react";
import { getMyAccount } from "@/utils/user";
import { Space } from "@mantine/core";
import InfoProfile from "./_component/Info";
import UserProfile from "./_component/User";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
export default async function ProfilePage() {
  const profile = await callApi(apiConfig.account.getAccount, {});
  async function handleUpdate({ formData }: any) {
    "use server";
    const res = await callApi(apiConfig.account.update, {
      data: {
        ...formData,
      },
    });
    return res;
  }
  return (
    <div className="user-profile-wrapper">
      <InfoProfile />
      <Space h="md" />
      <UserProfile myAccount={profile} handleUpdate={handleUpdate} />
    </div>
  );
}
