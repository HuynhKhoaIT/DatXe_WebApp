import { Group, Image, Divider } from "@mantine/core";
import React from "react";
import styles from "./ItemNews.module.scss";
import category from "@assets/images/category.png";
import Typo from "@/app/components/elements/Typo";
import Link from "next/link";
import ImageField from "@/app/components/form/ImageField";
import { AppConstants } from "@/constants";
const ItemNews = ({ item, index }: any) => {
  return (
    <Group mt={20} className={styles.item}>
      <Link href={`/bai-viet/${item?.id}`}>
        <ImageField
          src={
            item?.thumbnail &&
            `${AppConstants.contentRootUrl}${item?.thumbnail}`
          }
          alt="Relevant Image"
          radius="10px 10px 0 0"
          height={220}
          width={"100%"}
          mb="-18px"
        />
        <div
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: "0 0 10px 10px",
            backgroundColor: "#f3f4f9",
          }}
        >
          <Typo
            size="primary"
            className={styles.title}
            style={{ fontWeight: 900 }}
          >
            {item.title}
          </Typo>
          <Divider w={60} mt={10} />

          <div style={{ width: "100%", marginTop: 10 }}>
            <Group justify="space-between">
              <Group>
                <Typo size="sub" className={styles.shortDescription}>
                  {item?.shortDescription}
                </Typo>
              </Group>
            </Group>
          </div>
        </div>
      </Link>
    </Group>
  );
};

export default ItemNews;
