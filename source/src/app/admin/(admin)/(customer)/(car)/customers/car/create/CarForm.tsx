"use client";
import { Card, Grid, TextInput, Textarea, Select, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { statusOptions } from "@/constants/masterData";
import { getOptionsModels, getOptionsYearCar } from "@/utils/until";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import { useRouter, useSearchParams } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import DateField from "@/app/components/form/DateField";
export default function CarForm({
  isEditing,
  dataDetail,
  isPreview,
  createItem,
  customerOptions,
  brandOptions,
  updateItem,
}: any) {
  const router = useRouter();
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const [isLoadingSave, handlersLoading] = useDisclosure();
  const searchParams = useSearchParams();
  const customerId: any = searchParams.get("customerId");
  const form = useForm({
    initialValues: {
      customerId: customerId,
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
    handlersLoading.open();
    if (isEditing) {
      await updateItem(values);
      toast.success("Cập nhật thành công");
      router.back();
      router.refresh();
    } else {
      await createItem(values);
      toast.success("Thêm thành công");
      router.back();
      router.refresh();
    }
    handlersLoading.close();
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
          form.setFieldValue("carBrandId", dataDetail?.carBrandId.toString());
          form.setFieldValue("carNameId", dataDetail?.carNameId.toString());
          form.setFieldValue("carYearId", dataDetail?.carYearId.toString());
          if (dataDetail?.maintenanceDeadline) {
            form.setFieldValue(
              "maintenanceDeadline",
              dayjs(dataDetail?.maintenanceDeadline).toDate()
            );
          }
          if (dataDetail?.registrationDeadline) {
            form.setFieldValue(
              "registrationDeadline",
              dayjs(dataDetail?.registrationDeadline).toDate()
            );
          }
          if (dataDetail?.materialInsuranceDeadline) {
            form.setFieldValue(
              "materialInsuranceDeadline",
              dayjs(dataDetail?.materialInsuranceDeadline).toDate()
            );
          }
          if (dataDetail?.civilInsuranceDeadline) {
            form.setFieldValue(
              "civilInsuranceDeadline",
              dayjs(dataDetail?.civilInsuranceDeadline).toDate()
            );
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (isEditing) fetchData();
  }, [dataDetail]);
  return (
    <Box pos="relative">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm">
              <Grid gutter={10}>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="md"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("customerId")}
                    label="Khách hàng"
                    type="text"
                    placeholder="Khách hàng"
                    data={customerOptions}
                    disabled
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    withAsterisk
                    {...form.getInputProps("numberPlates")}
                    size="md"
                    radius={0}
                    label="Biển số xe"
                    type="text"
                    placeholder="Biển số xe"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="md"
                    radius={0}
                    {...form.getInputProps("color")}
                    label="Màu xe"
                    type="text"
                    placeholder="Màu xe"
                    disabled={isPreview}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="md"
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
                    disabled={isPreview}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="md"
                    disabled={isPreview}
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
                    size="md"
                    disabled={isPreview}
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
                    size="md"
                    disabled={isPreview}
                    radius={0}
                    {...form.getInputProps("vinNumber")}
                    label="Số vin"
                    type="text"
                    placeholder="Số vin"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    disabled={isPreview}
                    size="md"
                    radius={0}
                    {...form.getInputProps("machineNumber")}
                    label="Số máy"
                    type="text"
                    placeholder="Số máy"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <DateField
                    size="md"
                    radius={0}
                    {...form.getInputProps("maintenanceDeadline")}
                    label="Hạn bảo dưỡng"
                    placeholder="Hạn bảo dưỡng"
                    clearable={true}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <DateField
                    size="md"
                    radius={0}
                    {...form.getInputProps("registrationDeadline")}
                    label="Hạng đăng kiểm"
                    placeholder="Hạng đăng kiểm"
                    clearable={true}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <DateField
                    {...form.getInputProps("materialInsuranceDeadline")}
                    label="Hạn BHVC"
                    size="md"
                    radius={0}
                    placeholder="Hạn BHVC"
                    clearable={true}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <DateField
                    size="md"
                    radius={0}
                    {...form.getInputProps("civilInsuranceDeadline")}
                    label="Hạn BHDS"
                    placeholder="Hạn BHDS"
                    clearable={true}
                  />
                </Grid.Col>
                {/* <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="md"
                    radius={0}
                    disabled={isPreview}
                    {...form.getInputProps("status")}
                    label="Trạng thái"
                    checkIconPosition="right"
                    placeholder="Trạng thái"
                    data={statusOptions}
                  />
                </Grid.Col> */}
              </Grid>
              <Grid mt={24}>
                <Grid.Col span={12}>
                  <Textarea
                    size="md"
                    radius={0}
                    disabled={isPreview}
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
        {!isPreview ? (
          <FooterSavePage
            saveLoading={isLoadingSave}
            okText={isEditing ? "Cập nhật" : "Thêm"}
          />
        ) : (
          <FooterSavePage isOk={false} cancelText="Quay lại" />
        )}
      </form>
    </Box>
  );
}
