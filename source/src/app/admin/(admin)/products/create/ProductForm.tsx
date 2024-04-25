"use client";
import {
  Box,
  Card,
  Grid,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { BasicDropzone } from "@/app/components/form/DropZone";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import QuillEditor from "@/app/components/elements/RichTextEditor";
import InfoCar from "../[productId]/InfoCar";
import { useAddProduct } from "../../hooks/product/useAddProduct";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";

export default function ProductForm({
  isEditing = false,
  dataDetail,
  isDirection = false,
}: any) {
  const {
    addItem,
    updateItem,
    isLoadingCategory,
    categoryOptions,
  } = useAddProduct();

  const [loading, handlers] = useDisclosure();
  const [valueRTE, setValueRTE] = useState("");
  const [images, setImages] = useState<any>();

  const form = useForm<{
    name: string;
    salePrice: number | undefined;
    price: number | undefined;
    categories: any;
  }>({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      categories: [],
      salePrice: undefined,
      price: undefined,
    },
    validate: (values) => ({
      name: values?.name?.length < 1 ? "Không được để trống" : null,
      categories: values?.name?.length < 1 ? "Không được để trống" : null,
      salePrice:
        values?.salePrice === undefined
          ? null
          : values?.price === undefined
          ? null
          : values?.salePrice > values?.price
          ? "Giá giảm phải nhỏ hơn giá bán"
          : null,
    }),
  });
  useEffect(() => {
    if (!isEditing) {
      form.setFieldValue("isProduct", "1");
      form.setFieldValue("status", "PUBLIC");
    }
    if (isEditing && dataDetail) {
      form.setInitialValues(dataDetail?.product);
      form.setValues(dataDetail?.product);
      if (dataDetail?.product?.brandDetail) {
        form.setFieldValue(
          "brands",
          JSON?.parse(dataDetail?.product?.brandDetail)
        );
        setCar(JSON?.parse(dataDetail?.product?.brandDetail));
      }

      if (dataDetail?.product?.isProduct) {
        form.setFieldValue("isProduct", "1");
      } else {
        form.setFieldValue("isProduct", "0");
      }
      if (dataDetail?.product?.categories?.length > 0) {
        const dataOption = dataDetail?.product?.categories?.map((item: any) =>
          item.categoryId.toString()
        );
        form.setFieldValue("categories", dataOption);
        form.setFieldValue("images", dataDetail?.product?.images);
        setImages(JSON?.parse(dataDetail?.product?.images));
      }
      setValueRTE(dataDetail?.product?.metaDescription);
    }
    if (isDirection) {
      form.setFieldValue("name", dataDetail?.name);
      form.setFieldValue("price", dataDetail?.price);
      form.setFieldValue("description", dataDetail?.description);
      form.setFieldValue("status", "PUBLIC");
      form.setFieldValue("isProduct", "1");
      console.log([dataDetail?.categoryId]);
      if (dataDetail?.categoryId) {
        form.setFieldValue("categories", [dataDetail?.categoryId]);
      }
    }
  }, [dataDetail]);
  const [car, setCar] = useState([{ brandId: "", nameId: "", yearId: "" }]);

  const handleChangeBrand = (index: number, value: any) => {
    const newCar = [...car];
    newCar[index].brandId = value;
    newCar[index].nameId = "";
    newCar[index].yearId = "";
    setCar(newCar);
  };

  const handleChangeNameCar = (index: number, value: any) => {
    const newCar = [...car];
    newCar[index].nameId = value;
    newCar[index].yearId = "";
    setCar(newCar);
  };

  const handleChangeYearCar = (index: number, value: any) => {
    const newCar = [...car];
    newCar[index].yearId = value.join(",");
    setCar(newCar);
  };

  const handleSubmit = async (values: any) => {
    values.metaDescription = valueRTE;
    try {
      const baseURL = "https://up-image.dlbd.vn/api/image";
      const options = { headers: { "Content-Type": "multipart/form-data" } };

      const responses = await Promise.all(
        images.map(async (image: string | Blob) => {
          const formData = new FormData();
          formData.append("image", image);
          const response = await axios.post(baseURL, formData, options);
          return response.data;
        })
      );

      values.images = JSON.stringify(responses);
    } catch (error) {
      console.error("Error:", error);
    }

    values.title = values.name;
    values.brands = car;

    handlers.open();
    if (isEditing) {
      await updateItem(values);
    } else {
      await addItem(values);
    }
    handlers.close();
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loading || isLoadingCategory}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={{ base: 12, sm: 8, md: 8, lg: 8 }}>
            <Card withBorder shadow="sm">
              <Grid gutter={10}>
                <Grid.Col span={{ base: 12, sm: 8, md: 8, lg: 8 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("name")}
                    label="Tên sản phẩm"
                    type="text"
                    placeholder="Tên sản phẩm"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("isProduct")}
                    label="Loại"
                    checkIconPosition="right"
                    placeholder="Loại"
                    data={[
                      { value: "1", label: "Sản phẩm" },
                      { value: "0", label: "Dịch vụ" },
                    ]}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <NumberInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("price")}
                    label="Giá bán"
                    min={0}
                    placeholder="Giá bán"
                    thousandSeparator=","
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <NumberInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("salePrice")}
                    min={0}
                    label="Giá sale"
                    placeholder="Giá sale"
                    thousandSeparator=","
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <MultiSelect
                    size="lg"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("categories")}
                    label="Danh mục"
                    checkIconPosition="right"
                    placeholder="Danh mục"
                    data={categoryOptions}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <NumberInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("quantity")}
                    label="Số lượng"
                    min={0}
                    placeholder="Số lượng"
                    thousandSeparator=","
                  />
                </Grid.Col>
              </Grid>
              <Grid mt={24}>
                <Grid.Col span={12}>
                  <QuillEditor
                    theme="snow"
                    placeholder="Mô tả chi tiết"
                    className={"quill"}
                    setValue={setValueRTE}
                    value={valueRTE}
                    style={{ height: 450 }}
                  />
                </Grid.Col>
              </Grid>
              <Grid mt={24}>
                <Grid.Col span={12}>
                  <Textarea
                    size="lg"
                    radius={0}
                    label="Mô tả ngắn"
                    minRows={4}
                    autosize={true}
                    {...form.getInputProps("description")}
                    placeholder="Mô tả ngắn"
                  />
                </Grid.Col>
              </Grid>
              <InfoCar
                carData={car}
                setCar={setCar}
                handleChangeBrand={handleChangeBrand}
                handleChangeNameCar={handleChangeNameCar}
                handleChangeYearCar={handleChangeYearCar}
              />
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
            <Card withBorder shadow="sm">
              <Grid>
                <Grid.Col span={12}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("status")}
                    label="Trạng thái"
                    checkIconPosition="right"
                    placeholder="Trạng thái"
                    data={[
                      { value: "PUBLIC", label: "Công khai" },
                      { value: "DRAFT", label: "Nháp" },
                      { value: "PENDING", label: "Đang duyệt" },
                    ]}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <BasicDropzone
                    setImages={setImages}
                    maxFiles={5}
                    images={images}
                  />
                </Grid.Col>
              </Grid>
              <Grid gutter={10} mt={24}></Grid>
            </Card>
          </Grid.Col>
        </Grid>
        <FooterSavePage
          saveLoading={loading}
          okText={isEditing ? "Cập nhật" : isDirection ? "Điều hướng" : "Thêm"}
        />
      </form>
    </Box>
  );
}