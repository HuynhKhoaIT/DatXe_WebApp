"use client";
import { IProduct } from "@/interfaces/product";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Grid, Modal, Button, Group, Skeleton, Flex } from "@mantine/core";
import styles from "./Product.module.scss";
import ProductSlider from "./ProductSlider";
import Typo from "@/app/components/elements/Typo";
import Star from "@/assets/icons/star.svg";
import Book from "@/assets/icons/book.svg";
import dynamic from "next/dynamic";

const DynamicModalShare = dynamic(
  () => import("@/app/components/common/ModalShare/BasicSocialShare"),
  {
    ssr: false,
  }
);
import { IconBan, IconChevronRight, IconShare3 } from "@tabler/icons-react";
import ImageField from "@/app/components/form/ImageField";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/app/Context/store";
import { storageKeys } from "@/constants";
import { getData, setData } from "@/utils/until/localStorage";
function ProductDetail({ ProductDetail, productReview }: any) {
  const { data: session } = useSession();
  const { cart, setCart } = useGlobalContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [
    openedModalShare,
    { open: openModalShare, close: closeModalShare },
  ] = useDisclosure(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const existingCartItems = JSON.parse("[]");
    existingCartItems.push({
      productId: ProductDetail?.id,
      quantity: 1,
      price: ProductDetail?.price,
      priceSale: ProductDetail?.salePrice,
      images: ProductDetail?.images,
      name: ProductDetail?.name,
      garageId: ProductDetail.garageId,
      saleValue: 0,
      subTotal: ProductDetail?.salePrice,
    });
    setData(storageKeys.CART_DATA, existingCartItems);
    toast.success((t) => (
      <Link href={"/gio-hang"}>Sản phẩm được thêm vào giỏ hàng</Link>
    ));
    setCart(1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addProductToLocalStorage = () => {
    if (ProductDetail && session?.user) {
      const productId = ProductDetail.id;
      const garageId = ProductDetail.garageId;
      // const existingCartItems = JSON.parse(
      //   localStorage.getItem("cartData") || "[]"
      // );
      const existingCartItems = getData(storageKeys.CART_DATA) ?? [];

      const index = existingCartItems.findIndex(
        (item: any) => item.productId === productId
      );
      const idCar = existingCartItems.findIndex(
        (item: any) => item.garageId === garageId
      );

      if (existingCartItems.length > 0 && idCar === -1) {
        showModal();
      } else {
        if (index !== -1) {
          existingCartItems[index].quantity += 1;
          existingCartItems[index].subTotal =
            existingCartItems[index].quantity *
            existingCartItems[index].priceSale;
        } else {
          existingCartItems.push({
            productId: ProductDetail?.id,
            price: ProductDetail?.price,
            priceSale: ProductDetail?.salePrice,
            saleValue: 0,
            images: ProductDetail?.images,
            name: ProductDetail?.name,
            garageId: ProductDetail.garageId,
            quantity: 1,
            subTotal: ProductDetail?.salePrice,
          });
        }
        setCart(existingCartItems?.length);
        setData(storageKeys.CART_DATA, existingCartItems);
        toast.success((t) => (
          <Link href={"/gio-hang"}>Sản phẩm được thêm vào giỏ hàng</Link>
        ));
      }
    } else {
      signIn();
    }
  };

  let totalStars;
  if (productReview?.data?.length > 0) {
    totalStars = productReview?.data.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue.star,
      0
    );
    totalStars = totalStars / productReview?.data?.length;
  }

  return (
    <Grid>
      <Grid.Col span={12}>
        <Grid
          className={styles.productDetail}
          gutter={22}
          style={{
            marginLeft: "0px",
            marginRight: "0px",
          }}
        >
          <Grid.Col span={5}>
            {ProductDetail?.images ? (
              <ProductSlider images={JSON?.parse(ProductDetail?.images)} />
            ) : (
              <ImageField radius={10} />
            )}
          </Grid.Col>
          <Grid.Col span={5}>
            <div className={styles.info}>
              <Typo
                type="bold"
                size="big"
                style={{ marginBottom: 15, color: "var(--text-color)" }}
              >
                {ProductDetail?.name}
              </Typo>
              <Typo style={{ fontSize: "1rem", color: "var(--text-color)" }}>
                {ProductDetail?.code}
              </Typo>
              <div className={styles.category}>
                <Flex align="center">
                  {ProductDetail?.categories?.map(
                    (item: any, index: number) => {
                      return (
                        <div key={index} style={{ display: "flex" }}>
                          <Typo
                            style={{
                              fontSize: "1rem",
                              color: "var(--nav-color)",
                            }}
                          >
                            {item?.category?.title}
                          </Typo>
                          {index >= 0 &&
                            index < ProductDetail?.categories?.length - 1 && (
                              <>, </>
                            )}
                        </div>
                      );
                    }
                  )}
                </Flex>
                <div className={styles.starBox}>
                  <img src={Star.src} style={{ width: 20, height: 20 }} />
                  <Typo style={{ fontSize: "14px", color: "var(--nav-color)" }}>
                    {totalStars} ({productReview?.data?.length || 0} reviews)
                  </Typo>
                </div>
              </div>
              {ProductDetail?.sku ? (
                <div>
                  <span>SKU: {ProductDetail?.sku}</span>
                </div>
              ) : (
                <></>
              )}
              <div className={styles.salePrice}>
                {ProductDetail?.price != ProductDetail?.salePrice && (
                  <Typo
                    style={{
                      fontSize: "22px",
                      color: "var(--title-color-2)",
                    }}
                    type="bold"
                  >
                    <del>{ProductDetail?.price?.toLocaleString()} đ</del>
                  </Typo>
                )}

                {/* <Typo
                  style={{
                    fontSize: "14px",
                    color: "var(--text-color-sale-price)",
                  }}
                >
                  30% OFF
                </Typo> */}
              </div>

              <Typo
                type="bold"
                style={{ fontSize: "22px", color: "var(--blue-color)" }}
              >
                {ProductDetail?.salePrice?.toLocaleString()} đ
              </Typo>

              <Flex gap={10}>
                <Button
                  // size="lg"
                  // radius={0}
                  mt={22}
                  color={"var(--primary-color)"}
                  leftSection={<img src={Book.src} />}
                  onClick={addProductToLocalStorage}
                >
                  Đặt lịch
                </Button>
                <Button
                  // size="lg"
                  // radius={0}
                  leftSection={<IconShare3 />}
                  mt={22}
                  variant="outline"
                  color={"gray"}
                  onClick={openModalShare}
                >
                  Chia sẻ
                </Button>
              </Flex>
              <div className={styles.boxText}>
                Đặt lịch trước không chờ đợi, an toàn, cộng điểm
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Modal title="Thông báo" opened={isModalOpen} onClose={handleCancel}>
        <div>
          Bạn đang đặt hàng với 2 chuyên gia khác nhau? Bạn có muốn xóa giỏ hàng
          để thêm sản phẩm mới?
        </div>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            // size="lg"
            // radius={0}
            // h={{ base: 42, md: 50, lg: 50 }}
            variant="outline"
            key="cancel"
            onClick={handleCancel}
            color="red"
            leftSection={<IconBan size={12} />}
          >
            Huỷ bỏ
          </Button>
          <Button
            // size="lg"
            // radius={0}
            // h={{ base: 42, md: 50, lg: 50 }}
            style={{ marginLeft: "12px" }}
            onClick={handleOk}
            variant="filled"
            color="blue"
            leftSection={<IconChevronRight size={12} />}
          >
            Tiếp tục
          </Button>
        </Group>
      </Modal>
      <DynamicModalShare opened={openedModalShare} close={closeModalShare} />
    </Grid>
  );
}

export default ProductDetail;
