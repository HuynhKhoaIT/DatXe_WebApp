"use client";
import React from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames";
import {
  IconBell,
  IconClipboard,
  IconHome,
  IconKey,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { titleHeader } from "@/constants/masterData";
import { ROLE_CUSTOMER, titleHeaderKeys } from "@/constants";
import { useSession } from "next-auth/react";
import FooterMobile from "./FooterMobile";

function FooterMobileApp() {
  const { data } = useSession();
  const pathname = usePathname();
  const parts = pathname.split("/");
  let page: any = parts?.[2] || parts?.[1];
  const res: any = titleHeader?.find((item) => {
    return item?.value == page;
  });
  if (!data?.user?.token || data?.user?.role != ROLE_CUSTOMER) {
    return <FooterMobile />;
  }
  return (
    <footer className={styles.footer}>
      <Link href={"/"} className={classNames(styles.itemFooter)}>
        <IconHome />
        <span>Trang chủ</span>
      </Link>
      <Link
        href={"/dashboard/danh-sach-xe"}
        className={classNames(styles.itemFooter)}
      >
        {res?.label == titleHeaderKeys.MY_CAR_TITLE ? (
          <div>
            <IconKey color={"var(--primary-color)"} />
          </div>
        ) : (
          <IconKey />
        )}
        <span
          style={
            res?.label == titleHeaderKeys.MY_CAR_TITLE
              ? { color: "var(--primary-color)" }
              : {}
          }
        >
          Xe của tôi
        </span>
      </Link>
      <Link
        href={"/dashboard/danh-sach-don-hang"}
        className={classNames(styles.itemFooter)}
      >
        {res?.label == titleHeaderKeys.ORDERS_TITLE ? (
          <IconClipboard color={"var(--primary-color)"} />
        ) : (
          <IconClipboard />
        )}
        <span
          style={
            res?.label == titleHeaderKeys.ORDERS_TITLE
              ? { color: "var(--primary-color)" }
              : {}
          }
        >
          Đơn hàng
        </span>
      </Link>
      <Link href={"/thong-bao"} className={classNames(styles.itemFooter)}>
        {res?.label == titleHeaderKeys.NOTI_TITLE ? (
          <IconBell color={"var(--primary-color)"} />
        ) : (
          <IconBell />
        )}
        <span
          style={
            res?.label == titleHeaderKeys.NOTI_TITLE
              ? { color: "var(--primary-color)" }
              : {}
          }
        >
          Thông báo
        </span>
      </Link>
      <Link href={"/dashboard/ho-so"} className={classNames(styles.itemFooter)}>
        {res?.label == titleHeaderKeys.PROFILE_TITLE ? (
          <IconUser color={"var(--primary-color)"} />
        ) : (
          <IconUser />
        )}
        <span
          style={
            res?.label == titleHeaderKeys.PROFILE_TITLE
              ? { color: "var(--primary-color)" }
              : {}
          }
        >
          Hồ sơ
        </span>
      </Link>
    </footer>
  );
}

export default FooterMobileApp;
