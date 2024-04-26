"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import ProductItem from "@/app/components/elements/product/ProductItem1";
export default function ServicesHot({ data }: any) {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Dịch vụ khuyến mãi"
      subTitle="Các dịch vụ dành cho xe bạn"
      linkToList={"/danh-sach-san-pham?isProduct=false"}
      id="services"
    >
      <div className={styles.rowItem}>
        {data?.map((item: any, index: number) => (
          <ProductItem product={item?.product} key={index} />
        ))}
      </div>
    </OverviewPanel>
  );
}
