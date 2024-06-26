"use client";
import { IProduct } from "@/interfaces/product";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import SlickCarousel from "@/app/components/common/SlickCarousell";
export default function ProductSuggestions({ data }: any) {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Gợi ý sản phẩm liên quan"
      linkToList={"/danh-sach-san-pham?isProduct=true"}
      id="productSuggestions"
    >
      <SlickCarousel column={4} gap={8} dots={true}>
        {data?.map((product: IProduct, index: number) => (
          <ProductItem2 product={product} key={index} />
        ))}
      </SlickCarousel>
    </OverviewPanel>
  );
}
