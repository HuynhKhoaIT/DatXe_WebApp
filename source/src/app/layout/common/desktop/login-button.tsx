"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";
import { Menu, rem } from "@mantine/core";
import {
  IconExternalLink,
  IconLogout,
  IconEye,
  IconCaretDownFilled,
  IconUserCircle,
  IconBuildingStore,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { deleteToken } from "@/utils/notification";
import useFcmToken from "@/app/hooks/useFCMToken";
import { useTheme } from "next-themes";
import { ROLE_EXPERT, storageKeys } from "@/constants";
import { removeItem } from "@/utils/until/localStorage";

const SigninButton = () => {
  const { fcmToken } = useFcmToken();
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleCar = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push("/gio-hang");
  };
  const handleDashboard = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push("/dashboard");
  };
  const handleAdmin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push("/admin");
  };

  if (status == "loading") {
    return <></>;
  }

  const { setTheme, resolvedTheme } = useTheme();
  const handleChangeTheme = () => {
    if (resolvedTheme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <>
      <div className={styles.buttonLogin}>
        <IconUserCircle color="#fff" />
        <div className={styles.actionLogin}>
          {!session?.user ? (
            <div style={{ display: "flex" }}>
              <Link href="/dang-nhap" className={styles.title}>
                Đăng nhập/
              </Link>
              <Link href="/dang-ky" className={styles.title}>
                Đăng ký
              </Link>
            </div>
          ) : (
            <Menu width={200} shadow="md">
              <Menu.Target>
                <div className={styles.title} style={{ display: "flex" }}>
                  <span className={styles.userName}>{session?.user.name}</span>
                  <IconCaretDownFilled style={{ cursor: "pointer" }} />
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                {session?.user?.role == "CUSTOMER" && (
                  <>
                    <Menu.Item
                      component="a"
                      onClick={handleDashboard}
                      leftSection={
                        <IconEye style={{ width: rem(14), height: rem(14) }} />
                      }
                    >
                      Xem hồ sơ
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconExternalLink
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      component="a"
                      onClick={handleCar}
                    >
                      Đơn mua
                    </Menu.Item>
                    {/* <Menu.Item
                      leftSection={
                        <IconExternalLink
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      component="a"
                      onClick={handleChangeTheme}
                    >
                      <span>
                        {resolvedTheme === "dark" ? "Light" : "Dark"} Mode
                      </span>
                    </Menu.Item> */}
                  </>
                )}
                {session?.user?.role === ROLE_EXPERT && (
                  <Menu.Item
                    component="a"
                    onClick={() => {
                      router.push("/cua-hang-cua-toi");
                    }}
                    leftSection={
                      <IconBuildingStore
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Cửa hàng của tôi
                  </Menu.Item>
                )}

                {session?.user?.role !== "CUSTOMER" && (
                  <Menu.Item
                    component="a"
                    onClick={handleAdmin}
                    leftSection={
                      <IconEye style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Quản trị
                  </Menu.Item>
                )}

                <Menu.Divider />
                <Menu.Item
                  component="a"
                  onClick={async () => {
                    await deleteToken({ token: fcmToken });
                    removeItem(storageKeys.CART_DATA);
                    signOut();
                  }}
                  color="red"
                  leftSection={
                    <IconLogout style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Đăng xuất
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </div>
    </>
  );
};

export default SigninButton;
