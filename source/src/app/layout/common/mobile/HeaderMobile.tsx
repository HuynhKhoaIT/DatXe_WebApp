"use client";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.png";
import { useForm } from "@mantine/form";
import { ActionIcon, Input } from "@mantine/core";
import {
  IconBuildingStore,
  IconCar,
  IconClipboard,
  IconKey,
  IconLogin,
  IconLogout,
  IconMenu,
  IconSearch,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import IconCart from "@/assets/icons/cart.svg";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import { useAccountDetail } from "@/app/dashboard/hooks/profile/useProfile";
import { ROLE_CUSTOMER, ROLE_EXPERT, storageKeys } from "@/constants";
import NotificationDropDown from "../desktop/_component/NotificationDropDown";
import { deleteToken } from "@/utils/notification";
import useFcmToken from "@/app/hooks/useFCMToken";
import ButtonAddAddress from "../desktop/_component/ButtonAddAddress";
import { brandData } from "@/constants/masterData";
import ActionIconCartMobile from "./_component/ActionIconCart";
import { removeItem } from "@/utils/until/localStorage";
import { IconBell } from "@tabler/icons-react";

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

          <form
            style={{ flex: "1" }}
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
          >
            <Input
              {...form.getInputProps("searchValue")}
              // size="md"
              classNames={{
                input: styles.inputSearch,
              }}
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
          {role == ROLE_CUSTOMER && (
            <li>
              <Link href="/gio-hang" className={styles.navItem}>
                <IconShoppingCart size={18} />
                Giỏ hàng
              </Link>
            </li>
          )}
          {session?.user?.role === ROLE_EXPERT && (
            <li>
              <Link href="/cua-hang-cua-toi" className={styles.navItem}>
                <IconBuildingStore size={18} />
                Cửa hàng của tôi
              </Link>
            </li>
          )}
          {role !== ROLE_CUSTOMER && session?.user && (
            <li>
              <Link href="/admin" className={styles.navItem}>
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
                removeItem(storageKeys.CART_DATA);
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
