"use client";

import SlickCarousel from "@/app/components/common/SlickCarousell";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import { IProduct } from "@/interfaces/product";
import { useMediaQuery } from "@mantine/hooks";

const ProductsRelate = ({ productRelate }: any) => {
  const isTablet = useMediaQuery(`(max-width: ${"1024px"})`);
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Sản phẩm liên quan"
      linkToList={"/danh-sach-san-pham?isProduct=true"}
      id="productsRelate"
    >
      <SlickCarousel column={isTablet ? 4 : 5} gap={8} dots={true}>
        {productRelate?.map((product: IProduct, index: number) => (
          <ProductItem2 product={product} key={index} />
        ))}
      </SlickCarousel>
    </OverviewPanel>
  );
};
export default ProductsRelate;
