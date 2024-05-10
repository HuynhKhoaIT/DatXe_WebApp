"use client";
import styles from "./index.module.scss";
import bgLanding from "@/assets/images/bgLanding.svg";
import bgLanding2 from "@/assets/images/bgLanding2.png";
import image1 from "@/assets/images/carousel1.png";
import image2 from "@/assets/images/carousel2.jpg";
import CarouselDesktop from "./Carousel/Carousel";
import BookForm from "./Book/BookForm";
import Category from "./Category/Category";
import Container from "@/app/components/common/Container";
import Advertisement from "./Advertisement";
import ServicesHot from "./ServiceHot";
import ProductsHot from "./ProductsHot";
import Blogs from "./Blogs/Blogs";
import ProductSuggestions from "./ProductSuggestions/ProductSuggestions";
import Reassons from "./Reasons/Reasons";
import { useNewsList } from "@/app/hooks/news/useNews";

const LandingPageDesktop = ({
  categories,
  reassons,
  productsRelate,
  servicesHot,
  productsHot,
  slideData,
  advertisement,
}: any) => {
  const { data: blogs, isLoading, isFetching } = useNewsList({
    garageId: 2,
    limit: 4,
  });
  return (
    <div className="bg-white">
      <CarouselDesktop slideshowData={slideData} />
      <BookForm />
      <div className={styles.categoryBox}>
        <Category categories={categories} />
      </div>
      <Container className={styles.AdvertisementBox}>
        <Advertisement advertisement={advertisement?.data} />
      </Container>
      <div className={styles.servicesBox}>
        <ServicesHot data={servicesHot} />
      </div>
      <div
        className={styles.productsBox}
        style={{
          backgroundImage: `url(${bgLanding.src})`,
          backgroundSize: "cover",
        }}
      >
        <ProductsHot data={productsHot} />
      </div>
      <div style={{ backgroundColor: "var(--background-color-light)" }}>
        <Blogs blogs={blogs?.data} isLoading={isLoading || isFetching} />
      </div>
      {/* <ProductSuggestions data={productsRelate?.data} /> */}
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

export default LandingPageDesktop;
