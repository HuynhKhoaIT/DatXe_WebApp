"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import Typo from "@/app/components/elements/Typo";
import CardImg from "@/assets/images/card.png";
import { BackgroundImage, Center, Text } from "@mantine/core";
export default function InfoProfile() {
  return (
    <div className={styles.wrapper}>
      <div>
        <div style={{ borderBottom: "1px solid #eeeeee" }}>
          <Typo size="18px" type="bold" className={styles.title}>
            Thông tin hồ sơ
          </Typo>
        </div>
        <BackgroundImage src={CardImg.src} radius="sm" h={300} w={550}>
          <ul className={styles.infoCard}>
            <li>
              <span>Mã khách hàng:</span> <span>1232322</span>
            </li>
            <li>
              <span>Điểm hiện có:</span> <span>140000</span>
            </li>
            <li>
              <span>Thành viên:</span> <span>bạc</span>
            </li>
            <li>
              <span>Mã thẻ:</span> <span>Xe747484848848</span>
            </li>
          </ul>
        </BackgroundImage>
      </div>
    </div>
  );
}
