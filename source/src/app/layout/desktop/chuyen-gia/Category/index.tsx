"use client";
import React from "react";
import styles from "./index.module.scss";
import { CardCategory } from "./CardCategory";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import SlickCarousel from "@/app/components/common/SlickCarousell";
const Category = ({ categories, garageId }: any) => {
  return (
    <OverviewPanel
      stylesProps={{ marginBottom: "1rem" }}
      title="Danh mục dịch vụ"
      subTitle="Danh mục dịch vụ phổ biến"
      linkToList={"/danh-muc"}
      id="categories"
      padding={"30px 0"}
      hiddenShowMore
    >
      <div className={styles.rowItem}>
        <SlickCarousel gap={8} column={4} height="200px">
          {categories?.data?.map((item: any) => {
            return (
              <CardCategory
                garageId={garageId}
                key={item?.id}
                category={item}
              />
            );
          })}
        </SlickCarousel>
      </div>
    </OverviewPanel>
  );
};

export default Category;
