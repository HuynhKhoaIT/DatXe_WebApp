"use client";
import image1 from "@/assets/images/bannerExpert.png";
import image2 from "@/assets/images/banner.png";
import Container from "@/app/components/common/Container";
import CarouselDesktop from "../../desktop/trang-chu/Carousel/Carousel";
import Category from "../../desktop/trang-chu/Category/Category";
import CategoryCarouselList from "@/app/components/common/CategoryCarouselList";
import Hero from "./Hero";
import Reassons from "./Reasons";
import ProductSuggestions from "./ProductSuggestions";
import ServicesHot from "./ServicesHot";
import Advertisement from "../../desktop/trang-chu/Advertisement";
import ProductsHot from "./ProductsHot";
import Blogs from "./Blogs";
import Book from "./Book";
import { useNewsList } from "@/app/hooks/news/useNews";

const LandingPageMobile = ({
  categories,
  reassons,
  servicesHot,
  productsRelate,
  productsHot,
  slideData,
}: any) => {
  const slideshowData = [
    {
      id: "1",
      image: image2.src,
    },
    {
      id: "2",
      image: image1.src,
    },
  ];
  const { data: blogs, isLoading } = useNewsList(10);

  return (
    <div>
      <Hero slideshowData={slideData} />
      <Book />
      <div
        style={{
          padding: "340px 0 30px 0",
          backgroundColor: "var(--background-color-light)",
        }}
      >
        <CategoryCarouselList categories={categories} />
      </div>
      <div style={{ backgroundColor: "var(--background-color-light)" }}>
        <Advertisement />
      </div>
      <Blogs blogs={blogs?.data} />
      <ProductsHot data={productsHot?.data} />
      <ServicesHot data={servicesHot?.data} />
      {/* <ProductSuggestions data={productsRelate?.data} /> */}
      <Reassons data={reassons} />
    </div>
  );
};

export default LandingPageMobile;
