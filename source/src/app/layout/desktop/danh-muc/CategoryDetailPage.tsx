"use client";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import styles from "./CategoryDetailPage.module.scss";
import CarouselDesktop from "../trang-chu/Carousel/Carousel";
import Reassons from "../trang-chu/Reasons/Reasons";
import bgLanding2 from "@/assets/images/bgLanding2.png";
import ViewedProducts from "./viewedProducts";
import Blogs from "./Blogs";
import { Box } from "@mantine/core";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import { IProduct } from "@/interfaces/product";
import ButtonShowMore from "@/app/components/form/ButtonShowMore";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
import Body from "@/app/components/layout/Body";
import FillterList from "@/app/components/elements/Filter";
import { ButtonDeleteFilter } from "@/app/components/elements/ButtonDeleteFilter";
import FillterCompoent from "@/app/components/elements/Filter";
import Container from "@/app/components/common/Container";
import Empty from "@/assets/images/empty-box.png";

const CategoryDetailPageDesktop = ({
  kindProduct,
  slideshowData,
  products,
  productRelate,
  blogs,
  reassons,
  searchParams,
}: any) => {
  console.log(products);
  return (
    <div className={styles.wrapper}>
      <CarouselDesktop height={320} slideshowData={slideshowData} />
      <Body>
        <Body.Sider>
          <FilterRadio
            data={kindProduct}
            filterName="Loại"
            keyName="isProduct"
          />
          <ButtonDeleteFilter />
        </Body.Sider>
        <Body.Content>
          <FillterCompoent isFilterLocation={false} />
          {products?.data?.length == 0 ? (
            <Box w={"100%"}>
              <div className={styles.emptyData}>
                <img src={Empty.src} />
                <h3>Không có kết quả phù hợp.</h3>
              </div>
            </Box>
          ) : (
            <Box w={"100%"}>
              <div className={styles.products}>
                {products?.data?.map((product: IProduct, index: number) => (
                  <ProductItem2 product={product} key={index} />
                ))}
              </div>
              {products?.currentPage < products?.totalPage && (
                <ButtonShowMore
                  limitCurrent={searchParams?.limit || DEFAULT_SIZE_LIMIT}
                  defaultValue={DEFAULT_SIZE_LIMIT}
                />
              )}
            </Box>
          )}
        </Body.Content>
      </Body>
      <Container>
        <Blogs blogs={blogs} />
      </Container>
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
