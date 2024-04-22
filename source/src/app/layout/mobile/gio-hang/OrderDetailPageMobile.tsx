"use client";
import React from "react";
import { Button, Container, Divider, Flex, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import styles from "./OrderDetailPage.module.scss";
import ImageField from "@/app/components/form/ImageField";
import ImageDefaul from "@/assets/images/logo.png";
import Typo from "@/app/components/elements/Typo";
import classNames from "classnames";
import dayjs from "dayjs";
import TableBasic from "@/app/components/table/Tablebasic";
import ReactToPrint from "react-to-print";
import ReactPrint from "@/app/components/common/ReactToPrint";

const DynamicModalReview = dynamic(() => import("./ModalReview"), {
  ssr: false,
});
export default function OrderDetailPageMobile({ dataSource }: any) {
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên sản phẩm
        </span>
      ),
      name: "product",
      dataIndex: ["product", "name"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá</span>
      ),
      name: "priceSale",
      dataIndex: ["priceSale"],
      render: (dataRow: any) => {
        return <span>{dataRow.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Số lượng</span>
      ),
      name: "quantity",
      dataIndex: ["quantity"],
      textAlign: "center",
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Thành tiền
        </span>
      ),
      name: "subTotal",
      dataIndex: [],
      render: (dataRow: any) => {
        return (
          <span>
            {(dataRow?.priceSale * dataRow?.quantity).toLocaleString()}đ
          </span>
        );
      },
    },
  ];
  return (
    <ReactPrint>
      <Container className="printable">
        <div className={styles.wrapper}>
          <div className={styles.infoGara}>
            <ImageField
              src={dataSource?.garage?.logo}
              width={120}
              height={120}
              radius={8}
            />
            <div>
              <Typo type="bold">{dataSource?.garage?.shortName}</Typo>
              <Typo size="primary">Địa chỉ: {dataSource?.garage?.address}</Typo>
              <Typo size="primary">
                phone: {dataSource?.garage?.phoneNumber}
              </Typo>
            </div>
          </div>
          <Divider
            my={"lg"}
            mx={"lg"}
            color="black"
            size={1.5}
            variant="dashed"
          />

          <div className={styles.box}>
            <div className={styles.title}>
              <span>Chi tiết đơn hàng</span>
            </div>
            <Flex px={40} w={"100%"} justify={"space-between"}>
              <Typo size="mall">
                {dayjs(dataSource?.dateTime).format("HH:mm DD:MM:YY")}
              </Typo>
              <Typo size="mall">Số:{dataSource?.code}</Typo>
            </Flex>
          </div>
          <div className={styles.infoCustomer}>
            <div style={{ display: "flex", gap: "6px" }}>
              KH:
              <Typo size="primary">{dataSource?.customer?.fullName}</Typo>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              ĐT:
              <Typo size="primary">{dataSource?.customer?.phoneNumber}</Typo>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              XE:
              <Typo size="primary">{dataSource?.car?.numberPlates}</Typo>
            </div>
          </div>
          <Divider
            my={"lg"}
            mx={"lg"}
            color="black"
            size={1.5}
            variant="dashed"
          />
          <div style={{ marginTop: "20px" }}></div>
          <TableBasic
            loading={false}
            columns={columns}
            data={dataSource?.orderDetails}
          />
          <Divider my={"lg"} color="black" size={1} variant="dashed" />
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>Tiền hàng: </p>
            <p>{dataSource?.subTotal?.toLocaleString()}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>VAT: </p>
            <p>0</p>
          </div>
          <Divider my={"lg"} color="black" size={1} variant="dashed" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>Tổng cộng: </p>
            <p>{dataSource?.total?.toLocaleString()}</p>
          </div>
          <div className={styles.infoWifi}>
            <ImageField
              src={dataSource?.garage?.qrCodeBank}
              width={150}
              height={150}
            />
            <p>Wifi:{dataSource?.garage?.wifiInfo}</p>
          </div>
          <div className={styles.titleThanks}>
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
          </div>
        </div>
        {openedModal && (
          <DynamicModalReview
            openedModal={openedModal}
            onCloseModal={closeModal}
            title="Đánh giá sản phẩm"
            onCancelModal={closeModal}
            dataDetail={dataSource}
          />
        )}
      </Container>
    </ReactPrint>
  );
}
