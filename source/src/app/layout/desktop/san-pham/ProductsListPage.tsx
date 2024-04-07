"use client";
import { Button, Flex, Grid, Box, Space } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IProduct } from "@/interfaces/product";
import Body from "@/app/components/layout/Body";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import { Sort } from "@/app/components/elements/shop-sort";
import ProductItem from "@/app/components/elements/product/ProductItem1";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";

export default function ProductsListPage({
  categories,
  products,
  isLoading,
  productCount,
  setProductCount,
  isFetching,
}: any) {
  const [categoryFilter, setCategoryFilter] = useState();
  useEffect(() => {
    // if (!categroies) return;
    const dataOption = categories?.data?.map((item: any) => ({
      value: item.id.toString(),
      name: item.title,
    }));
    setCategoryFilter(dataOption);
  }, [categories]);

  return (
    <Body>
      <Body.Sider>
        <FilterRadio
          data={categoryFilter}
          filterName="Danh mục"
          keyName="categoryId"
        />
      </Body.Sider>
      <Body.Content>
        <Sort lengthData={8} />
        <Space h="md" />
        <Box w={"100%"}>
          <Grid>
            {products?.data?.map((product: IProduct, index: number) => (
              <Grid.Col span={{ base: 12, xs: 6, sm: 4, md: 4, lg: 3 }}>
                <ProductItem2 product={product} key={index} />
              </Grid.Col>
            ))}
          </Grid>
          {/* <Flex justify="center" mt={36}>
            <Button size = 'md' color={"var(--theme-color)"}>Xem Thêm</Button>
          </Flex> */}
        </Box>
        {productCount < products?.total && (
          <Flex justify="center" mt={36}>
            <Button
              color={"var(--theme-color)"}
              onClick={() => setProductCount(productCount + 5)}
              disabled={isFetching}
            >
              Xem Thêm
            </Button>
          </Flex>
        )}
      </Body.Content>
    </Body>
  );
}
