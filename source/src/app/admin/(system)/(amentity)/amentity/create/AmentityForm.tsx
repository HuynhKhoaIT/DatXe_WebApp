"use client";
import {
  Box,
  Card,
  Grid,
  Text,
  TextInput,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import ImageUpload from "@/assets/icons/cameraUploadMobile.svg";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import { AppConstants } from "@/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CropImageLink from "@/app/components/common/CropImage";
export default function AmentityForm({
  isEditing,
  dataDetail,
  createItem,
  updateItem,
}: any) {
  const [loading, handlers] = useDisclosure();
  const [imageField, setImageField] = useState<File | null>();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      thumbnail: "",
      title: "",
      description: "",
    },
    validate: {
      // title: (value) => (value.length < 1 ? "Không được để trống" : null),
      // image: (value) => (value.length < 1 ? "Không được để trống" : null),
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
      const baseURL = "https://up-image.dlbd.vn/api/image";
      const options = { headers: { "Content-Type": "multipart/form-data" } };

      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      const response = await axios.post(baseURL, formData, options);
      form.setFieldValue("thumbnail", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    handlers.open();
    if (isEditing) {
      const res = await updateItem(values);
      if (res) {
        toast.success("Cập nhật thành công");
        router.back();
        router.refresh();
      } else {
        toast.error("Cập nhật thất bại");
      }
    } else {
      const res = await createItem(values);
      if (res) {
        toast.success("Thêm thành công");
        router.back();
        router.refresh();
      } else {
        toast.error("Thêm thất bại");
      }
    }
    handlers.close();
  };

  return (
    <Box pos="relative">
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
                    placeholder={"Cập nhật hình ảnh"}
                    defaultImage={
                      dataDetail?.thumbnail &&
                      `${AppConstants.contentRootUrl}${dataDetail?.thumbnail}`
                    }
                    uploadFileThumbnail={uploadFileThumbnail}
                  />
                </Grid.Col>
              </Grid>
              <Grid gutter={10} mt={24}>
                <Grid.Col span={8}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("title")}
                    label="Tên tiện ích"
                    type="text"
                    placeholder="Tên tiện ích"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
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
              </Grid>
              <Grid mt={24}>
                <Grid.Col span={12}>
                  <Textarea
                    size="lg"
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
          saveLoading={loading}
          okText={isEditing ? "Cập nhật" : "Thêm"}
        />
      </form>
    </Box>
  );
}
