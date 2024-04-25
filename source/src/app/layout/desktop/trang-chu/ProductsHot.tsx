"use client";
import React from "react";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
export default function ProductsHot({ data }: any) {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Sản phẩm ưu đãi"
      linkToList={"/danh-sach-san-pham"}
      id="products"
    >
      <div className={styles.rowItem}>
        {data?.map((product: IProduct, index: number) => (
          <ProductItem2 product={product} key={index} />
        ))}
      </div>
    </OverviewPanel>
  );
}
