"use client";
import {
  Card,
  Grid,
  TextInput,
  Textarea,
  Select,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { sexOptions, statusOptions } from "@/constants/masterData";
import DateField from "@/app/components/form/DateField";
import dayjs from "dayjs";
import FooterSavePage from "../../../_component/FooterSavePage";
import { getOptionsDistrict, getOptionsWard } from "@/utils/until";
import { useAddCustomer } from "../../hooks/customer/useAddCustomer";
export default function CustomersForm({
  isEditing,
  dataDetail,
  isLoading,
}: any) {
  const {
    addItem,
    updateItem,
    provinceOptions,
    isLoadingProvince,
    isPendingUpdate,
    isPendingAdd,
  } = useAddCustomer();

  const [province, setProvince] = useState<any>();
  const [district, setDistrict] = useState<any>();
  const [ward, setWard] = useState<any>();

  const form = useForm({
    validateInputOnBlur: true,

    initialValues: {
      fullName: "",
      cityId: "",
      description: "",
      phoneNumber: "",
      districtId: "",
      wardId: "",
      address: "",
      status: isEditing ? dataDetail?.status : "PUBLIC",
    },
    validate: {
      fullName: (value) => (value.length < 1 ? "Không được để trống" : null),
      phoneNumber: (value) =>
        value
          ? /^0[1-9][0-9]{8}$/.test(value)
            ? null
            : "Số điện thoại sai định dạng"
          : null,
    },
  });

  const handleSubmit = async (values: any) => {
    if (isEditing) {
      updateItem(values);
    } else {
      addItem(values);
    }
  };

  const [districtOptions, setDistrictOptions] = useState<any>([]);
  const [wardOptions, setWardOptions] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isEditing && dataDetail) {
        try {
          const [districts, wards] = await Promise.all([
            getOptionsDistrict(Number(dataDetail?.cityId)),
            getOptionsWard(Number(dataDetail?.districtId)),
          ]);
          setDistrictOptions(districts);
          setWardOptions(wards);

          form.setInitialValues(dataDetail);
          form.setValues(dataDetail);
          form.setFieldValue("cityId", dataDetail?.cityId?.toString());
          setProvince(dataDetail?.cityId?.toString());
          form.setFieldValue("districId", dataDetail?.districtId?.toString());
          setDistrict(dataDetail?.districtId?.toString());
          form.setFieldValue("wardId", dataDetail?.wardId?.toString());
          setWard(dataDetail?.wardId?.toString());
          if (dataDetail?.dob)
            form.setFieldValue("dob", dayjs(dataDetail?.dob).toDate());
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    if (isEditing) fetchData();
  }, [dataDetail]);
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoadingProvince || isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm">
              <Grid gutter={10} mt={24}>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("fullName")}
                    label="Họ và tên"
                    type="text"
                    placeholder="Họ và tên"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    // withAsterisk
                    {...form.getInputProps("phoneNumber")}
                    label="Số điện thoại"
                    type="text"
                    placeholder="Số điện thoại"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 6, sm: 4, md: 2, lg: 2 }}>
                  <DateField
                    {...form.getInputProps("dob")}
                    label="Ngày sinh"
                    placeholder="Ngày sinh"
                    clearable={true}
                    maxDate={new Date()}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 6, sm: 4, md: 2, lg: 2 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("sex")}
                    label="Giới tính"
                    checkIconPosition="right"
                    placeholder="Giới tính"
                    data={sexOptions}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
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
                        form.setFieldValue("cityId", value?.toString());
                      form.setFieldValue("districtId", "");
                      form.setFieldValue("wardId", "");
                      setProvince(value);
                      setDistrict(null);
                      setWard(null);
                    }}
                  ></Select>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
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
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
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
                <Grid.Col span={{ base: 12, sm: 8, md: 8, lg: 8 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    // withAsterisk
                    {...form.getInputProps("address")}
                    label="Địa chỉ"
                    type="text"
                    placeholder="Địa chỉ"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("status")}
                    label="Trạng thái"
                    checkIconPosition="right"
                    placeholder="Trạng thái"
                    data={statusOptions}
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
          saveLoading={isPendingUpdate || isPendingAdd}
          okText={isEditing ? "Cập nhật" : "Thêm"}
        />
      </form>
    </Box>
  );
}