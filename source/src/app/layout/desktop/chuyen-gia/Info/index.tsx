"use client";
import Typo from "@/app/components/elements/Typo";

import styles from "./index.module.scss";
import Star from "@/assets/icons/star.svg";
import Avatar from "@/assets/images/avatar.jpeg";
import Qr from "@/assets/icons/qr.svg";
import Check from "@/assets/icons/checkExpert.svg";
import { ActionIcon, Button, Text } from "@mantine/core";
import Container from "@/app/components/common/Container";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import React, { useState } from "react";
import {
  IconMap2,
  IconQrcode,
  IconShare,
  IconShare3,
} from "@tabler/icons-react";
import { AppConstants } from "@/constants";
import ImageField from "@/app/components/form/ImageField";
import { modals } from "@mantine/modals";
import MapLink from "@/app/components/common/Map/MapLink";
const DynamicModalQRCode = dynamic(() => import("./ModalQRCodeLogo"), {
  ssr: false,
});
const DynamicModalShare = dynamic(
  () => import("@/app/components/common/ModalShare/BasicSocialShare"),
  {
    ssr: false,
  }
);
const Info = ({ detailData }: any) => {
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );
  const [
    openedModalShare,
    { open: openModalShare, close: closeModalShare },
  ] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

  const openModalMap = () =>
    modals.openConfirmModal({
      title: "Chỉ đường đến trung tâm chuyên gia",
      children: (
        <Text size="sm">Chuyển hướng đến trang chỉ đường của google maps.</Text>
      ),
      labels: { confirm: "Tiếp tục", cancel: "Huỷ" },
      confirmProps: { color: "blue" },
      zIndex: 9999,
      onConfirm: () => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          "10.813794573008531, 106.72712990568188"
        )}`;
        window.open(googleMapsUrl, "_blank");
      },
    });

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.body}>
          <div className={styles.info}>
            <div className={styles.avatar}>
              <ImageField
                src={
                  detailData?.logo &&
                  `${AppConstants.contentRootUrl}${detailData?.logo}`
                }
                alt="avatar"
              />
            </div>
            <div className={styles.infoBox}>
              <div className={styles.headerInfo}>
                <div className={styles.name}>
                  <Typo size="small" type="bold" className={styles.text}>
                    {detailData?.shortName}
                  </Typo>
                  {/* <img src={Check.src} /> */}
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
              <Button color="var(--primary-color)" h={50}>
                Đặt lịch
              </Button>
            </Link>
            <a href={`tel:${detailData.phoneNumber}`}>
              <Button
                // size="lg"
                // radius={0}
                variant="outline"
                color="#000"
                h={50}
              >
                Liên hệ
              </Button>
            </a>
            <ActionIcon
              w={50}
              h={50}
              variant="outline"
              color="#000"
              onClick={() => {
                // generate();
                openModal();
              }}
            >
              <IconQrcode />
            </ActionIcon>
            <ActionIcon
              w={50}
              h={50}
              variant="outline"
              color="#000"
              onClick={() => {
                openModalShare();
              }}
            >
              <IconShare3 />
            </ActionIcon>
            <ActionIcon
              w={50}
              h={50}
              variant="outline"
              color="#000"
              onClick={openModalMap}
            >
              <IconMap2 />
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
      <DynamicModalShare opened={openedModalShare} close={closeModalShare} />
    </div>
  );
};
export default Info;
