"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./index.module.scss";
import { ROLE_CUSTOMER, ROLE_EXPERT, storageKeys } from "@/constants";
import Link from "next/link";
import {
  IconBell,
  IconBuildingStore,
  IconClipboard,
  IconKey,
  IconLogin,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { IconShoppingCart } from "@tabler/icons-react";
import { removeItem } from "@/utils/until/localStorage";
import useFcmToken from "@/app/hooks/useFCMToken";
import { deleteToken } from "@/utils/notification";
import { IconMenu } from "@tabler/icons-react";
import { toast } from "react-toastify";

const DynamicMenu = dynamic(() => import("../NavDrawer"), {
  ssr: false,
});

export default function MenuHeader({ user, logout }: any) {
  const [openNav, setOpenNav] = useState(false);
  const { fcmToken } = useFcmToken();

  return (
    <>
      <IconMenu onClick={() => setOpenNav(true)} color={"var(--title-color)"} />
      <DynamicMenu
        open={openNav}
        onClose={() => setOpenNav(false)}
        headerTitle="Menu"
      >
        <ul className={styles.nav}>
          {user?.role == ROLE_CUSTOMER && (
            <>
              <li>
                <Link href="/dashboard/ho-so" className={styles.navItem}>
                  <IconUser size={18} />
                  Thông tin cá nhân
                </Link>
              </li>
              <li>
                <Link href="/dashboard/danh-sach-xe" className={styles.navItem}>
                  <IconKey size={18} />
                  Danh sách xe
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/danh-sach-don-hang"
                  className={styles.navItem}
                >
                  <IconClipboard size={18} />
                  Đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/thong-bao" className={styles.navItem}>
                  <IconBell size={18} />
                  Thông báo
                </Link>
              </li>
            </>
          )}
          {user?.role == ROLE_CUSTOMER && (
            <li>
              <Link href="/gio-hang" className={styles.navItem}>
                <IconShoppingCart size={18} />
                Giỏ hàng
              </Link>
            </li>
          )}
          {user?.role === ROLE_EXPERT && (
            <li>
              <Link href="/cua-hang-cua-toi" className={styles.navItem}>
                <IconBuildingStore size={18} />
                Cửa hàng của tôi
              </Link>
            </li>
          )}
          {user?.role !== ROLE_CUSTOMER && (
            <li>
              <Link href="/admin" className={styles.navItem}>
                <IconUser size={18} />
                Quản trị
              </Link>
            </li>
          )}

          {!user ? (
            <Link href="/dang-nhap" className={styles.title}>
              <li className={styles.navLogout}>
                <IconLogin size={18} />
                Đăng nhập
              </li>
            </Link>
          ) : (
            <Link
              href={"/"}
              onClick={async () => {
                await deleteToken({ token: fcmToken });
                removeItem(storageKeys.CART_DATA);
                try {
                  await logout();
                  setOpenNav(false);
                  toast.success("Đăng xuất thành công");
                } catch (error) {
                  toast.success("Đăng xuất thất bại");
                }
              }}
              className={styles.navLogout}
            >
              <IconLogout size={18} />
              Đăng xuất
            </Link>
          )}
        </ul>
      </DynamicMenu>
    </>
  );
}
