import { Box, Space } from "@mantine/core";
import { IProduct } from "@/interfaces/product";
import Body from "@/app/components/layout/Body";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import { Sort } from "@/app/components/elements/shop-sort";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import styles from "./index.module.scss";
import ButtonShowMore from "@/app/components/form/ButtonShowMore";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
export default function ProductsListPage({
  categories,
  products,
  searchParams,
}: any) {
  console.log(products);
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
        {products?.currentPage < products.totalPage && (
          <ButtonShowMore
            limitCurrent={searchParams?.limit || DEFAULT_SIZE_LIMIT}
            defaultValue={DEFAULT_SIZE_LIMIT}
          />
        )}
      </Body.Content>
    </Body>
  );
}
