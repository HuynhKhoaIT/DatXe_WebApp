"use client";
import Typo from "@/app/components/elements/Typo";
import { ORDER_CANCEL, ORDER_DONE, ORDER_PENDING } from "@/constants";
import {
  Box,
  Button,
  Center,
  Grid,
  NumberInput,
  Overlay,
  Table,
  Tooltip,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import TableOrderDLBD from "../../../order-manager/_component/orderForm/_component/TableOrderDLBD";
import ListPage from "@/app/components/layout/ListPage";
import styles from "./index.module.scss";
export default function CartListProduct({
  dataDetail,
  openModal,
  form,
  setSelectedProducts,
  selectedProducts,
}: any) {
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên sản phẩm
        </span>
      ),
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá bán</span>
      ),
      name: "price",
      dataIndex: ["sellPrice"],
      textAlign: "right",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Số lượng</span>
      ),
      name: "quantity",
      width: 100,
      dataIndex: ["quantity"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tổng tiền
        </span>
      ),
      name: "priceSale",
      dataIndex: ["total"],
      textAlign: "right",

      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
  ];
  const rows = form.values.detail.map((selectedRow: any, index: number) => {
    // const images = JSON.parse(selectedRow.images);
    return (
      <Table.Tr key={index}>
        <Table.Td miw={200} style={{ fontSize: "18px" }}>
          {selectedRow.name || selectedRow?.product?.name || ""}
        </Table.Td>
        <Table.Td w={200}>
          <NumberInput
            size="md"
            radius={0}
            w={200}
            {...form.getInputProps(`detail.${index}.priceSale`)}
            min={0}
            placeholder="Giá sale"
            suffix="đ"
            thousandSeparator=","
            onChange={(value: any) => {
              form.setFieldValue(
                `detail.${index}.subTotal`,
                form.values.detail[index].quantity * Number(value)
              );
              form.setFieldValue(`detail.${index}.priceSale`, value);
            }}
          />
        </Table.Td>
        <Table.Td w={150}>
          <NumberInput
            size="md"
            radius={0}
            w={150}
            {...form.getInputProps(`detail.${index}.quantity`)}
            min={0}
            placeholder="Số lượng"
            thousandSeparator=","
            onChange={(value: any) => {
              form.setFieldValue(`detail.${index}.quantity`, value);
              form.setFieldValue(
                `detail.${index}.subTotal`,
                form.values.detail[index].priceSale * Number(value)
              );
            }}
          />
        </Table.Td>
        <Table.Td w={150}>
          <NumberInput
            size="md"
            radius={0}
            w={150}
            {...form.getInputProps(`detail.${index}.subTotal`)}
            min={0}
            readOnly
            thousandSeparator=","
            suffix="đ"
          />
        </Table.Td>
        <Table.Td
          className="no-print"
          style={{ width: "120px", textAlign: "center" }}
        >
          <>
            <Tooltip label="Xoá" withArrow position="bottom">
              <Button
                size="md"
                radius={0}
                p={5}
                variant="transparent"
                color="red"
                onClick={(e) => {
                  setSelectedProducts(
                    selectedProducts.filter(
                      (selectedItem: any) =>
                        selectedItem.id !== selectedRow.id &&
                        selectedItem.id !== selectedRow.productId
                    )
                  );
                }}
              >
                <IconTrash size={16} color="red" />
              </Button>
            </Tooltip>
          </>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div style={{ marginTop: 20 }} className={styles.cardListProduct}>
      <div className={styles.top}>
        <Typo
          className={styles.title}
          size="primary"
          type="bold"
          style={{ color: "var(--primary-orange)" }}
        >
          Hàng hoá & Dịch vụ
        </Typo>
        {dataDetail?.step !== Number(ORDER_CANCEL) &&
          dataDetail?.step !== Number(ORDER_DONE) &&
          !dataDetail?.orderDLBDId && (
            <Button
              size="md"
              radius={0}
              h={{ base: 42, md: 50, lg: 50 }}
              onClick={(e) => {
                openModal();
              }}
              leftSection={<IconPlus size={18} />}
            >
              Thêm
            </Button>
          )}
      </div>
      {dataDetail?.orderDLBDId ? (
        <TableOrderDLBD
          styles={styles}
          columns={columns}
          dataDetail={dataDetail}
        />
      ) : (
        <Box pos={"relative"}>
          {dataDetail?.step === Number(ORDER_PENDING) && (
            <Overlay zIndex={9} color="#000" backgroundOpacity={0.35} blur={15}>
              <Center h={"100%"}>
                <Typo
                  size="small"
                  style={{ color: "#fff", textAlign: "center" }}
                >
                  Vui lòng tiếp nhận đơn hàng để được xem chi tiết đơn hàng.
                </Typo>
              </Center>
            </Overlay>
          )}
          <Grid className={styles.marketingInfo}>
            <Grid.Col span={12}>
              <ListPage
                style={{ height: "100%" }}
                baseTable={
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Tên sản phẩm</Table.Th>
                        <Table.Th>Giá</Table.Th>
                        <Table.Th>Số lượng</Table.Th>
                        <Table.Th>Tổng tiền</Table.Th>
                        <Table.Th className="no-print">Hành động</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                  </Table>
                }
              />
            </Grid.Col>
          </Grid>
        </Box>
      )}
    </div>
  );
}
