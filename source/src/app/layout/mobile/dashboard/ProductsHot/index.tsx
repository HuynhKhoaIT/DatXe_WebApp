"use client";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import { IProduct } from "@/interfaces/product";
import styles from "./index.module.scss";
import Scroll from "@/app/components/common/Scroll";
const ProductsHot = ({ data }: any) => {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Sản phẩm thịnh hành"
      linkToList={"/danh-sach-san-pham?isProduct=true"}
      id="services-hot-mb"
    >
      <div style={{ marginRight: "-12px" }}>
        <Scroll>
          {data?.map((product: IProduct, index: number) => (
            <ProductItem2 product={product} key={index} />
          ))}
        </Scroll>
      </div>
    </OverviewPanel>
  );
};
export default ProductsHot;
