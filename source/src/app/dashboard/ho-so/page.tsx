"use client";
import React from "react";
import { Space } from "@mantine/core";
import InfoProfile from "./_component/Info";
import UserProfile from "./_component/User";
import { useAccountDetail } from "../hooks/profile/useProfile";
import { useCars } from "../hooks/car/useCar";
import styles from "./index.module.scss";
export default function ProfilePage() {
  const { data: profile, isLoading } = useAccountDetail();
  const { cars } = useCars();
  return (
    <div className={styles.formUser}>
      <InfoProfile myAccount={profile?.data} cars={cars} />
      <Space h="md" />
      <UserProfile myAccount={profile?.data} isLoading={isLoading} />
    </div>
  );
}
