import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import NotificationDropDown from "../desktop/_component/NotificationDropDown";
import ButtonAddAddress from "../desktop/_component/ButtonAddAddress";
import { brandData } from "@/constants/masterData";
import ActionIconCartMobile from "./_component/ActionIconCart";
import { callApi, getSession, logout } from "@/lib/auth";
import MenuHeader from "./_component/MenuHeader";
import SearchFormMobile from "./_component/SearchForm";
import apiConfig from "@/constants/apiConfig";
import { Flex } from "@mantine/core";
import ImageField from "@/app/components/form/ImageField";

export default async function HeaderMobile() {
  const session: any = await getSession();
  const profile = await callApi(apiConfig.account.getAccount, {});
  async function handleLogout() {
    "use server";
    await logout();
  }
  return (
    <div className={styles.wrapper}>
      <Flex justify={"space-between"} py={4} h={47}>
        <Link href={"/"} className={styles.logo}>
          <ImageField src={logo.src} alt="logo" />
        </Link>
        <Flex
          style={{ flex: 1 }}
          justify={"flex-end"}
          gap={10}
          align={"center"}
          mr={"-10px"}
        >
          <NotificationDropDown color={"var(--title-color)"} />
          <ActionIconCartMobile />
          {profile?.data?.avatar && (
            <Link href={"/dashboard"}>
              <ImageField
                src={profile?.data?.avatar}
                alt="avatar"
                width={40}
                height={40}
                radius={40}
              />
            </Link>
          )}
          <MenuHeader user={session?.user} logout={handleLogout} />
        </Flex>
      </Flex>
      <Flex gap={"0.3rem"}>
        <ButtonAddAddress />
        <SearchFormMobile />
      </Flex>
      <Flex className={styles.headerNav} align={"center"} gap={10}>
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
      </Flex>
    </div>
  );
}
