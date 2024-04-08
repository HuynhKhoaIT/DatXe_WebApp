import Container from "@/app/components/common/Container";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ProductDetail from "./ProductDetail/ProductDetail";
import ProductTabsDes from "./ProductDetail/ProductTabsDes";
import ExpertBox from "./ExpertBox";
import ImagesShowRoom from "./ImagesShowRoom";
import ProductsRelate from "./ProductRelate";
import styles from "./ProductDetailPage.module.scss";
import { Flex } from "@mantine/core";
import { Suspense } from "react";
import { LoadingComponent } from "@/app/components/loading";
const Breadcrumbs = [
  { title: "Trang Chủ", href: "../" },
  { title: "Danh sách sản phẩm", href: "/san-pham" },
  { title: "Chi tiết sản phẩm" },
];
const ProductDetailPageDesktop = async ({
  product,
  productRelate,
  productReview,
}: any) => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <Breadcrumb breadcrumbs={Breadcrumbs} />
        <Flex direction={"column"} gap={40}>
          <Suspense fallback={<LoadingComponent />}>
            <ProductDetail ProductDetail={product?.product} />
          </Suspense>
          <ProductTabsDes
            ProductDetail={product?.product}
            productReview={productReview}
          />
          <ExpertBox ProductDetail={product?.product} />
          <ImagesShowRoom />
          <ProductsRelate productRelate={productRelate} />
          <div></div>
        </Flex>
      </Container>
    </div>
  );
};
export default ProductDetailPageDesktop;
