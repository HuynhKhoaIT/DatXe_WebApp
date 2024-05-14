import React from "react";
import styles from "./index.module.scss";
import { Image } from "@mantine/core";
import { AppConstants } from "@/constants";

const CarouselItem = ({ item, height = 520 }: any) => {
  return (
    <Image
      src={item?.banners && `${AppConstants.contentRootUrl}${item?.banners}`}
      fit="cover"
      onClick={() => item?.url && window.open(`${item?.url}`)}
      className={styles.img}
    ></Image>
  );
};

export default CarouselItem;
