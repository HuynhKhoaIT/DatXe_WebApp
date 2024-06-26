"use client";
import {
  Box,
  Card,
  Grid,
  Text,
  TextInput,
  Textarea,
  Select,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import convertToSlug from "@/utils/until";
import CropImageLink from "@/app/components/common/CropImage";
import { AppConstants } from "@/constants";
import { uploadFileImage } from "@/utils/uploadFile/uploadFile";
export default function CategoryForm({
  isEditing,
  dataDetail,
  isLoading,
  handleCreate,
  handleUpdate,
}: any) {
  const [imageField, setImageField] = useState<File | null>();
  const form = useForm({
    initialValues: {
      image: "",
      title: "",
      description: "",
    },
    validate: {
      title: (value) => (value.length < 1 ? "Không được để trống" : null),
      // image: (value) => (value.length < 1 ? "Không được để trống" : null),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        form.setInitialValues(dataDetail);
        form.setValues(dataDetail);
        setImageField(dataDetail.image);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isEditing) {
      fetchData();
    }
  }, [dataDetail]);

  const uploadFileThumbnail = async (file: File) => {
    try {
      const imageUrl = await uploadFileImage(file);
      form.setFieldValue("image", imageUrl);
      setImageField(imageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    values.slug = convertToSlug(values?.title);
    if (isEditing) {
      await handleUpdate(values);
    } else {
      await handleCreate(values);
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={99}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm">
              <Grid>
                <Grid.Col span={12}>
                  <Text size={"16px"} c={"#999999"} mb={"6px"}>
                    Hình ảnh
                  </Text>
                  <CropImageLink
                    shape="rect"
                    aspect={1 / 1}
                    placeholder={"Cập nhật avatar"}
                    defaultImage={
                      imageField &&
                      `${AppConstants.contentRootUrl}${imageField}`
                    }
                    uploadFileThumbnail={uploadFileThumbnail}
                  />
                </Grid.Col>
              </Grid>
              <Grid gutter={10} mt={24}>
                <Grid.Col span={8}>
                  <TextInput
                    size="md"
                    radius={0}
                    {...form.getInputProps("title")}
                    label="Tên danh mục"
                    type="text"
                    placeholder="Tên danh mục"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Select
                    size="md"
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
              </Grid>
              <Grid mt={24}>
                <Grid.Col span={12}>
                  <Textarea
                    size="md"
                    radius={0}
                    label="Mô tả chi tiết"
                    minRows={4}
                    autosize={true}
                    {...form.getInputProps("description")}
                    placeholder="Mô tả"
                  />
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
        </Grid>
        <FooterSavePage okText={isEditing ? "Cập nhật" : "Thêm"} />
      </form>
    </Box>
  );
}
