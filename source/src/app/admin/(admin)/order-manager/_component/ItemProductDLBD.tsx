import React from "react";
import styles from "./index.module.scss";
import ImageField from "@/app/components/form/ImageField";
import dynamic from "next/dynamic";
import { AppConstants } from "@/constants";

export default function ItemProductDLBD({ data }: any) {
  return (
    <div className={styles.item}>
      <div className={styles.itemLeft}>
        <div className={styles.imgItem}>
          <ImageField
            src={
              data?.thumbnail &&
              `${AppConstants.contentRootUrl}${data?.thumbnail}`
            }
            alt="Relevant Image"
            width="80px"
            height={"80px"}
            radius="md"
          />
        </div>

        <div className={styles.info}>
          <div className={styles.title}>{data?.name}</div>
          <div className={styles.price}>
            <p style={{ color: "var(--primary-color)" }}>
              {data?.sellPrice?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            {/* <del style={{ color: "var(--title-color-2)" }}>
              {(data?.total).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </del> */}
          </div>
          <div className={styles.quantity}>
            Số lượng:
            <span>{data.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
