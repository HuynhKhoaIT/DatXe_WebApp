import { Fragment, ReactNode, Suspense } from "react";
import { ROLE_ADMIN } from "@/constants";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

interface IProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: IProps) {
  const session = await getSession();
  if (session?.user?.role == ROLE_ADMIN) {
    return redirect(`/admin/system-expert`);
  }
  return <Fragment>{children}</Fragment>;
}
