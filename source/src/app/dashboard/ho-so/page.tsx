import React from "react";
import { Space } from "@mantine/core";
import UserProfile from "./_component/User";
import styles from "./index.module.scss";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib";
import { toast } from "react-toastify";
import InfoProfile from "./_component/Info";
export default async function ProfilePage() {
  // const { data: profile, isLoading } = useAccountDetail();
  const profile = await callApi(apiConfig.account.getAccount, {});
  const carsData = await callApi(apiConfig.car.getList, {});
  async function handleUpdate(formData: any) {
    "use server";
    try {
      await callApi(apiConfig.account.update, {
        data: formData,
      });
    } catch (error) {
      throw new Error("Failed to create task");
    }
  }
  return (
    <div className={styles.formUser}>
      <InfoProfile myAccount={profile?.data} cars={carsData} />
      <Space h="md" />
      <UserProfile myAccount={profile?.data} handleUpdate={handleUpdate} />
    </div>
  );
}
