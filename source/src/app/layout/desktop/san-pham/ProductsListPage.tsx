import { Box, Space } from "@mantine/core";
import { IProduct } from "@/interfaces/product";
import Body from "@/app/components/layout/Body";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import { Sort } from "@/app/components/elements/shop-sort";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import styles from "./index.module.scss";
import ButtonShowMore from "@/app/components/form/ButtonShowMore";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
export default function ProductsListPage({ products, searchParams }: any) {
  return (
    <>
      <Sort lengthData={products?.data?.length || 0} />
      <Space h="md" />
      <Box w={"100%"}>
        <div className={styles.products}>
          {products?.data?.map((product: IProduct, index: number) => (
            <ProductItem2 product={product} key={index} />
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
