"use client";
import { Button, Flex, Grid, Box, Space, LoadingOverlay } from "@mantine/core";
import { FilterRadio } from "../components/elements/filterRadio";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Body from "../components/layout/Body";
import { IProduct } from "@/interfaces/product";
import ProductItem from "../components/elements/product/ProductItem1";
import { Sort } from "../components/elements/shop-sort";
import { FilterCheckBox } from "../components/elements/filterCheckBox";
import { useSearch } from "../hooks/search/useSearch";
import { kindProduct } from "@/constants/masterData";

export default function ListSearch({ fillter }: any) {
  const [postCount, setPostCount] = useState(5);
  const { data: products, isPending, isFetching } = useSearch(postCount);

  const [categoryFilter, setCategoryFilter] = useState();

  useEffect(() => {
    if (!fillter) return;
    const dataOption = fillter?.data?.map((item: any) => ({
      value: item.id.toString(),
      name: item.title,
    }));
    setCategoryFilter(dataOption);
  }, [fillter]);
  return (
    <Body>
      <Body.Sider>
        <FilterRadio
          data={categoryFilter}
          filterName="Danh mục"
          keyName="categoryId"
        />
        <FilterRadio data={kindProduct} filterName="Loại" keyName="isProduct" />
        {/* <FilterCheckBox
          data={[
            { id: "1", title: "Sản phẩm" },
            { id: "0", title: "Dịch vụ" },
          ]}
          filterName="Loại"
          keyName="isProduct"
        /> */}
      </Body.Sider>
      <Body.Content>
        <Box pos={"relative"}>
          <LoadingOverlay
            visible={isPending}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Sort lengthData={products?.data?.length} />
          <Space h="md" />
          <Box w={"100%"}>
            <Grid pb={20}>
              {products?.data?.map((product: IProduct, index: number) => (
                <Grid.Col
                  key={index}
                  span={{ base: 12, xs: 6, sm: 4, md: 4, lg: 3 }}
                >
                  <ProductItem product={product} />
                </Grid.Col>
              ))}
            </Grid>
            {postCount < products?.total && (
              <Flex justify="center" mt={36}>
                <Button
                  color={"var(--theme-color)"}
                  onClick={() => setPostCount(postCount + 5)}
                  disabled={isFetching}
                >
                  Xem Thêm
                </Button>
              </Flex>
            )}
          </Box>
        </Box>
      </Body.Content>
    </Body>
  );
}
