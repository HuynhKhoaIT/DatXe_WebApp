import React from "react";
import styles from "./index.module.scss";
import image from "@/assets/images/carousel1.png";
import { BackgroundImage, Center } from "@mantine/core";
const CarouselItem = ({ item, height = 520 }: any) => {
  return (
    <div className={styles.card}>
      <Center>
        <BackgroundImage
          src={item?.banners ? item?.banners : image}
          h={height}
          style={{ cursor: "pointer" }}
          //   w={"100%"}
          onClick={() => item?.url && window.open(`${item?.url}`)}
        ></BackgroundImage>
      </Center>
    </div>
  );
};

export default CarouselItem;
