"use client";
import React from "react";
import { Space } from "@mantine/core";
import InfoProfile from "./_component/Info";
import UserProfile from "./_component/User";
import { useAccountDetail } from "../hooks/profile/useProfile";

export default function ProfilePage() {
  const { data: profile, isLoading } = useAccountDetail();
  return (
    <div className="user-profile-wrapper">
      <InfoProfile />
      <Space h="md" />
      <UserProfile myAccount={profile?.data} isLoading={isLoading} />
    </div>
  );
}
