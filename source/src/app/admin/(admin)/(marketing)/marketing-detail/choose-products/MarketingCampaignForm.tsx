"use client";
import {
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  NumberInput,
  Select,
  Table,
  Text,
  TextInput,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "./index.module.scss";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import DateTimeField from "@/app/components/form/DateTimeField";
import ListPage from "@/app/components/layout/ListPage";
import { IconBan, IconPlus, IconTrash } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import Typo from "@/app/components/elements/Typo";
import FooterSavePage from "../../../../_component/FooterSavePage";
import CropImageLink from "@/app/components/common/CropImage";
import { AppConstants } from "@/constants";
import { uploadFileImage } from "@/utils/uploadFile/uploadFile";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DynamicModalChooseProducts = dynamic(
  () => import("./ModalChooseProducts"),
  {
    ssr: false,
  }
);

export default function MarketingCampaignForm({
  dataDetail,
  isEditing,
  createItem,
  updateItem,
  products,
  categoryOptions,
}: any) {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<any>(
    dataDetail
      ? dataDetail?.detail.map((item: any) => ({ ...item, id: item.productId }))
      : []
  );

  const uploadFileBanner = async (file: File) => {
    try {
      const imageUrl = await uploadFileImage(file);
      form.setFieldValue("banner", imageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [loading, handlers] = useDisclosure();
  const [
    openModalChoose,
    { open: openModal, close: closeModal },
  ] = useDisclosure(false);
  useEffect(() => {
    if (!isEditing) {
      let updatedProducts = selectedProducts.map((detail: any) => ({
        name: detail.name,
        price: detail.price,
        productId: detail.id,
        quantity: 1,
        priceSale: detail.price,
        subTotal: 1,
        status: "PUBLIC",
        saleType: "FIXED",
        saleValue: 0,
      }));
      form.setFieldValue("detail", updatedProducts);
    } else {
      let updatedProducts = selectedProducts.map((detail: any) => ({
        name: detail?.product?.name || detail?.name,
        price: detail.price,
        productId: detail.productId !== 0 ? detail.productId : detail.id,
        quantity: detail?.quantity || 1,
        priceSale: detail?.priceSale,
        subTotal: detail.subTotal,
        status: detail?.status,
        saleType: detail?.saleType || "FIXED",
        saleValue: detail?.saleValue || 0,
      }));
      form.setFieldValue("detail", updatedProducts);
    }
  }, [selectedProducts]);

  useEffect(() => {
    const fetchData = async () => {
      handlers.open();

      if (isEditing && dataDetail) {
        try {
          form.setInitialValues(dataDetail);
          form.setValues(dataDetail);
          form.setFieldValue(
            "dateTimeStart",
            dayjs(dataDetail?.dateTimeStart).toDate()
          );
          form.setFieldValue(
            "dateTimeEnd",
            dayjs(dataDetail?.dateTimeEnd).toDate()
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          handlers.close();
        }
      }
    };

    if (isEditing) fetchData();
  }, [dataDetail]);
  const form = useForm({
    initialValues: {
      detail: selectedProducts,
      title: "",
    },
    validate: {
      title: isNotEmpty("Vui lòng nhập..."),
      detail: {
        saleValue: isNotEmpty("Vui lòng nhập..."),
        priceSale: (value) => (value < 0 ? "Không được để giá trị âm" : null),
      },
    },
  });

  const rows = form.values.detail.map((selectedRow: any, index: number) => {
    // const images = JSON.parse(selectedRow.images);
    return (
      <Table.Tr key={selectedRow.id}>
        {/* <Table.Td>
          {images ? (
            <Image radius="md" src={images[0]} h={40} w="auto" fit="contain" />
          ) : (
            <Image
              radius="md"
              src={ImageDefult.src}
              h={40}
              w="auto"
              fit="contain"
            />
          )}
        </Table.Td> */}
        <Table.Td miw={200} style={{ fontSize: "18px" }}>
          {selectedRow.name || selectedRow?.product?.name || ""}
        </Table.Td>
        <Table.Td style={{ fontSize: "18px" }}>
          {selectedRow.price.toLocaleString()}đ
        </Table.Td>
        <Table.Td>
          <NumberInput
            size="md"
            radius={0}
            withAsterisk
            readOnly
            // label="Tên chương trình"
            miw={100}
            thousandSeparator=","
            type="text"
            placeholder="Giá sau giảm"
            suffix="đ"
            {...form.getInputProps(`detail.${index}.priceSale`)}
          />
          {/* {form.values.detail[index].salePrice
            ? Number(form.values.detail[index].salePrice).toLocaleString()
            : form.values.detail[index].salePrice == 0
            ? 0
            : selectedRow.price.toLocaleString()}
          đ */}
        </Table.Td>
        <Table.Td>
          <Grid miw={150}>
            <Grid.Col span={{ base: 12, sm: 5, md: 5, lg: 5 }}>
              <Select
                size="md"
                radius={0}
                miw={100}
                {...form.getInputProps(`detail.${index}.saleType`)}
                data={[
                  { value: "FIXED", label: "Tiền" },
                  { value: "PERCENT", label: "Phần trăm" },
                ]}
                onChange={(value) => {
                  form.setFieldValue(`detail.${index}.saleType`, value);
                  form.setFieldValue(
                    `detail.${index}.priceSale`,
                    form.values.detail[index].price
                  );
                  form.setFieldValue(`detail.${index}.saleValue`, 0);
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 7, md: 7, lg: 7 }}>
              {selectedRow.saleType === "FIXED" ? (
                <NumberInput
                  size="md"
                  radius={0}
                  {...form.getInputProps(`detail.${index}.saleValue`)}
                  min={0}
                  placeholder="Giá sale"
                  thousandSeparator=","
                  suffix="đ"
                  onChange={(value) => {
                    form.setFieldValue(
                      `detail.${index}.priceSale`,
                      form.values.detail[index].price - Number(value)
                    );

                    form.setFieldValue(`detail.${index}.saleValue`, value);
                  }}
                />
              ) : (
                <NumberInput
                  size="md"
                  radius={0}
                  {...form.getInputProps(`detail.${index}.saleValue`)}
                  placeholder="Phầm trăm sale"
                  suffix="%"
                  min={0}
                  max={100}
                  onChange={(value) => {
                    form.setFieldValue(
                      `detail.${index}.priceSale`,
                      form.values.detail[index].price -
                        (form.values.detail[index].price * Number(value)) / 100
                    );
                    form.setFieldValue(`detail.${index}.saleValue`, value);
                  }}
                />
              )}
            </Grid.Col>
          </Grid>
        </Table.Td>
        <Table.Td style={{ width: "200px" }}>
          <NumberInput
            size="md"
            radius={0}
            miw={100}
            {...form.getInputProps(`detail.${index}.quantity`)}
            min={0}
            placeholder="Số lượng"
            thousandSeparator=","
          />
        </Table.Td>
        <Table.Td style={{ width: "120px", textAlign: "center" }}>
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

  const handleSubmit = async (values: any) => {
    handlers.open();
    if (isEditing) {
      const res = await updateItem(values);
      console.log(res);
      if (res) {
        toast.success("Cập nhật thành công");
        router.back();
        router.refresh();
      } else {
        toast.success("Cập nhật thất bại");
        router.back();
      }
    } else {
      const res = await createItem(values);
      if (res) {
        toast.success("Thêm thành công");
        router.back();
        router.refresh();
      } else {
        toast.success("Thêm thất bại");
        router.back();
      }
    }
    handlers.close();
  };

  return (
    <Box pos="relative">
      <form className={styles.form} onSubmit={form.onSubmit(handleSubmit)}>
        <div className={styles.card}>
          <Typo
            size="primary"
            type="bold"
            style={{ color: "var(--primary-orange)" }}
            className={styles.title}
          >
            Thông tin chương trình
          </Typo>
          <div className={styles.marketingInfo}>
            <Grid>
              <Grid.Col span={{ base: 6 }}>
                <Text size={"16px"} c={"#999999"} mb={"6px"}>
                  Banner
                </Text>
                <CropImageLink
                  shape="rect"
                  placeholder={"Cập nhật ảnh bìa"}
                  defaultImage={
                    dataDetail?.banners &&
                    `${AppConstants.contentRootUrl}${dataDetail?.banners}`
                  }
                  uploadFileThumbnail={uploadFileBanner}
                  aspect={3 / 2}
                  idUpload="image-uploader-banner"
                  idResult="image-result-banner"
                  idImageContainer="image-container-banner"
                  name="banner"
                />
              </Grid.Col>
            </Grid>
            <Grid gutter={16}>
              <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <TextInput
                  size="md"
                  radius={0}
                  withAsterisk
                  label="Tên chương trình"
                  type="text"
                  placeholder="Tên chương trình"
                  {...form.getInputProps("title")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 6, sm: 3, md: 3, lg: 3 }}>
                <DateTimeField
                  size="md"
                  radius={0}
                  placeholder="Ngày bắt đầu"
                  label="Ngày bắt đầu"
                  required
                  {...form.getInputProps("dateTimeStart")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 6, sm: 3, md: 3, lg: 3 }}>
                <DateTimeField
                  size="md"
                  placeholder="Ngày kết thúc"
                  radius={0}
                  label="Ngày kết thúc"
                  required
                  {...form.getInputProps("dateTimeEnd")}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  size="md"
                  radius={0}
                  label="Mô tả"
                  minRows={4}
                  autosize={true}
                  {...form.getInputProps("description")}
                  placeholder="Mô tả"
                />
              </Grid.Col>
            </Grid>
          </div>
        </div>

        <div style={{ borderRadius: 8 }}>
          <div style={{ marginTop: 20 }} className={styles.card}>
            <Typo
              className={styles.title}
              size="primary"
              type="bold"
              style={{ color: "var(--primary-orange)" }}
            >
              Danh sách sản phẩm khuyến mãi
            </Typo>
            <Grid className={styles.marketingInfo}>
              <Grid.Col span={12}>
                <ListPage
                  style={{ height: "100%" }}
                  isBoxShadow={false}
                  actionBar={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        size="md"
                        radius={0}
                        onClick={(e) => {
                          openModal();
                        }}
                        leftSection={<IconPlus size={18} />}
                      >
                        Thêm sản phẩm
                      </Button>
                    </div>
                  }
                  baseTable={
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th style={{ whiteSpace: "nowrap" }}>
                            Tên sản phẩm
                          </Table.Th>
                          <Table.Th style={{ whiteSpace: "nowrap" }}>
                            Giá gốc
                          </Table.Th>
                          <Table.Th style={{ whiteSpace: "nowrap" }}>
                            Giá sau giảm
                          </Table.Th>
                          <Table.Th style={{ whiteSpace: "nowrap" }}>
                            Giá sale
                          </Table.Th>
                          <Table.Th style={{ whiteSpace: "nowrap" }}>
                            Số lượng khuyến mãi
                          </Table.Th>
                          <Table.Th
                            style={{ width: "120px", textAlign: "center" }}
                          >
                            hành động
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                  }
                />
              </Grid.Col>
            </Grid>
          </div>

          <FooterSavePage okText="Xác nhận" saveLoading={loading} />
        </div>
      </form>
      <DynamicModalChooseProducts
        openModal={openModalChoose}
        close={closeModal}
        setSelectedProducts={setSelectedProducts}
        selectedProducts={selectedProducts}
        products={products}
        categoryOptions={categoryOptions}
      />
    </Box>
  );
}
