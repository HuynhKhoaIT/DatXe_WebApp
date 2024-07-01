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
import { useDisclosure, useMediaQuery, useSetState } from "@mantine/hooks";
import dynamic from "next/dynamic";
import styles from "./OrderDetailPage.module.scss";
import ImageField from "@/app/components/form/ImageField";
import Typo from "@/app/components/elements/Typo";
import dayjs from "dayjs";
import TableBasic from "@/app/components/table/Tablebasic";
import { useReactToPrint } from "react-to-print";
import { AppConstants, ORDER_CANCEL, ORDER_DONE } from "@/constants";
import {
  useOrderDLBD,
  useOrderDLBDDetail,
} from "@/app/admin/(admin)/hooks/order/useOrder";
import { useSession } from "next-auth/react";
import { IconPrinter } from "@tabler/icons-react";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";

const DynamicModalReview = dynamic(
  () => import("@/app/layout/dashboard/danh-sach-don-hang/ModalReview"),
  {
    ssr: false,
  }
);
const DynamicModalReviewGarage = dynamic(
  () => import("./_component/ModalReviewGarage"),
  {
    ssr: false,
  }
);
export default function OrderDetailPageMobile({
  dataSource,
  close,
  isPrint = false,
  review,
}: any) {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
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
  const [
    openedModalReviewGarage,
    { open: openModalReviewGarage, close: closeModalReviewGarage },
  ] = useDisclosure(false);
  function checkId(id: string) {
    const item = dataSource.reviews?.find((item: any) => item.productId == id);
    if (item) {
      return 1;
    } else {
      return -1;
    }
  }
  const [dataReview, setDataReview] = useState<any>();
  const columnsDLBD = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "12px" }}>Tên SP</span>
      ),
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span style={{ fontSize: "12px" }}>{dataRow}</span>;
      },
    },

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "12px" }}>Đ.Giá</span>
      ),
      name: "price",
      dataIndex: ["sellPrice"],
      textAlign: "right",
      render: (dataRow: number) => {
        return (
          <span style={{ fontSize: "12px" }}>{dataRow?.toLocaleString()}đ</span>
        );
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap", fontSize: "12px" }}>SL</span>,
      name: "quantity",
      width: 50,
      dataIndex: ["quantity"],
      render: (dataRow: any) => {
        return <span style={{ fontSize: "12px" }}>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "12px" }}>
          T.Tiền(vnđ)
        </span>
      ),
      name: "priceSale",
      dataIndex: ["total"],
      textAlign: "right",
      render: (dataRow: number) => {
        return (
          <span style={{ fontSize: "12px" }}>{dataRow?.toLocaleString()}</span>
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
        return <span style={{ fontSize: "12px" }}>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "12px" }}>Đ.Giá</span>
      ),
      name: "priceSale",
      dataIndex: ["priceSale"],
      width: 80,
      textAlign: "right",
      render: (dataRow: any) => {
        return (
          <span style={{ fontSize: "12px" }}>{dataRow.toLocaleString()}</span>
        );
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap", fontSize: "12px" }}>SL</span>,
      name: "quantity",
      dataIndex: ["quantity"],
      textAlign: "center",
      render: (dataRow: any) => {
        return <span style={{ fontSize: "12px" }}>{dataRow}</span>;
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
      textAlign: "right",
      render: (dataRow: any) => {
        return (
          <span style={{ fontSize: "12px" }}>
            {(dataRow?.priceSale * dataRow?.quantity).toLocaleString()}
          </span>
        );
      },
    },
    dataSource?.step.toString() == ORDER_DONE && {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "12px" }}>
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
          <Button
            // size="md"
            // radius={0}
            color="blue"
            variant="outline"
            onClick={() => {
              setDataReview(record);
              openModal();
            }}
          >
            Đánh giá
          </Button>
        );
      },
    },
  ];

  return (
    <Container className={styles.container}>
      {isPrint && (
        <Group justify="end">
          <ActionIcon color="blue" onClick={handlePrint}>
            <IconPrinter />
          </ActionIcon>
        </Group>
      )}
      <style>
        {`
          @media print {
            @page {
              size: 100%; /* Đặt kích thước trang in là 80mm chiều rộng và tự động chiều cao */
              margin: 2mm 14mm 0 14mm; /* Xóa lề của trang in */
            }
            body {
              width: 100%; /* Đặt chiều rộng của nội dung in là 80mm */
              padding: 0; /* Xóa padding của nội dung in */
            }
            table {
              p,span{
                font-size: 10px !important;  
              }
            }
            p,span{
              font-size: 10px !important;  
            }
            h6,h4,h3{
              font-size: 12px !important;  
            }
            td{
              padding: 0px !important;  
              line-height: 1 !important;
            }
            table { page-break-inside:auto }
            tr    { page-break-inside:avoid; page-break-after:auto }
            thead { display:table-header-group }
            tfoot { display:table-footer-group }
          }
        `}
      </style>
      <div ref={componentRef} className="printable">
        <div className={styles.infoGara}>
          <ImageField
            src={
              dataSource?.garage?.logo &&
              `${AppConstants.contentRootUrl}${dataSource?.garage?.logo}`
            }
            width={80}
            height={80}
            radius={8}
          />
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 500 }}>
              {dataSource?.garage?.shortName}
            </h4>
            <p style={{ fontSize: 14, fontWeight: 500 }}>
              Địa chỉ: {dataSource?.garage?.address}
            </p>
            <p style={{ fontSize: 14, fontWeight: 500 }}>
              Phone: {dataSource?.garage?.phoneNumber}
            </p>
          </div>
        </div>
        <Divider my={5} mx={5} color="black" size={1.5} variant="dashed" />

        <div className={styles.box}>
          <div className={styles.title}>
            <h3>Chi tiết đơn hàng</h3>
          </div>
          <Flex px={10} w={"100%"} justify={"space-between"}>
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
            <Typo size="tiny">
              <p>
                {dataSource?.customer?.fullName} -{" "}
                {dataSource?.customer?.phoneNumber}
              </p>
            </Typo>
          </div>
          {/* <p style={{ display: "flex", gap: "6px" }}>
            ĐT:
            <Typo size="tiny">
              <p>{dataSource?.customer?.phoneNumber}</p>
            </Typo>
          </p> */}
          <div style={{ display: "flex", gap: "6px" }}>
            XE:
            <Typo size="tiny">
              <p>{dataSource?.car?.numberPlates}</p>
            </Typo>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            Ghi chú:
            <Typo size="tiny">
              <p>{dataSource?.note}</p>
            </Typo>
          </div>
        </div>
        <Divider my={5} mx={5} color="black" size={1.5} variant="dashed" />
        <div style={{ marginTop: "10px" }}></div>
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
                fontSize={12}
              />
            )}
          </Grid.Col>
        </Grid>

        <Divider my={5} color="black" size={1} variant="dashed" />
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            width: "100%",
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
        <Divider my={5} color="black" size={1} variant="dashed" />
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
            src={
              dataSource?.garage?.qrCodeBank &&
              `${AppConstants.contentRootUrl}${dataSource?.garage?.qrCodeBank}`
            }
            width={100}
            height={100}
          />
          <p>Wifi:{dataSource?.garage?.wifiInfo}</p>
        </div>
        <h6 className={styles.titleThanks}>
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
        </h6>
      </div>
      {(dataSource?.step == Number(ORDER_DONE) ||
        dataSource?.step == Number(ORDER_CANCEL)) && (
        <Flex justify={"flex-end"} py={20}>
          <Button
            color="blue"
            fullWidth={isMobile}
            onClick={openModalReviewGarage}
          >
            Đánh giá chuyên gia
          </Button>
        </Flex>
      )}

      {openedModal && (
        <DynamicModalReview
          openedModal={openedModal}
          onCloseModal={closeModal}
          title="Đánh giá sản phẩm"
          onCancelModal={closeModal}
          dataDetail={dataReview}
          orderId={dataSource.id}
        />
      )}
      {openedModalReviewGarage && (
        <DynamicModalReviewGarage
          openedModal={openedModalReviewGarage}
          onCloseModal={closeModalReviewGarage}
          onCancelModal={closeModalReviewGarage}
          dataDetail={dataSource}
          review={review}
        />
      )}
    </Container>
  );
}
