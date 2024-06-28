"use client";

import TableBasic from "@/app/components/table/Tablebasic";
import { Alert, Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import { IconInfoCircle, IconTrash } from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import ImageField from "@/app/components/form/ImageField";
import { AppConstants } from "@/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DynamicModalDeleteItem = dynamic(
  () => import("@/app/admin/_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
const TableListPage = ({ dataSource, deleteItem }: any) => {
  const [deleteRow, setDeleteRow] = useState();
  const router = useRouter();
  const handleDeleteItem = async (id: any) => {
    const res = await deleteItem(id);
    if (res) {
      toast.success("Xoá thành công");
      router.back();
      router.refresh();
    }
  };
  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "image",
      dataIndex: ["product", "images"],
      width: "90px",
      render: (data: any) => {
        let images;
        if (data) images = JSON?.parse(data);
        if (!images) {
          return <ImageField radius="md " height={40} width={40} />;
        }
        return (
          <ImageField
            radius="md "
            height={40}
            width={40}
            src={images[0] && `${AppConstants.contentRootUrl}${images[0]}`}
          />
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên sản phẩm
        </span>
      ),
      name: "name",
      dataIndex: ["product", "name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá bán</span>
      ),
      name: "price",
      dataIndex: ["product", "price"],
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
      dataIndex: ["product", "salePrice"],
      textAlign: "right",

      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
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
      textAlign: "center",
      render: (record: any) => {
        return (
          <Tooltip label="Xoá" withArrow position="bottom">
            <Button
              size="lg"
              radius={0}
              p={5}
              variant="transparent"
              color="red"
              onClick={(e) => {
                openDeleteProduct();
                e.stopPropagation();
                setDeleteRow(record.product?.id);
              }}
            >
              <IconTrash size={16} color="red" />
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Fragment>
      {dataSource?.length == 10 && (
        <Alert
          variant="light"
          color="yellow"
          title="Thông báo"
          icon={<IconInfoCircle />}
          mb={10}
        >
          Danh sách sản phẩm nổi bật tối đa 10 sản phẩm, để thêm sản phẩm mới
          vui lòng xoá sản phẩm cũ.
        </Alert>
      )}

      <TableBasic
        data={dataSource}
        columns={columns}
        // totalPage={products?.totalPage}
      />
      {openedDeleteItem && (
        <DynamicModalDeleteItem
          openedDeleteItem={openedDeleteItem}
          closeDeleteItem={closeDeleteItem}
          handleDeleteItem={handleDeleteItem}
          deleteRow={deleteRow}
        />
      )}
    </Fragment>
  );
};
export default TableListPage;
