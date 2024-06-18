import React from "react";
import { Space } from "@mantine/core";
import UserProfile from "./_component/User";
import styles from "./index.module.scss";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib";
export default async function ProfilePage() {
  // const { data: profile, isLoading } = useAccountDetail();
  const profile = await callApi(apiConfig.account.getAccount, {});
  const carsData = await callApi(apiConfig.car.getList, {});

  return (
    <div className={styles.formUser}>
      {/* <InfoProfile myAccount={profile?.data} cars={cars} /> */}
      <Space h="md" />
      <UserProfile myAccount={profile?.data} />
    </div>
  );
}
