"use client";
import Typo from "@/app/components/elements/Typo";
import { AutocompleteClearable } from "@/app/components/form/AutoCompleteClear";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Grid,
  Modal,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEye, IconPencil, IconSearch } from "@tabler/icons-react";
import TableBasic from "@/app/components/table/Tablebasic";
import Link from "next/link";
import { stepOrderOptions } from "@/constants/masterData";
import { ResponseError } from "@/utils/until/ResponseError";
import { useEffect, useState } from "react";
import styles from "./ModalAcceptCar.module.scss";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { getOptionsCar } from "../(orders)/order-manager/until";
export default function ModalAcceptCar({ openModal, close }: any) {
  const [numberPlate, setNumberPlate] = useState("");
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [loadingTable, handlers] = useDisclosure(false);

  const [list, setList] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const form = useForm({
    initialValues: {
      carId: null,
    },
    validate: {},
  });

  const fetchOrders = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(
      `/api/admin/orders?${searchParams}&page=${page}`
    );
    if (!response.ok) {
      throw new ResponseError("Failed to fetch orders", response);
    }
    return await response.json();
  };

  const handleSubmit = async (values: any) => {
    handlers.open();

    const data: any = await fetchOrders(`carId=${values.carId}`, page);
    handlers.close();

    setList(data);
  };

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên khách hàng
        </span>
      ),
      name: "fullName",
      dataIndex: ["customer"],
      render: (dataRow: any) => {
        return <span>{dataRow.fullName}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Ngày sửa</span>
      ),
      name: "dateTime",
      dataIndex: ["dateTime"],
      render: (dataRow: Date) => {
        return <span>{dayjs(dataRow).format("DD/MM/YYYY HH:mm")}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tổng đơn hàng
        </span>
      ),
      textAlign: "right",

      name: "total",
      dataIndex: ["total"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tình trạng
        </span>
      ),
      name: "kind",
      dataIndex: ["step"],
      width: "100px",
      render: (record: any, index: number) => {
        const matchedStatus = stepOrderOptions.find(
          (item) => item.value === record.toString()
        );
        if (matchedStatus) {
          return (
            <Badge
              radius={0}
              size="md"
              variant="light"
              color={matchedStatus.color}
              key={index}
            >
              {matchedStatus.label}
            </Badge>
          );
        }
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "100px",
      render: (record: any) => {
        return (
          <>
            <Link
              href={{
                pathname: `/admin/order-detail/${record.slug}`,
              }}
            >
              <Tooltip label="Cập nhật" withArrow position="bottom">
                <Button
                  size="md"
                  radius={0}
                  style={{ margin: "0 5px" }}
                  variant="transparent"
                  color="gray"
                  p={5}
                  onClick={() => {}}
                >
                  <IconPencil size={16} color="blue" />
                </Button>
              </Tooltip>
            </Link>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (!form?.values?.carId) return;
    if (form?.values?.carId) handleSubmit(form.values);
  }, [form.values]);

  return (
    <Modal
      title="Tiếp nhận xe"
      opened={openModal}
      onClose={close}
      lockScroll
      centered
      classNames={{ header: styles.headerModal, title: styles.titleModal }}
      radius={0}
      size={"80%"}
      fullScreen={isMobile}
    >
      <Box w={"100%"} mt={20}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid gutter={12}>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <AutocompleteClearable
                getOptionData={getOptionsCar}
                form={form}
                name={"carId"}
                placeholder={"Biển số xe"}
                isCamera={true}
                setValueInput={setNumberPlate}
              />
            </Grid.Col>
          </Grid>
        </form>
        <div
          style={{
            width: "100%",
            left: 0,
            display: "flex",
            justifyContent: "end",
            paddingTop: 20,
          }}
        >
          <Button
            onClick={() => {
              router.push(
                `/admin/order-detail/create?numberPlate=${numberPlate}`
              );
            }}
          >
            Tạo đơn
          </Button>
        </div>
        <Box h={500} mt={30}>
          {list ? (
            <TableBasic
              data={list?.data}
              columns={columns}
              loading={loadingTable}
              totalPage={list?.totalPage}
              setPage={setPage}
              activePage={page}
              onRow={`/admin/order-detail`}
            />
          ) : (
            <div className={styles.pleaseInput}>
              <p>Vui lòng nhập biển số xe hoặc quét biển số xe để tiếp nhận</p>
            </div>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
