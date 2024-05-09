import { Box, Space } from "@mantine/core";
import { FilterRadio } from "../components/elements/filterRadio";
import Body from "../components/layout/Body";
import { IProduct } from "@/interfaces/product";
import { Sort } from "../components/elements/shop-sort";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
import ButtonShowMore from "../components/form/ButtonShowMore";
import ProductItem2 from "../components/elements/product/ProductItem2";
import styles from "./index.module.scss";
export default function ListSearch({
  products,
  searchParams,
  categoryOption,
  kindProduct,
}: any) {
  return (
    <Body>
      <Body.Sider>
        <FilterRadio
          data={categoryOption}
          filterName="Danh mục"
          keyName="categoryId"
        />
        {/* <FilterRadio data={kindProduct} filterName="Loại" keyName="isProduct" /> */}
      </Body.Sider>
      <Body.Content>
        <Sort lengthData={products?.data?.length || 0} />
        <Space h="md" />
        <Box w={"100%"}>
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
        </Box>
      </Body.Content>
    </Body>
  );
}
