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
  Group,
  Collapse,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import QuillEditor from "@/app/components/elements/RichTextEditor";
import CropImageLink from "@/app/components/common/CropImage";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import Typo from "@/app/components/elements/Typo";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { uploadFileImage } from "@/utils/uploadFile/uploadFile";
import { AppConstants } from "@/constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function NewsForm({
  isEditing,
  dataDetail,
  isLoading,
  updateItem,
  createItem,
}: any) {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const [loading, { toggle: toggleLoading }] = useDisclosure(false);

  const [valueRTE, setValueRTE] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState<File | null>();
  const [banner, setBannerUrl] = useState<File | null>();

  const form = useForm({
    initialValues: {
      thumbnail: "",
      title: "",
      banner: "",
      description: "",
      status: "PUBLIC",
    },
    validate: {
      title: (value) => (value.length < 1 ? "Không được để trống" : null),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        form.setInitialValues(dataDetail);
        form.setValues(dataDetail);
        form.setFieldValue("seoTitle", dataDetail?.seoMeta?.title);
        form.setFieldValue("seoDescription", dataDetail?.seoMeta?.description);
        setThumbnailUrl(dataDetail?.thumbnail);
        setBannerUrl(dataDetail?.banner);
        setValueRTE(dataDetail?.description);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isEditing) {
      fetchData();
    }
  }, [dataDetail]);
  function convertToSlug(str: string) {
    str = str.toLowerCase().trim(); // Chuyển đổi thành chữ thường và loại bỏ khoảng trắng ở đầu và cuối chuỗi
    str = str.replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang
    str = str.replace(/[^\w\-]+/g, ""); // Loại bỏ các ký tự đặc biệt.
    return str;
  }

  const uploadFileThumbnail = async (file: File) => {
    try {
      const imageUrl = await uploadFileImage(file);
      form.setFieldValue("thumbnail", imageUrl);
      setThumbnailUrl(imageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const uploadFileBanner = async (file: File) => {
    try {
      const imageUrl = await uploadFileImage(file);

      form.setFieldValue("banner", imageUrl);
      setBannerUrl(imageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmit = async (values: any) => {
    values.slug = convertToSlug(values?.title);
    values.description = valueRTE;
    values.seoThumbnail = values.thumbnail;
    toggleLoading();
    if (isEditing) {
      const res = await updateItem(values);
      if (res.data) {
        toast.success("Cập nhật thành công");
        router.back();
        router.refresh();
      } else {
        toast.error("Cập nhật thất bại");
      }
    } else {
      const res = await createItem(values);
      if (res.data) {
        toast.success("Thêm thành công");
        router.back();
        router.refresh();
      } else {
        toast.error("Thêm thất bại");
      }
    }
    toggleLoading();
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        zIndex={99}
        visible={isLoading}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm">
              <Grid>
                <Grid.Col span={6}>
                  <Text size={"16px"} c={"#999999"} mb={"6px"}>
                    Hình ảnh
                  </Text>
                  <CropImageLink
                    shape="rect"
                    aspect={1 / 1}
                    placeholder={"Cập nhật ảnh "}
                    defaultImage={
                      thumbnailUrl &&
                      `${AppConstants.contentRootUrl}${thumbnailUrl}`
                    }
                    uploadFileThumbnail={uploadFileThumbnail}
                    idImageContainer="thumbnailId"
                    idUpload="idUploadThumbnail"
                    idResult="image-result-thumbnail"
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size={"16px"} c={"#999999"} mb={"6px"}>
                    Banner
                  </Text>
                  <CropImageLink
                    shape="rect"
                    aspect={3 / 1}
                    placeholder={"Cập nhật ảnh "}
                    defaultImage={
                      banner && `${AppConstants.contentRootUrl}${banner}`
                    }
                    uploadFileThumbnail={uploadFileBanner}
                    idImageContainer="bannerId"
                    idUpload="idUploadBanner"
                    idResult="image-result-banner"
                  />
                </Grid.Col>
              </Grid>
              <Grid gutter={10} mt={24}>
                <Grid.Col span={8}>
                  <TextInput
                    size="md"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("title")}
                    label="Tên bài viết"
                    type="text"
                    placeholder="Tên bài viết"
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
                    label="Mô tả ngắn"
                    minRows={4}
                    autosize={true}
                    {...form.getInputProps("shortDescription")}
                    placeholder="Mô tả ngắn"
                  />
                </Grid.Col>
              </Grid>
              <Grid mt={24}>
                <Grid.Col span={12}>
                  <QuillEditor
                    theme="snow"
                    placeholder="Nội dung"
                    className={"quill"}
                    setValue={setValueRTE}
                    value={valueRTE}
                    style={{ height: 600 }}
                  />
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
        </Grid>
        <Card withBorder={true} mt={20} radius={0}>
          <Group justify="space-between">
            <Typo
              size="primary"
              type="bold"
              style={{ color: "var(--primary-orange)" }}
            >
              SEO META
            </Typo>
            {opened ? (
              <IconChevronDown
                onClick={toggle}
                style={{ cursor: "pointer", rotate: "180deg" }}
              />
            ) : (
              <IconChevronDown onClick={toggle} style={{ cursor: "pointer" }} />
            )}
          </Group>
          <Collapse in={opened}>
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  size="md"
                  radius={0}
                  {...form.getInputProps("seoTitle")}
                  label="Tiêu đề"
                  type="text"
                  placeholder="Tiêu đề"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  size="md"
                  radius={0}
                  label="Mô tả ngắn"
                  minRows={4}
                  autosize={true}
                  {...form.getInputProps("seoDescription")}
                  placeholder="Mô tả"
                />
              </Grid.Col>
            </Grid>
          </Collapse>
        </Card>
        <FooterSavePage
          okText={isEditing ? "Cập nhật" : "Thêm"}
          saveLoading={loading}
        />
      </form>
    </Box>
  );
}
