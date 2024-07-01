"use client";
import {
  Box,
  Card,
  FileButton,
  Grid,
  Text,
  TextInput,
  Textarea,
  Image,
  Select,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import CropImageLink from "@/app/components/common/CropImage";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import { uploadFileImage } from "@/utils/uploadFile/uploadFile";
import { AppConstants } from "@/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function BannerForm({
  kind = 1,
  isEditing,
  dataDetail,
  createItem,
  updateItem,
}: any) {
  const router = useRouter();
  const [loading, handlers] = useDisclosure();
  const resetRef = useRef<() => void>(null);

  const form = useForm({
    initialValues: {
      kind: kind,
      banners: "",
      title: "",
      url: "",
      shortDescription: "",
      description: "",
    },
    validate: {
      title: (value) => (value.length < 1 ? "Không được để trống" : null),
      url: (value) => (value.length < 1 ? "Không được để trống" : null),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        form.setInitialValues(dataDetail);
        form.setValues(dataDetail);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        handlers.close();
      }
    };

    if (isEditing) {
      handlers.open();
      fetchData();
    }
  }, [dataDetail]);

  const uploadFileThumbnail = async (file: File) => {
    try {
      const imageUrl = await uploadFileImage(file);
      form.setFieldValue("banners", imageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    values.kind = values.kind.toString();
    handlers.open();
    if (isEditing) {
      const res = await updateItem(values);
      if (res) {
        toast.success("Cập nhật thành công.");
        router.back();
        router.refresh();
      } else {
        router.back();
        toast.error("Cập nhật thất bại");
      }
    } else {
      const res = await createItem(values);
      if (res) {
        toast.success("Thêm thành công.");
        router.back();
        router.refresh();
      } else {
        router.back();
        toast.error("Thêm thất bại");
      }
    }
    handlers.close();
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loading}
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
                    Banner
                  </Text>
                  <CropImageLink
                    shape="rect"
                    aspect={kind == 1 ? 16 / 6 : 15 / 8}
                    placeholder={"Cập nhật hình ảnh"}
                    defaultImage={
                      dataDetail?.banners &&
                      `${AppConstants.contentRootUrl}${dataDetail?.banners}`
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
                    label="Tên banner"
                    type="text"
                    placeholder="Tên banner"
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
              <Grid gutter={12}>
                <Grid.Col span={12}>
                  <TextInput
                    size="md"
                    radius={0}
                    {...form.getInputProps("url")}
                    label="Đường dẫn url"
                    type="text"
                    placeholder="Đường dẫn url"
                  />
                </Grid.Col>
              </Grid>
              <Grid mt={24}>
                <Grid.Col span={12}>
                  <Textarea
                    size="md"
                    radius={0}
                    label="Mô tả ngắn"
                    minRows={4}
                    autosize={true}
                    {...form.getInputProps("shortDescription")}
                    placeholder="Mô tả"
                  />
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
        </Grid>

        <FooterSavePage
          saveLoading={loading}
          okText={isEditing ? "Cập nhật" : "Thêm"}
        />
      </form>
    </Box>
  );
}
