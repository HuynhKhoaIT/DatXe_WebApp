import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.png";
import { ActionIcon, Button } from "@mantine/core";
import car from "@/assets/icons/car.svg";
import HeaderTop from "./HeaderTop";
import Container from "@/app/components/common/Container";
import SearchFormName from "@/app/components/elements/search/SearchFormName";
import { IconShoppingCart } from "@tabler/icons-react";
import ButtonAddCar from "./_component/ButtonAddCar";
import ButtonAddAddress from "./_component/ButtonAddAddress";
import { brandData } from "@/constants/masterData";
import ActionIconCart from "./_component/ActionIconCart";
import { callApi, getSession } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function Header() {
  async function handleAdd(formData: any) {
    "use server";
    await callApi(apiConfig.car.create, {
      data: formData,
    });
  }
  const session = await getSession();
  return (
    <header className={styles.header}>
      <HeaderTop />
      <div className={styles.headerContent}>
        <Container>
          <div className={styles.headerSearch}>
            <Link href={"/"}>
              <img
                style={{ cursor: "pointer", height: 56 }}
                src={logo.src}
                alt=""
              />
            </Link>
            <div className={styles.search}>
              <ButtonAddAddress />
              <SearchFormName />
              <ActionIconCart />
              <ButtonAddCar
                handleAdd={handleAdd}
                styles={styles}
                user={session?.user}
              />
            </div>
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
        </Container>
      </div>
    </header>
  );
}
