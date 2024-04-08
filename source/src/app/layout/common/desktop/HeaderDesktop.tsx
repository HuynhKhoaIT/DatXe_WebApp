import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.png";
import { ActionIcon, Button, Select, Skeleton } from "@mantine/core";
import car from "@/assets/icons/car.svg";
import HeaderTop from "./HeaderTop";
import Container from "@/app/components/common/Container";
import SearchFormName from "@/app/components/elements/search/SearchFormName";
import { IconShoppingCart } from "@tabler/icons-react";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Header() {
  const brandData = [
    {
      id: "1",
      name: "VinFast",
    },
    {
      id: "2",
      name: "Toyota",
    },
    {
      id: "3",
      name: "BMW",
    },
    {
      id: "4",
      name: "mercedes",
    },
    {
      id: "5",
      name: "Audi",
    },
    {
      id: "6",
      name: "Ford",
    },
    {
      id: "7",
      name: "Honda",
    },
    {
      id: "8",
      name: "Mazda",
    },
    {
      id: "9",
      name: "KIA",
    },
  ];
  const cars = await callApi(apiConfig.car.getList, {});
  const dataOption = cars?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.numberPlates,
  }));

  return (
    <header className={styles.header}>
      <HeaderTop />
      <div className={styles.headerContent}>
        <Container>
          <div className={styles.headerSearch}>
            <Link href={"/"}>
              <img style={{ cursor: "pointer" }} src={logo.src} alt="" />
            </Link>
            <div className={styles.search}>
              <SearchFormName />
              <Link href={"/gio-hang"}>
                <ActionIcon color="#EEF1F9" size={56}>
                  <IconShoppingCart size={28} color="#3450E7" />
                </ActionIcon>
              </Link>
              {cars?.data?.length > 0 ? (
                <Select
                  classNames={{ input: styles.inputSelect }}
                  data={dataOption}
                  h={56}
                />
              ) : (
                <Button
                  color="#EEF1F9"
                  leftSection={<img src={car.src} alt="Car Icon" />}
                  classNames={{
                    root: styles.btnAdd,
                    inner: styles.innerAdd,
                  }}
                >
                  Thêm xe
                </Button>
              )}

              <Link href={"/dat-lich"}>
                <Button
                  color="#3450E7"
                  classNames={{ root: styles.btnBook, inner: styles.innerBook }}
                >
                  Book Lịch
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.headerNav}>
            {brandData?.map((item, index) => {
              return (
                <Link href="/san-pham" key={index} className={styles.itemNav}>
                  {item?.name}
                </Link>
              );
            })}
          </div>
        </Container>
      </div>
    </header>
  );
}
