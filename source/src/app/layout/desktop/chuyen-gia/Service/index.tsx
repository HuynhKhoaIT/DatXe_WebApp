"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import ProductItem from "@/app/components/elements/product/ProductItem1";
const Service = ({ data, garageId }: any) => {
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        // stylesProps={{ padding: "30px 0" }}
        title="Dịch vụ của chuyên gia"
        subTitle="Các dịch vụ dành cho xe bạn"
        linkToList={`/danh-sach-san-pham?isProduct=false&garageId=${garageId}`}
        id="services-expert"
        hiddenShowMore={data?.length < 8}
      >
        <div className={styles.rowItem}>
          {data?.map((product: IProduct, index: number) => (
            <ProductItem product={product} key={index} />
          ))}
        </div>
      </OverviewPanel>{" "}
    </div>
  );
};
export default Service;
