import { Fragment, ReactNode, Suspense } from "react";
import { ROLE_ADMIN } from "@/constants";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import styles from "./index.module.scss";
interface IProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  const session: any = await getSession();
  if (session?.user?.role == ROLE_ADMIN) {
    return redirect(`/admin/system-expert`);
  }
  return (
    <Fragment>
      {children}
      {isMobile && (
        <footer className={styles.appFooter}>
          <div>
            <strong>DatXE - Ứng dụng đặt lịch sửa xe </strong>
          </div>
        </footer>
      )}
    </Fragment>
  );
}
