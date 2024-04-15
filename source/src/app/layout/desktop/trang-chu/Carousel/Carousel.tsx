import React from "react";
import Carousel from "./CarouselSlider";
const CarouselDesktop = ({ slideshowData, height }: any) => {
  console.log(slideshowData);
  return <Carousel slideshowData={slideshowData?.data} height={height} />;
};

export default CarouselDesktop;
