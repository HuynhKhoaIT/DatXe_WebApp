"use client";
import { Box, Card } from "@mantine/core";
import styles from "./BlogItem.module.scss";
import Link from "next/link";
import ImageField from "@/app/components/form/ImageField";
import Typo from "@/app/components/elements/Typo";
import { fitString, formatTimeDifference } from "@/utils/until";
import { AppConstants } from "@/constants";
const BlogItem = ({ blog }: any) => {
  console.log(blog);
  return (
    <div className={styles.wrapper}>
      <Box w={"100%"}>
        <div className={styles.card}>
          <div>
            <div style={{ width: "100%" }}>
              <ImageField
                src={
                  blog?.thumbnail &&
                  `${AppConstants.contentRootUrl}${blog?.thumbnail}`
                }
                height={160}
                radius={12}
              />
            </div>
          </div>

          <div className={styles.infoCard}>
            <div>
              <Typo
                size="sub"
                type="bold"
                style={{ color: "var(--title-color)" }}
                className={styles.title}
              >
                {blog.title}
              </Typo>
            </div>
            <Typo
              size="tiny"
              style={{ color: "var(--title-color-sub)" }}
              className={styles.description}
            >
              {formatTimeDifference(blog.createdAt)}
              <span style={{ fontWeight: "600" }}>{blog?.expert?.name}</span>
            </Typo>
            <Typo
              size="primary"
              style={{ color: "var(--title-color)" }}
              className={styles.description}
            >
              {fitString(blog.shortDescription, 120)}
            </Typo>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default BlogItem;
