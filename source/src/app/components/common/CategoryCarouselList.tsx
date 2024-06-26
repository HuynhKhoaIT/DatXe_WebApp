import React from "react";
import { Box, LoadingOverlay } from "@mantine/core";
import Scroll from "./Scroll";
import styles from "./CategoryCarouselList.module.scss";
import { CardCategory } from "@/app/layout/desktop/trang-chu/Category/CardCategory";
const CategoryCarouselList = ({
  categories,
  shadow = false,
  loading,
  garageId,
}: any) => {
  return (
    <Box className="slick-mobile" mb={10}>
      <div className={styles.container}>
        <Scroll>
          {categories?.map((item: any) => {
            return (
              <CardCategory
                key={item?.id}
                category={item}
                garageId={garageId}
              />
            );
          })}
        </Scroll>
      </div>
    </Box>
  );
};

export default CategoryCarouselList;
