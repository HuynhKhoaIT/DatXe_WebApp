"use client";
import Link from "next/link";
import { IProduct } from "@/interfaces/product";
import { Card, Image, Badge, Group, Flex, Box } from "@mantine/core";
import styles from "./ProductItem.module.scss";
import Typo from "../Typo";
import ImageField from "../../form/ImageField";
import Star from "@/assets/icons/star.svg";
import { AppConstants } from "@/constants";
export default function ProductItem({ product }: { product: any }) {
  const images = JSON?.parse(product.images);
  let totalStars;
  if (product?.reviews?.length > 0) {
    totalStars = product?.reviews.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue.star,
      0
    );
    totalStars = totalStars / product?.reviews?.length;
  }

  return (
    <Box w={"100%"}>
      <Card shadow="sm" radius="md">
        <Card.Section>
          <Link href={`/san-pham/${product.id}`} style={{ width: "100%" }}>
            <ImageField
              src={images && `${AppConstants.contentRootUrl}${images[0]}`}
              height={160}
            />
          </Link>
        </Card.Section>

        <div className={styles.infoCard}>
          <Link href={`/san-pham/${product.id}`}>
            <Typo size="primary" className={styles.productName}>
              {product.name}
            </Typo>
          </Link>
          <Typo size="tiny" className={styles.address}>
            {product?.garage?.province?.name}
          </Typo>
          {product?.salePrice !== product?.price && (
            <Badge variant="light" classNames={{ root: styles.productOnSale }}>
              On Sale
            </Badge>
          )}
        </div>

        <Flex gap={10}>
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
        </Flex>
      </Card>
    </Box>
  );
}
