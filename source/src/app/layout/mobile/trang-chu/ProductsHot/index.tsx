"use client";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import { IProduct } from "@/interfaces/product";
import styles from "./index.module.scss";
const ProductsHot = ({ data }: any) => {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Sản phẩm thịnh hành"
      linkToList={"/danh-sach-san-pham"}
      id="services-hot-mb"
    >
      <div className={styles.rowItem}>
        {data?.map((item: any, index: number) => (
          <ProductItem2 product={item?.product} key={index} />
        ))}
      </div>
    </OverviewPanel>
  );
};
export default ProductsHot;
