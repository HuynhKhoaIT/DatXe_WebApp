import React from "react";
import Carousel from "./CarouselSlider";
const CarouselDesktop = ({ slideshowData, height }: any) => {
  return <Carousel slideshowData={slideshowData?.data} height={height} />;
};

export default CarouselDesktop;
