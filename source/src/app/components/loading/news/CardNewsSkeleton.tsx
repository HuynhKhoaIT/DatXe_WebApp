import { Card, Flex, Skeleton, Space } from "@mantine/core";
import styles from "./index.module.scss";
import imageDefault from "../../../../../public/assets/images/no_image.png";

export default function CardNewsSkeleton() {
  return (
    <Flex py={20} mt={15} mb={15} w={"100%"} className={styles.item}>
      <img
        src={imageDefault.src}
        alt="Relevant Image"
        className={styles.image}
      />
      <div style={{ marginLeft: 25 }} className={styles.content}>
        <Skeleton h={20} />
      </div>
    </Flex>
  );
}
