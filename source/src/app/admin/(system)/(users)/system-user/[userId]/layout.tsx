import { ReactNode, Fragment } from "react";
import styles from "../index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
interface IProps {
  children: ReactNode;
}

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách người dùng", href: "/admin/system-users" },
  { title: "Chi tiết người dùng" },
];
export default function CreateLayout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  return (
    <Fragment>
      {isMobile ? (
        <div className={styles.wrapper}>
          <Breadcrumb breadcrumbs={Breadcrumbs} />
          <div className={styles.content}>{children}</div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <Breadcrumb breadcrumbs={Breadcrumbs} />
          <div className={styles.content}>{children}</div>
        </div>
      )}
    </Fragment>
  );
}
