"use client";
import Container from "@/app/components/common/Container";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import styles from "./CategoryDetailPage.module.scss";
import Products from "./Products";
import bgLanding2 from "@/assets/images/bgLanding2.png";
import ViewedProducts from "./viewedProducts";
import Blogs from "./Blogs";
import Hero from "../trang-chu/Hero";
import Reassons from "../trang-chu/Reasons";
import Filter from "./Filter";
import ButtonShowMore from "@/app/components/form/ButtonShowMore";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
import FillterList from "@/app/components/elements/Filter";
import FillterCompoent from "@/app/components/elements/Filter";

const CategoryDetailPageMobile = ({
  kindProduct,
  slideshowData,
  products,
  productRelate,
  blogs,
  reassons,
  searchParams,
}: any) => {
  return (
    <div className={styles.wrapper}>
      <Hero slideshowData={slideshowData} height={135} />
      <FillterCompoent />

      <Filter kindProduct={kindProduct} />
      <Container>
        <Products products={products?.data} />
        {products?.currentPage < products?.totalPage && (
          <ButtonShowMore
            limitCurrent={searchParams?.limit || DEFAULT_SIZE_LIMIT}
            defaultValue={DEFAULT_SIZE_LIMIT}
          />
        )}
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
export default CategoryDetailPageMobile;
