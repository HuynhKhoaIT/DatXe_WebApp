"use client";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.png";
import { useForm } from "@mantine/form";
import { ActionIcon, Input } from "@mantine/core";
import {
  IconLogin,
  IconLogout,
  IconMenu,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import IconCart from "@/assets/icons/cart.svg";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import { useAccountDetail } from "@/app/dashboard/hooks/profile/useProfile";
import { ROLE_CUSTOMER } from "@/constants";
import NotificationDropDown from "../desktop/_component/NotificationDropDown";
import { deleteToken } from "@/utils/notification";
import useFcmToken from "@/app/hooks/useFCMToken";
import ButtonAddAddress from "../desktop/_component/ButtonAddAddress";
import { brandData } from "@/constants/masterData";
import ActionIconCartMobile from "./_component/ActionIconCart";

const DynamicMenu = dynamic(() => import("./NavDrawer"), {
  ssr: false,
});

const HeaderMobile = () => {
  const { data: session } = useSession();
  const { fcmToken } = useFcmToken();
  const searchParams = useSearchParams();
  const s: any = searchParams.get("s");
  const role = session?.user?.role;
  const { data: profile } = useAccountDetail();
  const router = useRouter();
  const [openNav, setOpenNav] = useState(false);
  const form = useForm({
    initialValues: {
      searchValue: s || "",
    },
    validate: {},
  });
  const handleSubmit = (values: any) => {
    try {
      router.push(`/tim-kiem?s=${values?.searchValue}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.headerTop}>
          <div className={styles.logo}>
            <Link href={"/"}>
              <img src={logo.src} alt="logo" />
            </Link>
          </div>
          <div className={styles.headerNav}>
            <NotificationDropDown color={"var(--title-color)"} />
            <ActionIconCartMobile />
            {profile?.data?.avatar && (
              <Link href={"/dashboard"}>
                <img
                  src={profile?.data?.avatar}
                  alt="avatar"
                  style={{ width: 40, height: 40, borderRadius: 40 }}
                />
              </Link>
            )}
            <IconMenu
              onClick={() => setOpenNav(true)}
              color={"var(--title-color)"}
            />
            {/* <div className={styles.menu} onClick={() => setOpenNav(true)}>
              <img src={IconMenu.src} alt="menu" />
            </div> */}
          </div>
        </div>
        <div className={styles.searchForm}>
          <ButtonAddAddress />

          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Input
              {...form.getInputProps("searchValue")}
              // size="md"
              leftSectionPointerEvents="all"
              leftSection={
                <ActionIcon variant="transparent" type="submit">
                  <IconSearch color="var(--blue-color)" />
                </ActionIcon>
              }
              placeholder="Vui lòng nhập..."
            />
          </form>
        </div>
        <div className={styles.headerNav}>
          {brandData?.map((item, index) => {
            return (
              <Link
                href={`/danh-sach-san-pham?brandId=${item.id}&brand=${item.id}`}
                key={index}
                className={styles.itemNav}
              >
                {item?.name}
              </Link>
            );
          })}
        </div>
      </div>

      <DynamicMenu
        open={openNav}
        onClose={() => setOpenNav(false)}
        headerTitle="Menu"
      >
        <ul className={styles.nav}>
          {role == ROLE_CUSTOMER && (
            <li className={styles.navItem}>
              <Link href="/dashboard">
                <IconUser size={18} />
                Hồ sơ
              </Link>
            </li>
          )}
          {role == ROLE_CUSTOMER && (
            <li className={styles.navItem}>
              <Link href="/gio-hang">
                <img src={IconCart.src} alt="bell" />
                Giỏ hàng
              </Link>
            </li>
          )}

          {role !== ROLE_CUSTOMER && session?.user && (
            <li className={styles.navItem}>
              <Link href="/admin">
                <IconUser size={18} />
                Quản trị
              </Link>
            </li>
          )}

          {!session?.user ? (
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
                signOut();
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
};
export default HeaderMobile;
