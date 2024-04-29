"use client";
import Typo from "@/app/components/elements/Typo";

import styles from "./index.module.scss";
import Star from "@/assets/icons/star.svg";
import Avatar from "@/assets/images/avatar.png";
import Qr from "@/assets/icons/qr.svg";
import Check from "@/assets/icons/checkExpert.svg";
import { ActionIcon, Button } from "@mantine/core";
import Container from "@/app/components/common/Container";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";

import React, { useState } from "react";
const DynamicModalQRCode = dynamic(() => import("./ModalQRCodeLogo"), {
  ssr: false,
});

const Info = ({ detailData }: any) => {
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.body}>
          <div className={styles.info}>
            <div className={styles.avatar}>
              <img
                src={detailData?.logo ? detailData?.logo : Avatar.src}
                alt="avatar"
              />
            </div>
            <div className={styles.infoBox}>
              <div className={styles.headerInfo}>
                <div className={styles.name}>
                  <Typo size="small" type="semi-bold" className={styles.text}>
                    {detailData?.shortName}
                  </Typo>
                  <img src={Check.src} />
                </div>
                <Typo size="primary" style={{ color: "var(--title-white)" }}>
                  Chuyên gia xe SUV/CUV
                </Typo>
              </div>
              <ul className={styles.subInfo}>
                <li>
                  <Typo size="primary">12,723</Typo>
                  <Typo size="tiny" style={{ color: "#9A9A9A" }}>
                    Lượt xem
                  </Typo>
                </li>
                <li>
                  <Typo size="primary">12,723</Typo>
                  <Typo size="tiny" style={{ color: "#9A9A9A" }}>
                    Liên hệ
                  </Typo>
                </li>
                <li>
                  <Typo size="primary">25/12/2023</Typo>
                  <Typo size="tiny" style={{ color: "#9A9A9A" }}>
                    Ngày tham gia
                  </Typo>
                </li>
                <li>
                  <Typo size="primary" style={{ display: "flex", gap: "5px" }}>
                    <img src={Star.src} alt="star" />
                    4.8
                  </Typo>
                  <Typo size="tiny" style={{ color: "#9A9A9A" }}>
                    Đánh giá
                  </Typo>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.contact}>
            <Link
              href={`/dat-lich?garageId=${detailData?.id}&name=${detailData?.name}`}
            >
              <Button size="lg" radius={0} color="var(--primary-color)" h={56}>
                Đặt lịch
              </Button>
            </Link>
            <a href={`tel:${detailData.phoneNumber}`}>
              <Button
                size="lg"
                radius={0}
                variant="outline"
                color="#000"
                h={56}
              >
                Liên hệ
              </Button>
            </a>
            <ActionIcon
              w={56}
              h={56}
              variant="outline"
              color="#000"
              onClick={() => {
                // generate();
                openModal();
              }}
            >
              <img src={Qr.src} />
            </ActionIcon>
          </div>
        </div>
      </Container>
      <DynamicModalQRCode
        openModal={openedModal}
        close={closeModal}
        src={`${detailData?.bitlyUrl}`}
        logoUrl={detailData?.logo}
      />
    </div>
  );
};
export default Info;
