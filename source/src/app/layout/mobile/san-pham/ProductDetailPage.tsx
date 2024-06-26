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
  { title: "Danh sách sản phẩm", href: "/danh-sach-san-pham" },
  { title: "Sản phẩm" },
];
const ProductDetailPageMobile = async ({
  product,
  productReview,
  productRelate,
  session,
}: any) => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <Breadcrumb breadcrumbs={Breadcrumbs} color={"var(--blue-color)"} />
        <Flex direction={"column"} gap={40}>
          <ProductDetail
            productReview={productReview}
            ProductDetail={product?.product}
            session={session}
          />
          <ProductTabsDes
            ProductDetail={product?.product}
            productReview={productReview}
          />
          <ExpertBox ProductDetail={product?.product} />
          <ImagesShowRoom ProductDetail={product?.product} />
        </Flex>
      </Container>
      <ProductsRelate productRelate={productRelate} />
    </div>
  );
};
export default ProductDetailPageMobile;
