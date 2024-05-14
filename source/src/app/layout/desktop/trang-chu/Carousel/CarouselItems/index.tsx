import React from "react";
import styles from "./index.module.scss";
import image from "@/assets/images/carousel1.png";
import { BackgroundImage, Center, Image } from "@mantine/core";
import { AppConstants } from "@/constants";
import imageDefault from "../../../../../../../public/assets/images/no_image.png";

const CarouselItem = ({ item, height = 520 }: any) => {
  return (
    // <div className={styles.card}>
    //   <Center>
    //     <BackgroundImage
    //       src={item?.banners ? item?.banners : image}
    //       h={height}
    //       style={{ cursor: "pointer" }}
    //       //   w={"100%"}
    //       onClick={() => item?.url && window.open(`${item?.url}`)}
    //     ></BackgroundImage>
    //   </Center>
    // </div>
    <Image
      src={item?.banners && `${AppConstants.contentRootUrl}${item?.banners}`}
      fit="cover"
      // fallbackSrc={imageDefault.src}
      onClick={() => item?.url && window.open(`${item?.url}`)}
      className={styles.img}
    ></Image>
  );
};

export default CarouselItem;
