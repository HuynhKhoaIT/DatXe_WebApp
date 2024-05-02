"use client";
import React from "react";
import { BackgroundImage, Image } from "@mantine/core";
import Slider, { Settings } from "react-slick";
import image from "@/assets/images/carousel1.png";

const Hero = ({ slideshowData, height = 220 }: any) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div
      className="carousel_landing"
      style={{
        backgroundColor: "var(--background-color-light)",
      }}
    >
      <Slider {...settings}>
        {slideshowData?.data?.map((item: any) => {
          return (
            <Image
              src={item?.banners ? item?.banners : image}
              // h={height}
              // width={'100% + 30px'}

              fit="cover"
              onClick={() => item?.url && window.open(`${item?.url}`)}
              // className={styles.img}
            ></Image>
            // <BackgroundImage
            //   style={{ cursor: "pointer" }}
            //   src={item?.banners ? item?.banners : image}
            //   h={height}
            //   onClick={() => item?.url && window.open(`${item?.url}`)}
            // ></BackgroundImage>
          );
        })}
      </Slider>
    </div>
  );
};

export default Hero;
