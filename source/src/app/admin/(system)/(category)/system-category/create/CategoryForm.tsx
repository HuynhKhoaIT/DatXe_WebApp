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
import FooterSavePage from "../../../../_component/FooterSavePage";
import convertToSlug from "@/utils/until";
import CropImageLink from "@/app/components/common/CropImage";
import { uploadFileImage } from "@/utils/uploadFile/uploadFile";
import { AppConstants } from "@/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
export default function CategoryForm({
  isEditing,
  dataDetail,
  isLoading,
  createItem,
  updateItem,
}: any) {
  const router = useRouter();
  const [isLoadingSave, handlerLoading] = useDisclosure();
  const [imageField, setImageField] = useState<File | null>();

  const form = useForm({
    initialValues: {
      image: "",
      title: "",
      description: "",
      status: "",
    },
    validate: {
      title: (value) => (value.length < 1 ? "Không được để trống" : null),
      image: (value) => (value.length < 1 ? "Không được để trống" : null),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        form.setInitialValues(dataDetail);
        form.setValues(dataDetail);
        setImageField(dataDetail?.image);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isEditing) {
      fetchData();
    } else {
      form.setFieldValue("status", "PUBLIC");
    }
  }, [dataDetail]);

  const uploadFileThumbnail = async (file: File) => {
    try {
      const imageUrl = await uploadFileImage(file);
      form.setFieldValue("image", imageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    handlerLoading.open();
    values.slug = convertToSlug(values?.title);
    if (isEditing) {
      const res = await updateItem(values);
      if (res) {
        toast.success("Cập nhật thành công.");
        router.back();
        router.refresh();
      } else {
        toast.error("Cập nhật thất bại.");
      }
    } else {
      const res = await createItem(values);
      if (res) {
        toast.success("Thêm thành công.");
        router.back();
        router.refresh();
      } else {
        toast.error("Thêm thất bại.");
      }
    }
    handlerLoading.close();
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
                    placeholder={"Cập nhật avatar"}
                    defaultImage={
                      imageField &&
                      `${AppConstants.contentRootUrl}${imageField}`
                    }
                    uploadFileThumbnail={uploadFileThumbnail}
                    required
                    showRequired={!form.isValid("image")}
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

        <FooterSavePage
          saveLoading={isLoadingSave}
          okText={isEditing ? "Cập nhật" : "Thêm"}
        />
      </form>
    </Box>
  );
}
