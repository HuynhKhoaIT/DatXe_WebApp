"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ImageField from "@/app/components/form/ImageField";
import { AppConstants } from "@/constants";

export default function ProductSlider({ images }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="my-swiper2"
        style={{ height: 380 }}
      >
        {images?.map((image: any, index: number) => {
          return (
            <SwiperSlide style={{ height: 380 }} key={index}>
              <ImageField
                radius={10}
                src={image && `${AppConstants.contentRootUrl}${image}`}
                // style={{ objectFit: "contain" }}
              />
            </SwiperSlide>
          );
        })}
        {!images && (
          <SwiperSlide>
            <ImageField radius={10} src={null} />
          </SwiperSlide>
        )}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="my-swiper"
        style={{ height: 98 }}
      >
        {images?.map((image: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <ImageField
                style={{ height: 98 }}
                radius={10}
                src={image && `${AppConstants.contentRootUrl}${image}`}
              />
            </SwiperSlide>
          );
        })}
        {!images && (
          <SwiperSlide>
            <ImageField radius={10} src={null} />
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
