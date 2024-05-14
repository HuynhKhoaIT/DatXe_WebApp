"use client";
import Link from "next/link";
import { Card, Image, Badge, Group, Flex, Box } from "@mantine/core";
import styles from "./ProductItem.module.scss";
import Typo from "../Typo";
import ImageField from "../../form/ImageField";
import Star from "@/assets/icons/star.svg";
import { AppConstants } from "@/constants";

export default function ProductItem2({
  product,
}: {
  key: number;
  product: any;
}) {
  let totalStars;
  if (product?.reviews?.length > 0) {
    totalStars = product?.reviews.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue.star,
      0
    );
    totalStars = totalStars / product?.reviews?.length;
  }
  const images = JSON.parse(product.images);

  return (
    <Box w={"100%"}>
      <Card shadow="sm" radius="md" mb={5}>
        <Card.Section>
          <Link href={`/san-pham/${product.id}`} style={{ width: "100%" }}>
            <ImageField
              src={images && `${AppConstants.contentRootUrl}${images[0]}`}
              height={160}
            />
          </Link>
        </Card.Section>

        <div className={styles.infoCard2}>
          <Link href={`/san-pham/${product.id}`}>
            <Typo
              size="primary"
              type="semi-bold"
              className={styles.productName}
            >
              {product.name}
            </Typo>
          </Link>
          {product?.reviews?.length > 0 && (
            <div className={styles.star}>
              <img src={Star.src} alt="start" />
              <Typo
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "1rem",
                  color: "var(--title-color-sub)",
                }}
              >
                {totalStars?.toFixed(2)}
              </Typo>
            </div>
          )}
          {product?.salePrice !== product?.price && (
            <Badge variant="light" classNames={{ root: styles.productOnSale }}>
              On Sale
            </Badge>
          )}
        </div>

        <Flex gap={10} mt={6} align={"center"}>
          {product?.salePrice !== product?.price && (
            <del>
              <Typo
                size="sub"
                type="big"
                style={{ color: "var(--title-color-2)" }}
              >
                {product?.price?.toLocaleString()}đ{" "}
              </Typo>
            </del>
          )}
          <Typo size="sub" type="big" style={{ color: "var(--blue-color)" }}>
            {product?.salePrice?.toLocaleString()}đ{" "}
          </Typo>
          {/* <div className={styles.iconBox}>
            <div className={styles.heart}>
              <img src={Heart.src} className={styles.icon} />
            </div>
            <div className={styles.cart}>
              <img src={Cart.src} className={styles.icon} />
            </div>
          </div> */}
        </Flex>
        {/* <div className={styles.point}>
          <img src={Point.src} className={styles.bgPoint} />
          <div className={styles.pointValue}>
            <span className={styles.value}>+50</span>
            <span className={styles.pointText}>Điểm</span>
          </div>
        </div> */}
      </Card>
    </Box>
  );
}
