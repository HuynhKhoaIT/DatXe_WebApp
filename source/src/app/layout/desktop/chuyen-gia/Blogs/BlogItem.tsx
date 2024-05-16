"use client";
import { Box, Card } from "@mantine/core";
import styles from "./BlogItem.module.scss";
import Link from "next/link";
import ImageField from "@/app/components/form/ImageField";
import Typo from "@/app/components/elements/Typo";
import { AppConstants } from "@/constants";
import BlogImage1 from "@/assets/images/blog/blog1.png";
import BlogImage2 from "@/assets/images/blog/blog2.png";
import BlogImage3 from "@/assets/images/blog/blog3.png";
const BlogItem = ({ blog }: any) => {
  return (
    <div className={styles.wrapper}>
      <Box w={"100%"}>
        <Link href={`/bai-viet/${blog?.id}`} className={styles.card}>
          <div>
            <ImageField
              src={
                blog?.thumbnail
                  ? `${AppConstants.contentRootUrl}${blog?.thumbnail}`
                  : BlogImage1.src
              }
              height={"160"}
              radius={8}
            />
          </div>

          <div className={styles.infoCard}>
            <Typo
              size="sub"
              type="bold"
              style={{ color: "var(--title-color)" }}
              className={styles.productName}
            >
              {blog.title}
            </Typo>
            <Typo
              size="primary"
              style={{ color: "var(--title-color)" }}
              className={styles.shortDescription}
            >
              {blog.shortDescription}
            </Typo>
          </div>
        </Link>
      </Box>
    </div>
  );
};
export default BlogItem;
