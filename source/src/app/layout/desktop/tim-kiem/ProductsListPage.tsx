import { Box, Space } from "@mantine/core";
import { IProduct } from "@/interfaces/product";
import { Sort } from "@/app/components/elements/shop-sort";
import styles from "./index.module.scss";
import ButtonShowMore from "@/app/components/form/ButtonShowMore";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
import ProductItem from "@/app/components/elements/product/ProductItem1";
import Empty from "@/assets/images/empty-box.png";
export default function SearchListPage({ products, searchParams }: any) {
  if (products?.data?.length == 0) {
    return (
      <div className={styles.emptyData}>
        <img src={Empty.src} />
        <h3>Không có kết quả phù hợp, hãy thử tìm kiếm sản phẩm khác.</h3>
      </div>
    );
  }
  return (
    <>
      <Sort lengthData={products?.data?.length || 0} />
      <Space h="md" />
      <Box w={"100%"}>
        <div className={styles.products}>
          {products?.data?.map((product: IProduct, index: number) => (
            <ProductItem product={product} key={index} />
          ))}
        </div>
      </Box>
      {products?.currentPage < products?.totalPage && (
        <ButtonShowMore
          limitCurrent={searchParams?.limit || DEFAULT_SIZE_LIMIT}
          defaultValue={DEFAULT_SIZE_LIMIT}
        />
      )}
    </>
  );
}
