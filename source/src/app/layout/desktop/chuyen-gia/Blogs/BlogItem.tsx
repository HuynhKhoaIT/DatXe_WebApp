"use client";
import { Box, Card } from "@mantine/core";
import styles from "./BlogItem.module.scss";
import Link from "next/link";
import ImageField from "@/app/components/form/ImageField";
import Typo from "@/app/components/elements/Typo";
const BlogItem = ({ blog }: any) => {
  return (
    <div className={styles.wrapper}>
      <Box w={"100%"}>
        <div className={styles.card}>
          <div>
            <Link href="" style={{ width: "100%" }}>
              <ImageField
                src={blog?.thumbnail ? blog?.thumbnail : null}
                height={"160"}
                radius={8}
              />
            </Link>
          </div>

          <div className={styles.infoCard}>
            <Link href="">
              <Typo
                size="sub"
                type="bold"
                style={{ color: "var(--title-color)" }}
                className={styles.productName}
              >
                {blog.title}
              </Typo>
            </Link>
            <Typo
              size="primary"
              style={{ color: "var(--title-color)" }}
              className={styles.shortDescription}
            >
              {blog.shortDescription}
            </Typo>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default BlogItem;
