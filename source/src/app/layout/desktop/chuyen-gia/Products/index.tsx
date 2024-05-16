"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
const Products = ({ data, garageId }: any) => {
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        // stylesProps={{ padding: "30px 0" }}
        title="Sản phẩm của chuyên gia"
        linkToList={`/danh-sach-san-pham?garageId=${garageId}&isProduct=true`}
        id="products-expert"
        hiddenShowMore={data?.length < 8}
      >
        <div className={styles.rowItem}>
          {data?.map((product: IProduct, index: number) => (
            <ProductItem2 product={product} key={index} />
          ))}
        </div>
      </OverviewPanel>
    </div>
  );
};
export default Products;
