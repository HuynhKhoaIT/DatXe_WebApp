"use client";
import { Badge, Button, Group, Modal, ScrollArea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  FieldTypes,
  kindProductOptions,
  statusOptions,
} from "@/constants/masterData";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import { IconBan, IconChevronRight } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import ItemProductChoose from "../../marketing-campaign/_component/ItemProductChoose";
import FilterCategories from "@/app/components/common/FilterCategory/FilterCategories";
import { AppConstants } from "@/constants";
import styles from "./index.module.scss";
import ImageField from "@/app/components/form/ImageField";
export default function ModalChooseProducts({
  openModal,
  close,
  selectedProducts,
  setSelectedProducts,
  categoryOptions,
  products,
}: any) {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

  const [selectedRows, setSelectedRows] = useState<any>(selectedProducts);

  useEffect(() => {
    if (selectedProducts) setSelectedRows(selectedProducts);
  }, [selectedProducts]);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "image",
      dataIndex: ["images"],
      width: "90px",
      render: (data: any) => {
        const images = JSON.parse(data);
        return (
          <ImageField
            radius="md"
            height={40}
            width={80}
            src={images?.[0] && `${AppConstants.contentRootUrl}${images?.[0]}`}
          />
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>SKU</span>
      ),
      name: "sku",
      dataIndex: ["sku"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
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
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Số lượng</span>
      ),
      name: "quantity",
      dataIndex: ["quantity"],
      textAlign: "center",
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá bán</span>
      ),
      name: "price",
      dataIndex: ["price"],
      textAlign: "right",

      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá sale</span>
      ),
      name: "priceSale",
      dataIndex: ["salePrice"],
      textAlign: "right",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Loại</span>
      ),
      name: "kind",
      dataIndex: ["isProduct"],
      width: "100px",
      render: (record: any, index: number) => {
        const matchedStatus = kindProductOptions.find(
          (item) => item.value === record.toString()
        );
        if (matchedStatus) {
          return (
            <Badge
              radius={0}
              size="lg"
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
          Trạng thái
        </span>
      ),
      name: "status",
      dataIndex: ["status"],
      width: "100px",
      render: (record: any) => {
        const matchedStatus = statusOptions.find(
          (item) => item.value === record
        );
        if (matchedStatus) {
          return (
            <Badge
              radius={0}
              size="lg"
              color={matchedStatus.color}
              key={record}
              variant="light"
            >
              {matchedStatus.label}
            </Badge>
          );
        }
      },
    },
  ];
  const searchData = [
    {
      name: "s",
      placeholder: "Tên sản phẩm",
      type: FieldTypes.STRING,
    },

    {
      name: "isProduct",
      placeholder: "Loại",
      type: FieldTypes.SELECT,
      data: kindProductOptions,
    },
  ];
  const initialValuesSearch = {
    s: "",
    isProduct: null,
  };

  return (
    <Modal
      title="Chọn sản phẩm"
      opened={openModal}
      onClose={close}
      // size={"80%"}
      radius={0}
      size="auto"
      fullScreen={isMobile}
      lockScroll={true}
    >
      {isMobile ? (
        <>
          <SearchForm
            searchData={searchData}
            brandFilter={false}
            initialValues={initialValuesSearch}
          />
          <FilterCategories categories={categoryOptions} />
          <ScrollArea h={450}>
            {products?.data?.map((item: any, index: number) => {
              return (
                <ItemProductChoose
                  data={item}
                  key={index}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                />
              );
            })}
          </ScrollArea>
          <div className={styles.footerSavePage}>
            <Button
              size="lg"
              radius={0}
              h={{ base: 42, md: 50, lg: 50 }}
              variant="outline"
              key="cancel"
              color="red"
              leftSection={<IconBan size={16} />}
              onClick={close}
            >
              Huỷ bỏ
            </Button>
            <Button
              size="lg"
              radius={0}
              h={{ base: 42, md: 50, lg: 50 }}
              style={{ marginLeft: "12px" }}
              onClick={() => {
                setSelectedProducts(selectedRows);
                close();
              }}
              variant="filled"
              leftSection={<IconChevronRight size={16} />}
            >
              Thêm
            </Button>
          </div>
        </>
      ) : (
        <>
          <ListPage
            searchForm={
              <SearchForm
                searchData={searchData}
                brandFilter={true}
                initialValues={initialValuesSearch}
              />
            }
            filterCategory={<FilterCategories categories={categoryOptions} />}
            style={{ height: "100%" }}
            baseTable={
              <TableBasic
                data={products?.data}
                columns={columns}
                totalPage={products?.totalPage}
                selectRow={true}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
              />
            }
          />
          <Group justify="end" style={{ marginTop: 10 }}>
            <Button
              size="lg"
              radius={0}
              h={{ base: 42, md: 50, lg: 50 }}
              variant="outline"
              key="cancel"
              onClick={close}
              color="red"
              leftSection={<IconBan size={16} />}
            >
              Huỷ bỏ
            </Button>
            <Button
              size="lg"
              radius={0}
              h={{ base: 42, md: 50, lg: 50 }}
              style={{ marginLeft: "12px" }}
              onClick={() => {
                setSelectedProducts(selectedRows);
                close();
              }}
              variant="filled"
              leftSection={<IconChevronRight size={16} />}
            >
              Xác nhận
            </Button>
          </Group>
        </>
      )}
    </Modal>
  );
}
