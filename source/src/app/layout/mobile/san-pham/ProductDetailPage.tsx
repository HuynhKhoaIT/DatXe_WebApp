"use client";
import Container from "@/app/components/common/Container";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ProductDetail from "./ProductDetail/ProductDetail";
import ExpertBox from "./ExpertBox";
import ImagesShowRoom from "./ImagesShowRoom";
import ProductsRelate from "./ProductRelate";
import styles from "./ProductDetailPage.module.scss";
import { Flex } from "@mantine/core";
import ProductTabsDes from "../../desktop/san-pham/ProductDetail/ProductTabsDes";
const Breadcrumbs = [
  { title: "Trang Chủ", href: "../" },
  { title: "Danh sách sản phẩm", href: "/san-pham" },
  { title: "Sản phẩm" },
];
const ProductDetailPageMobile = ({
  product,
  productReview,
  productRelate,
  isLoading,
}: any) => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <Breadcrumb breadcrumbs={Breadcrumbs} />
        <Flex direction={"column"} gap={40}>
          <ProductDetail isLoading={isLoading} ProductDetail={product?.data} />
          <ProductTabsDes
            ProductDetail={product?.data}
            productReview={productReview}
          />
          <ExpertBox ProductDetail={product?.data} />
          <ImagesShowRoom />
          <div></div>
        </Flex>
      </Container>
      <ProductsRelate productRelate={productRelate?.data} />
    </div>
  );
};
export default ProductDetailPageMobile;
