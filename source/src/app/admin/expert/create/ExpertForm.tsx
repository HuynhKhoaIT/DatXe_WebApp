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
  MultiSelect,
  Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import FooterSavePage from "../../_component/FooterSavePage";
import {
  getOptionsDistrict,
  getOptionsWard,
  getUltilities,
} from "@/utils/until";
import CropImageLink from "@/app/components/common/CropImage";
import ImageUpload from "@/assets/icons/image.svg";
import Typo from "@/app/components/elements/Typo";
import DropZone from "../_component/DropZone";
export default function ExpertForm({
  isLoading,
  isEditing,
  dataDetail,
  UltilitiesOptions,
  updateItem,
  addItem,
  provinceOptions,
  isLoadingUltilities,
}: any) {
  const [loading, handlers] = useDisclosure();

  const [logoUrl, setLogoUrl] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const [imagesUrl, setImagesUrl] = useState<any>([]);

  const handleChangeImage = (index: number, value: any) => {
    const newImage = [...imagesUrl];
    newImage[index] = value;
    setImagesUrl(newImage);
  };

  const [districtOptions, setDistrictOptions] = useState<any>([]);
  const [wardOptions, setWardOptions] = useState<any>([]);

  const [province, setProvince] = useState<any>();
  const [district, setDistrict] = useState<any>();
  const [ward, setWard] = useState<any>();

  const form = useForm({
    initialValues: {
      logo: "",
      description: "",
      amenities: [],
      photos: [],
    },
    validate: {},
  });
  useEffect(() => {
    const fetchData = async () => {
      if (isEditing && dataDetail) {
        try {
          form.setInitialValues(dataDetail);
          form.setValues(dataDetail);
          if (dataDetail?.amenities?.length > 0) {
            const dataOption = dataDetail?.amenities?.map(
              (item: any) => item?.amenities?.id
            );
            form.setFieldValue("amenities", dataOption);
          }
          setImagesUrl(JSON?.parse(dataDetail?.photos));

          const [districts, wards] = await Promise.all([
            getOptionsDistrict(Number(dataDetail?.provinceId)),
            getOptionsWard(Number(dataDetail?.districtId)),
          ]);
          setDistrictOptions(districts);
          setWardOptions(wards);
          setProvince(dataDetail?.provinceId?.toString());
          setDistrict(dataDetail?.districtId?.toString());
          setWard(dataDetail?.wardId?.toString());

          form.setFieldValue("provinceId", dataDetail?.provinceId?.toString());
          form.setFieldValue("districtId", dataDetail?.districtId?.toString());
          form.setFieldValue("wardId", dataDetail?.wardId?.toString());
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (isEditing) fetchData();
    setLogoUrl(dataDetail?.logo);
    setBannerUrl(dataDetail?.banner);
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
      form.setFieldValue("logo", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const uploadFileBanner = async (file: File) => {
    try {
      const baseURL = "https://up-image.dlbd.vn/api/image";
      const options = { headers: { "Content-Type": "multipart/form-data" } };

      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      const response = await axios.post(baseURL, formData, options);
      form.setFieldValue("banner", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadFileImages = async (file: File) => {
    try {
      const baseURL = "https://up-image.dlbd.vn/api/image";
      const options = { headers: { "Content-Type": "multipart/form-data" } };

      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      const response = await axios.post(baseURL, formData, options);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    values.photos = JSON.stringify(imagesUrl);
    console.log(values);
    handlers.open();
    if (isEditing) {
      updateItem(values);
    } else {
      addItem(values);
    }
    handlers.close();
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading || isLoadingUltilities || loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm">
              <Grid gutter={12}>
                <Grid.Col span={{ base: 6 }}>
                  <Text size={"16px"} c={"#999999"} mb={"6px"}>
                    Logo
                  </Text>
                  <CropImageLink
                    shape="rect"
                    placeholder={"Cập nhật logo"}
                    defaultImage={logoUrl || ImageUpload.src}
                    uploadFileThumbnail={uploadFileThumbnail}
                    aspect={1 / 1}
                    form={form}
                    name="logo"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 6 }}>
                  <Text size={"16px"} c={"#999999"} mb={"6px"}>
                    Ảnh bìa
                  </Text>
                  <CropImageLink
                    shape="rect"
                    placeholder={"Cập nhật ảnh bìa"}
                    defaultImage={dataDetail?.banner || ImageUpload.src}
                    uploadFileThumbnail={uploadFileBanner}
                    aspect={16 / 9}
                    idUpload="image-uploader-banner"
                    idResult="image-result-banner"
                    idImageContainer="image-container-banner"
                    name="banner"
                  />
                </Grid.Col>
              </Grid>
              <Grid gutter={10} mt={24}>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("code")}
                    label="Mã số"
                    type="text"
                    disabled
                    placeholder="Mã số"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("name")}
                    label="Tên chuyên gia"
                    type="text"
                    placeholder="Tên chuyên gia"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("shortName")}
                    label="Tên rút gọn"
                    type="text"
                    placeholder="Tên rút gọn"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("phoneNumber")}
                    label="Điện thoại"
                    type="text"
                    placeholder="Điện thoại"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("email")}
                    label="email"
                    type="text"
                    placeholder="email"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("website")}
                    label="Website"
                    type="text"
                    placeholder="Website"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <MultiSelect
                    size="lg"
                    radius={0}
                    withAsterisk
                    label="Tiện ích lân cận"
                    checkIconPosition="right"
                    placeholder="Tiện ích lân cận"
                    {...form.getInputProps("amenities")}
                    data={UltilitiesOptions}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 8, md: 8, lg: 8 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("address")}
                    label="Địa chỉ"
                    type="text"
                    placeholder="Địa chỉ"
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("address2")}
                    label="Địa chỉ 2"
                    type="text"
                    placeholder="Địa chỉ 2"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("provinceId")}
                    label="Tỉnh/Thành phố"
                    placeholder="Chọn tỉnh"
                    data={provinceOptions}
                    value={province}
                    onChange={async (value) => {
                      const optionsData = await getOptionsDistrict(
                        Number(value)
                      );
                      setDistrictOptions(optionsData);
                      if (value)
                        form.setFieldValue("provinceId", value?.toString());
                      form.setFieldValue("districtId", "");
                      form.setFieldValue("wardId", "");
                      setProvince(value);
                      setDistrict(null);
                      setWard(null);
                    }}
                  ></Select>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("districtId")}
                    label="Huyện/Quận"
                    placeholder="Chọn huyện/quận"
                    data={districtOptions}
                    value={district}
                    onChange={async (value) => {
                      const optionsData = await getOptionsWard(Number(value));
                      setWardOptions(optionsData);
                      if (value)
                        form.setFieldValue("districtId", value?.toString());
                      form.setFieldValue("wardId", "");
                      setDistrict(value);

                      setWard(null);
                    }}
                  ></Select>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("wardId")}
                    label="Xã/Phường"
                    placeholder="Chọn xã/phường"
                    data={wardOptions}
                    value={ward}
                    onChange={(value) => {
                      if (value)
                        form.setFieldValue("wardId", value?.toString());
                      setWard(value);
                    }}
                  ></Select>
                </Grid.Col>
              </Grid>
              <Card mt={20} pb={20}>
                <Typo size="primary" type="bold" style={{ color: "#3d4465" }}>
                  Ảnh garage
                </Typo>
                <DropZone
                  setImagesUrl={setImagesUrl}
                  imagesUrl={imagesUrl}
                  uploadFile={uploadFileImages}
                  handleChangeImage={handleChangeImage}
                />
              </Card>
              <Grid mt={24}>
                <Grid.Col span={12}>
                  <Textarea
                    size="lg"
                    radius={0}
                    label="Mô tả"
                    minRows={4}
                    autosize={true}
                    {...form.getInputProps("description")}
                    placeholder="Mô tả"
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 8, md: 4, lg: 4 }}>
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
