import Container from "@/app/components/common/Container";
import Filter from "../danh-muc/Filter";
import Products from "../danh-muc/Products";
import styles from "./index.module.scss";
import { Button, Flex } from "@mantine/core";
import ButtonShowMore from "@/app/components/form/ButtonShowMore";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
import { kindProduct } from "@/constants/masterData";
const ProductsListPageMobile = ({ products, searchParams }: any) => {
  return (
    <div className={styles.wrapper}>
      <Filter kindProduct={kindProduct} />
      <Container>
        <Products products={products?.data} />
        {products?.currentPage < products?.totalPage && (
          <ButtonShowMore
            limitCurrent={searchParams?.limit || DEFAULT_SIZE_LIMIT}
            defaultValue={DEFAULT_SIZE_LIMIT}
          />
        )}
      </Container>
    </div>
  );
};
export default ProductsListPageMobile;
