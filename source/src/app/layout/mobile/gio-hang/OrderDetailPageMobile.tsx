"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useSetState } from "@mantine/hooks";
import dynamic from "next/dynamic";
import styles from "./OrderDetailPage.module.scss";
import ImageField from "@/app/components/form/ImageField";
import Typo from "@/app/components/elements/Typo";
import dayjs from "dayjs";
import TableBasic from "@/app/components/table/Tablebasic";
import { useReactToPrint } from "react-to-print";
import { ORDER_DONE } from "@/constants";
import {
  useOrderDLBD,
  useOrderDLBDDetail,
} from "@/app/admin/(admin)/hooks/order/useOrder";
import { useSession } from "next-auth/react";
import { IconPrinter } from "@tabler/icons-react";

const DynamicModalReview = dynamic(() => import("./ModalReview"), {
  ssr: false,
});
export default function OrderDetailPageMobile({
  dataSource,
  reviews,
  close,
}: any) {
  const [containerHeight, setContainerHeight] = useState<any>(800);

  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    copyStyles: true,
    content: () => componentRef.current,
    onAfterPrint: () => {
      if (close) {
        close();
      }
    },
  });

  useEffect(() => {
    if (componentRef.current) {
      const height = componentRef.current.clientHeight;
      setContainerHeight(height);
    }
  }, [componentRef]);

  const { data } = useSession();
  const {
    data: orderDlbdDetail,
    isLoading: isLoadingDLBD,
    isPending: isPendingDLBD,
  } = useOrderDLBDDetail({
    token: data?.user?.token,
    id: dataSource?.orderDLBDId,
  });
  const {
    data: orderDlbd,
    isLoading: isLoadingOrderDLBD,
    isPending: isPendingOrderDLBD,
  } = useOrderDLBD({
    token: data?.user?.token,
    id: dataSource?.orderDLBDId,
  });

  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );
  function checkId(id: string) {
    if (reviews?.includes(id)) {
      return 1;
    } else {
      return -1;
    }
  }
  const [dataReview, setDataReview] = useState<any>();
  const columnsDLBD = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "14px" }}>Tên SP</span>
      ),
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span style={{ fontSize: "14px" }}>{dataRow}</span>;
      },
    },

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "14px" }}>Đ.Giá</span>
      ),
      name: "price",
      dataIndex: ["sellPrice"],
      textAlign: "right",
      render: (dataRow: number) => {
        return (
          <span style={{ fontSize: "14px" }}>{dataRow?.toLocaleString()}đ</span>
        );
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap", fontSize: "14px" }}>SL</span>,
      name: "quantity",
      width: 50,
      dataIndex: ["quantity"],
      render: (dataRow: any) => {
        return <span style={{ fontSize: "14px" }}>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
          T.Tiền(vnđ)
        </span>
      ),
      name: "priceSale",
      dataIndex: ["total"],
      textAlign: "right",
      render: (dataRow: number) => {
        return (
          <span style={{ fontSize: "14px" }}>{dataRow?.toLocaleString()}</span>
        );
      },
    },
  ];

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "12px" }}>Tên Sp</span>
      ),
      width: 150,
      name: "product",
      dataIndex: ["product", "name"],
      render: (dataRow: any) => {
        return <span style={{ fontSize: "14px" }}>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "12px" }}>Đ.Giá</span>
      ),
      name: "priceSale",
      dataIndex: ["priceSale"],
      width: 80,

      render: (dataRow: any) => {
        return (
          <span style={{ fontSize: "14px" }}>{dataRow.toLocaleString()}</span>
        );
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap", fontSize: "12px" }}>SL</span>,
      name: "quantity",
      dataIndex: ["quantity"],
      textAlign: "center",
      render: (dataRow: any) => {
        return <span style={{ fontSize: "14px" }}>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "12px" }}>
          T.Tiền(vnđ)
        </span>
      ),
      name: "subTotal",
      dataIndex: [],
      render: (dataRow: any) => {
        return (
          <span style={{ fontSize: "14px" }}>
            {(dataRow?.priceSale * dataRow?.quantity).toLocaleString()}
          </span>
        );
      },
    },
    dataSource?.step.toString() == ORDER_DONE && {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "100px",
      classNames: "no-print",
      render: (record: any) => {
        const isPreview = checkId(record?.productId);
        if (isPreview == 1) {
          return;
        }
        return (
          <Tooltip label="Đánh giá" withArrow position="bottom">
            <Button
              size="lg"
              radius={0}
              variant="outline"
              onClick={() => {
                setDataReview(record);
                openModal();
              }}
            >
              Đánh giá
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Container>
      <Group justify="end">
        <ActionIcon color="blue" onClick={handlePrint}>
          <IconPrinter />
        </ActionIcon>
      </Group>
      <style>
        {`
          @media print {
            @page {
              size: 80mm ${
                containerHeight / 3.3
              }mm; /* Đặt kích thước trang in là 80mm chiều rộng và tự động chiều cao */
              margin: 1mm; /* Xóa lề của trang in */
            }

            body {
              width: 80mm; /* Đặt chiều rộng của nội dung in là 80mm */
              padding: 0; /* Xóa padding của nội dung in */
            }
          }
        `}
      </style>
      <div ref={componentRef} className="printable">
        <div className={styles.infoGara}>
          <ImageField
            src={dataSource?.garage?.logo}
            width={80}
            height={80}
            radius={8}
          />
          <div>
            <p style={{ fontSize: 16, fontWeight: 500 }}>
              {dataSource?.garage?.shortName}
            </p>
            <p style={{ fontSize: 14, fontWeight: 500 }}>
              Địa chỉ: {dataSource?.garage?.address}
            </p>
            <p style={{ fontSize: 14, fontWeight: 500 }}>
              Phone: {dataSource?.garage?.phoneNumber}
            </p>
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
          <Flex px={20} w={"100%"} justify={"space-between"}>
            <p style={{ fontSize: 14, fontWeight: 500 }}>
              {dayjs(dataSource?.dateTime).format("HH:mm DD:MM:YY")}
            </p>
            <p style={{ fontSize: 14, fontWeight: 500 }}>
              Số:{dataSource?.code}
            </p>
          </Flex>
        </div>
        <div className={styles.infoCustomer}>
          <div style={{ display: "flex", gap: "6px" }}>
            KH:
            <Typo size="tiny">{dataSource?.customer?.fullName}</Typo>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            ĐT:
            <Typo size="tiny">{dataSource?.customer?.phoneNumber}</Typo>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            XE:
            <Typo size="tiny">{dataSource?.car?.numberPlates}</Typo>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            Ghi chú:
            <Typo size="tiny">{dataSource?.note}</Typo>
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
        <Grid>
          <Grid.Col span={12}>
            {dataSource?.orderDLBDId ? (
              <TableBasic
                data={orderDlbdDetail?.data}
                columns={columnsDLBD}
                isBorder={false}
              />
            ) : (
              <TableBasic
                loading={false}
                columns={columns}
                data={dataSource?.orderDetails}
                isBorder={false}
              />
            )}
          </Grid.Col>
        </Grid>

        <Divider my={"lg"} color="black" size={1} variant="dashed" />
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>Tiền hàng: </p>
          <p>
            {orderDlbd?.data
              ? orderDlbd?.data.subTotal?.toLocaleString()
              : dataSource?.subTotal?.toLocaleString()}
          </p>
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
          <p>
            {orderDlbd?.data
              ? orderDlbd?.data.total?.toLocaleString()
              : dataSource?.total?.toLocaleString()}
          </p>
        </div>
        <div className={styles.infoWifi}>
          <ImageField
            src={dataSource?.garage?.qrCodeBank}
            width={120}
            height={120}
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
          dataDetail={dataReview}
        />
      )}
    </Container>
  );
}
