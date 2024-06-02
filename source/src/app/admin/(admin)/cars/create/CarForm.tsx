"use client";
import {
  Card,
  Grid,
  TextInput,
  Textarea,
  Select,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { statusOptions } from "@/constants/masterData";
import { getOptionsModels, getOptionsYearCar } from "@/utils/until";
import { useAddCar } from "../../hooks/car/useAddCar";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import { AutocompletePhone } from "../../order-manager/_component/AutoCompletePhone";
import { getOptionsCustomer, getOptionsPhone } from "../../order-manager/until";
import { useDisclosure } from "@mantine/hooks";
import AutocompleteField from "@/app/components/form/AutoCompleteField";
export default function CarForm({
  isEditing,
  dataDetail,
  isLoading,
  isPreview,
  isPending,
}: any) {
  const {
    addItem,
    updateItem,
    brandOptions,
    isLoadingBrand,
    customerOptions,
    isLoadingCustomer,
    isPendingAdd,
    isPendingUpdate,
  } = useAddCar();
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const [loadingCustomer, handlersLoadingCustomer] = useDisclosure();
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const form = useForm({
    initialValues: {
      customerId: "",
      numberPlates: "",
      color: "",
      vinNumber: "",
      machineNumber: "",
      description: "",
      status: isEditing ? dataDetail?.status : "PUBLIC",
      carStyleId: "1",
    },
    validate: {
      numberPlates: (value) => (value?.length > 0 ? null : "Vui lòng nhập..."),
      customerId: (value) => (value?.length > 0 ? null : "Vui lòng nhập..."),
    },
  });

  const handleSubmit = async (values: any) => {
    if (isEditing) {
      updateItem(values);
    } else {
      addItem(values);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isEditing && dataDetail) {
        try {
          const [models, yearCars] = await Promise.all([
            getOptionsModels(dataDetail?.carBrandId),
            getOptionsYearCar(dataDetail?.carNameId),
          ]);
          setModelOptions(models);
          setYearCarOptions(yearCars);

          form.setInitialValues(dataDetail);
          form.setValues(dataDetail);
          form.setFieldValue("customerId", dataDetail?.customerId.toString());
          const name =
            dataDetail?.customer?.phoneNumber +
            "-" +
            dataDetail?.customer?.fullName;
          setPhoneNumber(name);
          form.setFieldValue("carBrandId", dataDetail?.carBrandId.toString());
          form.setFieldValue("carNameId", dataDetail?.carNameId.toString());
          form.setFieldValue("carYearId", dataDetail?.carYearId.toString());
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (isEditing) fetchData();
  }, [dataDetail]);

  console.log(customerOptions);
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoadingBrand || isLoadingCustomer || isLoading || isPending}
        zIndex={99}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm">
              <Grid gutter={10}>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  {/* <Select
                    size="lg"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("customerId")}
                    label="Khách hàng"
                    type="text"
                    placeholder="Khách hàng"
                    data={customerOptions}
                  /> */}
                  <AutocompleteField
                    size="lg"
                    radius={0}
                    placeholder="Khách hàng"
                    w="100%"
                    label="Khách hàng"
                    value={phoneNumber}
                    onOptionSubmit={(value: any) => {
                      form.setFieldValue("customerId", value);
                    }}
                    onChange={(value: any) => {
                      setPhoneNumber(value);
                    }}
                    // error={errorPlate ? "Vui lòng nhập..." : false}
                    getOptionData={getOptionsCustomer}
                    name="customerId"
                    form={form}
                  />
                  {/* <AutocompletePhone
                    placeholder="Số điện thoại"
                    label="Số điện thoại"
                    isClear={false}
                    getOptionData={customerOptions}
                    form={form}
                    name="customerId"
                    handlersLoadingCustomer={handlersLoadingCustomer}
                  /> */}
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    withAsterisk
                    {...form.getInputProps("numberPlates")}
                    size="lg"
                    radius={0}
                    label="Biển số xe"
                    type="text"
                    placeholder="Biển số xe"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("color")}
                    label="Màu xe"
                    type="text"
                    placeholder="Màu xe"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carBrandId")}
                    label="Hãng xe"
                    placeholder="Hãng xe"
                    data={brandOptions}
                    onChange={async (value) => {
                      const optionsData = await getOptionsModels(Number(value));
                      setModelOptions(optionsData);
                      form.setFieldValue("carBrandId", value);
                      form.setFieldValue("carNameId", null);
                      form.setFieldValue("carYearId", null);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carNameId")}
                    label="Dòng xe"
                    placeholder="Dòng xe"
                    data={modelOptions}
                    onChange={async (value) => {
                      const optionsData = await getOptionsYearCar(
                        Number(value)
                      );
                      setYearCarOptions(optionsData);
                      form.setFieldValue("carNameId", value);
                      form.setFieldValue("carYearId", null);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carYearId")}
                    label="Năm sản xuất"
                    placeholder="Năm sản xuất"
                    data={yearCarOptions}
                    onChange={(value) => {
                      form.setFieldValue("carYearId", value);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("vinNumber")}
                    label="Số vin"
                    type="text"
                    placeholder="Số vin"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("machineNumber")}
                    label="Số máy"
                    type="text"
                    placeholder="Số máy"
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
        {isPreview ? (
          <FooterSavePage
            saveLoading={isPendingAdd || isPendingUpdate}
            isOk={false}
            cancelText="Quay lại"
          />
        ) : (
          <FooterSavePage
            saveLoading={isPendingAdd || isPendingUpdate}
            okText={isEditing ? "Cập nhật" : "Thêm"}
          />
        )}
      </form>
    </Box>
  );
}
