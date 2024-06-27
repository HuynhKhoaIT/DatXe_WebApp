"use client";
import { useMyGarage } from "@/app/hooks/useMyGarage";
import NotificationDropDown from "@/app/layout/common/desktop/_component/NotificationDropDown";
import SigninButton from "@/app/layout/common/desktop/login-button";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import styles from "./index.module.scss";
import Link from "next/link";
import { NavbarNested } from "@/app/admin/NavbarNested";
import logo from "@/assets/images/logo.png";
import { Suspense } from "react";

export default function DashboardLayout({
  user,
  children,
  logout,
  myGarage,
}: any) {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "md",
        collapsed: { mobile: !opened, desktop: !desktopOpened },
      }}
      padding={{ base: 10, md: 30, lg: 30 }}
    >
      <AppShell.Header>
        <Group
          style={{ flexWrap: "nowrap" }}
          h="100%"
          px="md"
          justify="space-between"
        >
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p className={styles.shortName}>{myGarage?.shortName}</p>
              <p className={styles.addressExpert}>{myGarage?.address}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NotificationDropDown color="black" />
            <SigninButton user={user} logout={logout} />
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar zIndex={100}>
        <Group h={60} pl={"md"}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link href={"/"}>
            <img style={{ height: "60px" }} src={logo.src} alt="logo" />
          </Link>
        </Group>
        <NavbarNested toggle={toggle} user={user} />
      </AppShell.Navbar>
      <AppShell.Main className={styles.main}>{children} </AppShell.Main>
    </AppShell>
  );
}
