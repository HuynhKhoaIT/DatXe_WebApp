"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import Typo from "@/app/components/elements/Typo";
import CardImg from "@/assets/images/card.png";
import { BackgroundImage, Center, Text } from "@mantine/core";
export default function InfoProfile({ myAccount, cars }: any) {
  console.log(cars);
  return (
    <div className={styles.wrapper}>
      <div>
        <div style={{ borderBottom: "1px solid #eeeeee" }}>
          <Typo size="18px" type="bold" className={styles.title}>
            Thông tin hồ sơ
          </Typo>
        </div>
        <BackgroundImage
          src={CardImg.src}
          radius="sm"
          h={{ base: 200, md: 250, lg: 250 }}
          w={{ base: "100%", md: 450, lg: 450 }}
        >
          <ul className={styles.infoCard}>
            <li>
              <span>Mã khách hàng: </span>
              <span style={{ fontWeight: 600, fontSize: 18 }}>
                {myAccount?.id}
              </span>
            </li>
            <li>
              <span>Sở hữu: </span>{" "}
              <span style={{ fontWeight: 600, fontSize: 18 }}>
                {cars?.total} xe
              </span>
            </li>
            <li>
              <span>Thành viên: </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--theme-color)",
                }}
              >
                bạc
              </span>
            </li>
            <li>
              <span>Mã thẻ: </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--theme-color)",
                }}
              >
                {myAccount?.phoneNumber}
              </span>
            </li>
          </ul>
        </BackgroundImage>
      </div>
    </div>
  );
}
