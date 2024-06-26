"use client";
import {
  Box,
  Card,
  Grid,
  Text,
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  Button,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import { getOptionsDistrict, getOptionsWard } from "@/utils/until";
import CropImageLink from "@/app/components/common/CropImage";
import Typo from "@/app/components/elements/Typo";
import { IconQrcode } from "@tabler/icons-react";
import { AppConstants, ROLE_ADMIN, apiUrl } from "@/constants";
import { uploadFileImage } from "@/utils/uploadFile/uploadFile";
import DropZone from "../../experts/_component/DropZone";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
export default function ExpertForm({
  isEditing,
  dataDetail,
  UltilitiesOptions,
  updateItem,
  addItem,
  provinceOptions,
  createQr,
  isCreateQr,
  isSystem,
}: any) {
  const [isLoadingSave, handlerLoading] = useDisclosure();
  const [isLoadingQr, handlerLoadingQr] = useDisclosure();

  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const [imagesUrl, setImagesUrl] = useState<any>([]);
  const [qrUrl, setQrUrl] = useState(null);

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
      bitlyUrl: null,
      provinceId: "",
      districtId: "",
      wardId: "",
      name: "",
      phoneNumber: "",
    },
    validate: {
      phoneNumber: isNotEmpty("Bắt buộc"),
      name: isNotEmpty("Bắt buộc"),
      wardId: isNotEmpty("Bắt buộc"),
      districtId: isNotEmpty("Bắt buộc"),
      provinceId: isNotEmpty("Bắt buộc"),
    },
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
          setImagesUrl(JSON?.parse(dataDetail?.photos) || []);

          const [districts, wards] = await Promise.all([
            getOptionsDistrict(Number(dataDetail?.provinceId)),
            getOptionsWard(Number(dataDetail?.districtId)),
          ]);
          setDistrictOptions(districts);
          setWardOptions(wards);
          setProvince(dataDetail?.provinceId?.toString());
          setDistrict(dataDetail?.districtId?.toString());
          setWard(dataDetail?.wardId?.toString());
          setLogoUrl(dataDetail?.logo);
          setBannerUrl(dataDetail?.banner);
          setQrUrl(dataDetail?.qrCodeBank);
          form.setFieldValue("provinceId", dataDetail?.provinceId?.toString());
          form.setFieldValue("districtId", dataDetail?.districtId?.toString());
          form.setFieldValue("wardId", dataDetail?.wardId?.toString());
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (isEditing) fetchData();
  }, [dataDetail]);

  const uploadFileThumbnail = async (file: File) => {
    try {
      const imageUrl = await uploadFileImage(file);
      form.setFieldValue("logo", imageUrl);
      setLogoUrl(imageUrl);
      return imageUrl;
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
  const uploadFileQrCodeBank = async (file: File) => {
    try {
      const imageUrl = await uploadFileImage(file);

      form.setFieldValue("qrCodeBank", imageUrl);
      setQrUrl(imageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadFileImages = async (file: File) => {
    try {
      const imageUrl = await uploadFileImage(file);

      return imageUrl;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    handlerLoading.open();
    values.photos = JSON.stringify(imagesUrl);
    if (isEditing) {
      const res = await updateItem(values);
      if (res) {
        router.back();
        router.refresh();
        toast.success("Cập nhật thành công");
      } else {
        router.back();
        router.refresh();
        toast.error("Cập nhật thất bại");
      }
    } else {
      const res = await addItem(values);
      if (res) {
        router.back();
        router.refresh();
        toast.success("Thêm thành công");
      } else {
        router.back();
        router.refresh();
        toast.error("Thêm thất bại");
      }
    }
    handlerLoading.close();
  };

  return (
    <Box pos="relative">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm">
              <Grid gutter={12}>
                <Grid.Col span={{ base: 4 }}>
                  <Text size={"16px"} c={"#999999"} mb={"6px"}>
                    Logo
                  </Text>
                  <CropImageLink
                    shape="rect"
                    placeholder={"Cập nhật logo"}
                    defaultImage={
                      logoUrl && `${AppConstants.contentRootUrl}${logoUrl}`
                    }
                    uploadFileThumbnail={uploadFileThumbnail}
                    aspect={1 / 1}
                    form={form}
                    name="logo"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 4 }}>
                  <Text size={"16px"} c={"#999999"} mb={"6px"}>
                    Ảnh bìa
                  </Text>
                  <CropImageLink
                    shape="rect"
                    placeholder={"Cập nhật ảnh bìa"}
                    defaultImage={
                      bannerUrl && `${AppConstants.contentRootUrl}${bannerUrl}`
                    }
                    uploadFileThumbnail={uploadFileBanner}
                    aspect={16 / 4}
                    idUpload="image-uploader-banner"
                    idResult="image-result-banner"
                    idImageContainer="image-container-banner"
                    name="banner"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 4 }}>
                  <Text size={"16px"} c={"#999999"} mb={"6px"}>
                    QR thanh toán
                  </Text>
                  <CropImageLink
                    shape="rect"
                    placeholder={"Cập nhật QR thanh toán"}
                    defaultImage={
                      qrUrl && `${AppConstants.contentRootUrl}${qrUrl}`
                    }
                    uploadFileThumbnail={uploadFileQrCodeBank}
                    aspect={1 / 1}
                    idUpload="image-uploader-qrCodeBank"
                    idResult="image-result-qrCodeBank"
                    idImageContainer="image-container-qrCodeBank"
                    name="qrCodeBank"
                  />
                </Grid.Col>
              </Grid>

              <Grid gutter={10} mt={24}>
                <Grid.Col span={{ base: 6, sm: 3, md: 2, lg: 2 }}>
                  <TextInput
                    size="md"
                    radius={0}
                    {...form.getInputProps("code")}
                    label="Mã số"
                    type="text"
                    disabled
                    placeholder="Mã số"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 6, sm: 3, md: 2, lg: 2 }}>
                  <TextInput
                    size="md"
                    radius={0}
                    {...form.getInputProps("routeId")}
                    label="ID"
                    type="text"
                    disabled={!isSystem}
                    placeholder="ID"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    withAsterisk
                    size="md"
                    radius={0}
                    {...form.getInputProps("name")}
                    label="Tên chuyên gia"
                    type="text"
                    placeholder="Tên chuyên gia"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="md"
                    radius={0}
                    {...form.getInputProps("shortName")}
                    label="Tên rút gọn"
                    type="text"
                    placeholder="Tên rút gọn"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="md"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("phoneNumber")}
                    label="Điện thoại"
                    type="text"
                    placeholder="Điện thoại"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="md"
                    radius={0}
                    {...form.getInputProps("email")}
                    label="email"
                    type="text"
                    placeholder="email"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="md"
                    radius={0}
                    {...form.getInputProps("bitlyUrl")}
                    label="Qr code"
                    readOnly
                    type="text"
                    placeholder="Qr code"
                  />
                </Grid.Col>
                {/* <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="md"
                    radius={0}
                    {...form.getInputProps("website")}
                    label="Website"
                    type="text"
                    placeholder="Website"
                  />
                </Grid.Col> */}
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                  <MultiSelect
                    size="md"
                    radius={0}
                    withAsterisk
                    label="Tiện ích lân cận"
                    checkIconPosition="right"
                    placeholder="Tiện ích lân cận"
                    {...form.getInputProps("amenities")}
                    data={UltilitiesOptions}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <TextInput
                    size="md"
                    radius={0}
                    {...form.getInputProps("wifiInfo")}
                    label="Thông tin wifi"
                    type="text"
                    placeholder="Tên wifi - mật khẩu"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8, md: 4, lg: 4 }}>
                  <Select
                    size="md"
                    radius={0}
                    {...form.getInputProps("provinceId")}
                    label="Tỉnh/Thành phố"
                    placeholder="Chọn tỉnh"
                    withAsterisk
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
                    size="md"
                    radius={0}
                    {...form.getInputProps("districtId")}
                    label="Huyện/Quận"
                    withAsterisk
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
                    size="md"
                    radius={0}
                    {...form.getInputProps("wardId")}
                    label="Xã/Phường"
                    withAsterisk
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
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                  <TextInput
                    size="md"
                    radius={0}
                    {...form.getInputProps("address")}
                    label="Địa chỉ"
                    type="text"
                    placeholder="Địa chỉ"
                  />
                </Grid.Col>
              </Grid>
              <Typo
                size="primary"
                type="bold"
                style={{ color: "#3d4465", marginTop: 20 }}
              >
                Hình ảnh Showroom
              </Typo>
              <Card mt={20} pb={20}>
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
                    size="md"
                    radius={0}
                    label="Mô tả"
                    minRows={4}
                    autosize={true}
                    {...form.getInputProps("description")}
                    placeholder="Mô tả"
                  />
                </Grid.Col>

                {isSystem && (
                  <Grid.Col span={{ base: 12, sm: 8, md: 4, lg: 4 }}>
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
                )}
              </Grid>
            </Card>
          </Grid.Col>
        </Grid>

        <FooterSavePage
          saveLoading={isLoadingSave}
          okText={isEditing ? "Cập nhật" : "Thêm"}
        >
          {isCreateQr ? (
            <></>
          ) : (
            <Button
              size="md"
              radius={0}
              h={{ base: 42, md: 50, lg: 50 }}
              variant="outline"
              key="cancel"
              color="blue"
              loading={isLoadingQr}
              leftSection={<IconQrcode size={16} />}
              onClick={async () => {
                handlerLoadingQr.open();
                await createQr({ garageId: dataDetail?.id });
                router.refresh();
                handlerLoadingQr.close();
              }}
            >
              Tạo Qr code
            </Button>
          )}
        </FooterSavePage>
      </form>
    </Box>
  );
}
