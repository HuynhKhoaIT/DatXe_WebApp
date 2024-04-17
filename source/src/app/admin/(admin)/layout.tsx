import { Fragment, ReactNode, Suspense } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ROLE_ADMIN } from "@/constants";
import { redirect } from "next/navigation";

interface IProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: IProps) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role == ROLE_ADMIN) {
    return redirect(`/admin/system-expert`);
  }
  return <Fragment>{children}</Fragment>;
}
