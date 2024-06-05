"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Grid,
  Modal,
  Button,
  Group,
  TextInput,
  Card,
  Box,
} from "@mantine/core";
import { IconBan, IconChevronRight } from "@tabler/icons-react";
import InfoCar from "./_component/InfoCar";
import InfoCart from "./_component/InfoCart";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import Container from "../components/common/Container";
import styles from "./index.module.scss";
import { modals } from "@mantine/modals";
import Typo from "../components/elements/Typo";
import { DateTimePicker } from "@mantine/dates";
import dynamic from "next/dynamic";
import { useCars } from "../dashboard/hooks/car/useCar";
import { useDisclosure } from "@mantine/hooks";
import Empty from "@/assets/images/empty-box.png";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/app/Context/store";
import { getData, removeItem, setData } from "@/utils/until/localStorage";
import { storageKeys } from "@/constants";
export default function CartComponent({ myAccount }: any) {
  const { setCart } = useGlobalContext();

  const { cars, isLoading, isFetching, refetch } = useCars();
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (!cars) return;
    const carDefault = cars?.data?.find((item: any) => item?.isDefault);
    if (carDefault) {
      setValue(carDefault?.numberPlates);
      form.setFieldValue("carBrandId", carDefault?.brandName?.id);
      form.setFieldValue("carNameId", carDefault?.modelName?.id);
      form.setFieldValue("carYearId", carDefault?.yearName?.id);
      form.setFieldValue("carBrandName", carDefault?.brandName?.title);
      form.setFieldValue("carModelName", carDefault?.modelName?.title);
      form.setFieldValue("carYear", carDefault?.yearName?.title);
      form.setFieldValue("numberPlates", carDefault?.numberPlates);
      form.setFieldValue("carId", carDefault?.id);
    }
  }, [cars]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState<any>();
  const [cartData, setCartData] = useState<any>([]);
  const handleDeleteOk = () => {
    setIsModalDeleteOpen(false);
    deleteItem(deleteRow?.productId);
  };

  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };
  const handleOpenModalDelete = (record: any) => {
    setIsModalDeleteOpen(true);
    setDeleteRow(record);
  };

  const incrementQuantity = (idProduct: number) => {
    const updateCartData = cartData.map((item: any) => {
      if (item.productId === idProduct) {
        item.quantity += 1;
        item.subTotal = item.priceSale * item.quantity;
      }
      return item;
    });
    setData(storageKeys.CART_DATA, updateCartData);
    setCartData(updateCartData);
  };
  // giảm số lượng sản phẩm
  const decrementQuantity = (idProduct: number) => {
    const updateCartData = cartData.reduce((updatedCart: any[], item: any) => {
      if (item.productId === idProduct) {
        if (item.quantity === 1) {
          deleteItem(idProduct);
          return updatedCart;
        } else if (item.quantity > 1) {
          item.quantity -= 1;
          item.subTotal -= item.price;
        }
      }
      updatedCart.push(item);
      return updatedCart;
    }, []);

    console.log(updateCartData);
    setData(storageKeys.CART_DATA, updateCartData);
    setCartData(updateCartData);
  };

  // Tính tổng tiền
  const calculateSubTotal = () => {
    let subTotal = 0;
    cartData?.forEach((item: any) => {
      subTotal += item.priceSale * item.quantity;
    });
    return subTotal;
  };
  // Xóa sản phẩm ra khỏi giỏ hàng
  const deleteItem = (idProduct: any) => {
    const updatedCartData = cartData.filter(
      (item: any) => item?.productId !== idProduct
    );
    setData(storageKeys.CART_DATA, updatedCartData);
    setCart(updatedCartData?.length);
    setCartData(updatedCartData);
  };
  useEffect(() => {
    const existingCartData = getData(storageKeys.CART_DATA);
    if (existingCartData) {
      setCartData(existingCartData);
    }
  }, []);

  const form = useForm({
    initialValues: {
      fullName: myAccount?.name || "",
      phoneNumber: myAccount?.phone || "",
      address: myAccount?.address || "",
      carId: null,
      carYearId: "",
      carNameId: "",
      carBrandId: "",
      numberPlates: "",
      detail: cartData,
      subTotal: 0,
    },
    validate: {},
  });

  useEffect(() => {
    form.setFieldValue("detail", cartData);
  }, [cartData]);

  const ModalAcceptOrder = () => {
    var dateTime = new Date();
    modals.openConfirmModal({
      title: (
        <Typo
          size="primary"
          type="bold"
          // style={{ color: "var(--primary-color)" }}
        >
          Xác nhận thời gian
        </Typo>
      ),
      children: (
        <DateTimePicker
          size="md"
          // label="Thời gian"
          defaultValue={dateTime}
          placeholder="Chọn thời gian "
          locale="vi"
          onChange={(value) => {
            if (value) {
              dateTime = value;
            }
          }}
        />
      ),
      size: "500px",
      // centered: true,
      withCloseButton: false,
      labels: { confirm: "Tiếp tục", cancel: "Hủy" },
      onConfirm: () => {
        form.setFieldValue("dateTime", dateTime);
        handleSubmit(form.values, dateTime);
      },
    });
  };
  const handleSubmit = async (values: any, dateTime: Date) => {
    if (cartData?.length == 0) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng");
      return;
    }
    setLoading(true);
    values.dateTime = dateTime;
    values.subTotal = calculateSubTotal();
    values.total = calculateSubTotal();
    values.userId = myAccount.id;
    try {
      const res = await fetch(`/api/orders`, {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data?.order) {
        toast.error("Đặt hàng thất bại: " + (data?.error || "Unknown error"));
      } else {
        toast.success("Đặt hàng thành công");

        // const sms = await fetch(`/api/orders/sendSMS`, {
        //   method: "POST",
        //   body: JSON.stringify(data?.order),
        // });
        // localStorage.setItem("cartData", JSON.stringify([]));
        removeItem(storageKeys.CART_DATA);
        setCart(0);
        router.push(`/order/${data?.order?.slug}`);
      }
    } catch (error) {
      console.error("Error during API call:", error);

      toast.error("Đã xảy ra lỗi trong quá trình xử lý yêu cầu");
    } finally {
      setLoading(false);
    }
  };

  if (cartData?.length == 0) {
    return (
      <div className={styles.emptyData}>
        <img src={Empty.src} />
        <h3>Giỏ hàng trống, vui lòng thêm sản phẩm vào giỏ hàng</h3>
      </div>
    );
  }
  return (
    <>
      <form>
        <div className="shop-cart ">
          <Container>
            <Grid gutter={16}>
              <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
                <div className="checkout-widget">
                  <div className={styles.titleCard}>
                    <h4 className={styles.title}>Thông tin khách hàng</h4>
                  </div>
                  <Card>
                    <Grid gutter={16}>
                      <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
                        <TextInput
                          size="lg"
                          radius={0}
                          {...form.getInputProps("fullName")}
                          label="Họ Tên"
                          placeholder="Họ Tên"
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
                        <TextInput
                          size="lg"
                          radius={0}
                          {...form.getInputProps("phoneNumber")}
                          label="Điện thoại"
                          placeholder="Điện thoại"
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <TextInput
                          size="lg"
                          radius={0}
                          {...form.getInputProps("address")}
                          label="Địa chỉ"
                          type="text"
                          placeholder="Địa chỉ"
                        />
                      </Grid.Col>
                    </Grid>
                  </Card>
                </div>
              </Grid.Col>
              <InfoCar
                myAccount={myAccount}
                form={form}
                cars={cars}
                isLoading={isLoading}
                isFetching={isFetching}
                openModal={openModal}
                value={value}
                setValue={setValue}
                // carDetail={carDetail}
                // setCarDetail={setCarDetail}
              />
            </Grid>
            {/* <InfoDate setDate={setDate} setTime={setTime} /> */}
            <InfoCart
              loading={loading}
              calculateSubTotal={calculateSubTotal}
              cartData={cartData}
              decrementQuantity={decrementQuantity}
              handleOpenModalDelete={handleOpenModalDelete}
              incrementQuantity={incrementQuantity}
              form={form}
              ModalAcceptOrder={ModalAcceptOrder}
            />
          </Container>
        </div>
      </form>
      <DynamicModalAddCar
        openModal={openedModal}
        close={closeModal}
        myAccount={myAccount}
        formData={form}
        refetch={refetch}
        setValue={setValue}
      />
      <Modal
        title="Delete"
        opened={isModalDeleteOpen}
        onClose={handleDeleteCancel}
        lockScroll={false}
      >
        <div>Bạn có muốn xoá không?</div>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            variant="outline"
            key="cancel"
            onClick={handleDeleteCancel}
            color="red"
            leftSection={<IconBan size={16} />}
          >
            Huỷ bỏ
          </Button>
          <Button
            size="lg"
            h={{ base: 42, md: 50, lg: 50 }}
            radius={0}
            style={{ marginLeft: "12px" }}
            onClick={handleDeleteOk}
            variant="filled"
            leftSection={<IconChevronRight size={16} />}
          >
            Tiếp tục
          </Button>
        </Group>
      </Modal>
    </>
  );
}
const DynamicModalAddCar = dynamic(() => import("./_component/ModalAddCar"), {
  ssr: false,
});
