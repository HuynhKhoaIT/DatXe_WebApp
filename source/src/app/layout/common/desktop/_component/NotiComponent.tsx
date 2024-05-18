"use client";
import { IconBell } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

export default function NotiComponent() {
  const { data } = useSession();
  return <>{data?.user && <IconBell color="#fff" />}</>;
}
