"use client";
import {
  Box,
  Card,
  Grid,
  TextInput,
  Select,
  LoadingOverlay,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import { useSearchParams } from "next/navigation";
import { useAddModel } from "@/app/admin/(admin)/hooks/system-car/Model/useAddModelCar";
export default function BrandCarForm({ isEditing, dataDetail }: any) {
  const { addItem, updateItem } = useAddModel();
  const [loading, handlers] = useDisclosure();
  const searchParam = useSearchParams();
  const brandId = searchParam.get("brandId");
  const brandName = searchParam.get("brandName");

  const form = useForm({
    initialValues: {
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

  const handleSubmit = async (values: any) => {
    values.parentId = brandId;
    values.type = "CARNAME";
    handlers.open();
    if (isEditing) {
      updateItem(values);
    } else {
      addItem(values);
    }
    handlers.close();
  };

  return (
    <Box pos="relative" w={800}>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm">
              <Grid gutter={10} mt={24}>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    label="Tên hãng xe"
                    type="text"
                    value={brandName || ""}
                    placeholder="Tên hãng xe"
                    disabled
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("title")}
                    label="Tên dòng xe"
                    type="text"
                    placeholder="Tên dòng xe"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
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
                <Grid.Col span={12}>
                  <Textarea
                    size="lg"
                    radius={0}
                    label="Mô tả chi tiết"
                    minRows={2}
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
