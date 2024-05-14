"use client";
import React from "react";
import { BackgroundImage, Image } from "@mantine/core";
import Slider, { Settings } from "react-slick";
import image from "@/assets/images/carousel1.png";
import { AppConstants } from "@/constants";

const Hero = ({ slideshowData, height = 220 }: any) => {
  const settings: Settings = {
    dots: false,
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
        {slideshowData?.data?.map((item: any, index: number) => {
          return (
            <Image
              key={index}
              src={
                item?.banners &&
                `${AppConstants.contentRootUrl}${item?.banners}`
              }
              fit="cover"
              onClick={() => item?.url && window.open(`${item?.url}`)}
            ></Image>
          );
        })}
      </Slider>
    </div>
  );
};

export default Hero;
