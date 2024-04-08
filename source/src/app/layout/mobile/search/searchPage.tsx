"use client";
import Container from "@/app/components/common/Container";
import Filter from "../danh-muc/Filter";
import Products from "../danh-muc/Products";
import styles from "./index.module.scss";
import { Button, Flex } from "@mantine/core";
const SearchPageMobile = ({
  kindProduct,
  products,
  productCount,
  setProductCount,
  isFetching,
}: any) => {
  return (
    <div className={styles.wrapper}>
      <Filter kindProduct={kindProduct.data} />
      <Container>
        <Products products={products?.data} />
        {productCount < products?.total && (
          <Flex justify="center" pt={36} pb={20}>
            <Button
              color={"var(--theme-color)"}
              onClick={() => setProductCount(productCount + 5)}
              disabled={isFetching}
            >
              Xem Thêm
            </Button>
          </Flex>
        )}
      </Container>
    </div>
  );
};
export default SearchPageMobile;
