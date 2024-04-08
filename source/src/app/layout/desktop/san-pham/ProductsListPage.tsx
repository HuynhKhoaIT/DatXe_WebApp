import { Button, Flex, Grid, Box, Space } from "@mantine/core";
import { useEffect, useState } from "react";
import { IProduct } from "@/interfaces/product";
import Body from "@/app/components/layout/Body";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import { Sort } from "@/app/components/elements/shop-sort";
import ProductItem from "@/app/components/elements/product/ProductItem1";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import styles from "./index.module.scss";
export default function ProductsListPage({ categories, products }: any) {
  return (
    <Body>
      <Body.Sider>
        <FilterRadio
          data={categories?.data}
          filterName="Danh mục"
          keyName="categoryId"
        />
      </Body.Sider>
      <Body.Content>
        <Sort lengthData={8} />
        <Space h="md" />
        <Box w={"100%"}>
          <div className={styles.products}>
            {products?.data?.map((product: IProduct, index: number) => (
              <ProductItem2 product={product} key={index} />
            ))}
          </div>
        </Box>
        <Flex justify="center" mt={36}>
          <Button
            color={"var(--theme-color)"}
            // onClick={() => setProductCount(productCount + 5)}
            // disabled={isFetching}
          >
            Xem Thêm
          </Button>
        </Flex>
      </Body.Content>
    </Body>
  );
}
