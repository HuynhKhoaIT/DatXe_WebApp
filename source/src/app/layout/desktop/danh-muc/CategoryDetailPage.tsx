"use client";
import Container from "@/app/components/common/Container";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import styles from "./CategoryDetailPage.module.scss";
import CarouselDesktop from "../trang-chu/Carousel/Carousel";
import Products from "./Products";
import Reassons from "../trang-chu/Reasons/Reasons";
import bgLanding2 from "@/assets/images/bgLanding2.png";
import ViewedProducts from "./viewedProducts";
import Blogs from "./Blogs";
import { useCategories } from "@/app/admin/(admin)/hooks/category/useCategory";
import { Box } from "@mantine/core";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import { IProduct } from "@/interfaces/product";
import ButtonShowMore from "@/app/components/form/ButtonShowMore";
import { DEFAULT_SIZE_LIMIT } from "@/constants";

const CategoryDetailPageDesktop = ({
  kindProduct,
  slideshowData,
  products,
  productRelate,
  blogs,
  reassons,
  searchParams,
}: any) => {
  console.log(productRelate);
  return (
    <div className={styles.wrapper}>
      <CarouselDesktop height={320} slideshowData={slideshowData} />

      <Container className={styles.container}>
        <div className={styles.fillter}>
          {/* <FilterRadio
            data={categories}
            filterName="Danh mục"
            keyName="cat_id"
          /> */}
          <FilterRadio
            data={kindProduct}
            filterName="Loại"
            keyName="isProduct"
          />
        </div>

        <div className={styles.body}>
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
        </div>
      </Container>
      <Blogs blogs={blogs} />
      <ViewedProducts viewedProducts={productRelate?.data} />
      <div
        className={styles.productsBox}
        style={{
          backgroundImage: `url(${bgLanding2.src})`,
          backgroundSize: "cover",
        }}
      >
        <Reassons data={reassons} />
      </div>
    </div>
  );
};
export default CategoryDetailPageDesktop;
