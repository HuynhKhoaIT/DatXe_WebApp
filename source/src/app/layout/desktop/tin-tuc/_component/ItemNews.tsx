"use client";
import { Group, Flex } from "@mantine/core";
import React from "react";
import styles from "./ItemNews.module.scss";
import Typo from "@/app/components/elements/Typo";
import { useRouter } from "next/navigation";
import { AppConstants } from "@/constants";
const ItemNews = ({ item }: any) => {
  const router = useRouter();
  return (
    <Flex
      py={20}
      mt={15}
      mb={15}
      w={"100%"}
      className={styles.item}
      onClick={() => router.push(`/bai-viet/${item.id}`)}
    >
      <img
        src={
          item.thumbnail && `${AppConstants.contentRootUrl}${item.thumbnail}`
        }
        alt="Relevant Image"
        className={styles.image}
      />
      <div style={{ marginLeft: 25 }} className={styles.content}>
        <Typo
          className={styles.title}
          type={"semi-bold"}
          style={{ lineHeight: "50px" }}
        >
          {item.title}
        </Typo>

        {/* <Group className={styles.timegroup} gap="sm">
          <Typo
            type="bold"
            style={{ color: "var(--title-color-2)" }}
            className={styles.timegroup}
          >
            {convertUtcToLocalTime(
              item?.createdDate,
              DEFAULT_FORMAT,
              DATE_FORMAT_DISPLAY
            )}
          </Typo>
        </Group> */}
        <Group justify="space-between">
          <Group>
            <Typo size="sub" className={styles.description} type="semi-bold">
              {item?.shortDescription}
            </Typo>
          </Group>
        </Group>
      </div>
    </Flex>
  );
};

export default ItemNews;
