import {
  getOptionsBrands,
  getOptionsModels,
  getOptionsYearCar,
} from "@/utils/until";
import { Button, Grid, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModalAddCar({ openModal, close, handleAdd }: any) {
  const [brandOptions, setBrandOptions] = useState<any>([]);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const router = useRouter();
  const [loading, handlers] = useDisclosure();

  const form = useForm({
    initialValues: {
      numberPlates: "",
    },
    validate: {
      numberPlates: (value) => (value?.length > 0 ? null : "Vui lòng nhập..."),
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      handlers.open();
      const brands = await getOptionsBrands();
      setBrandOptions(brands);
      handlers.close();
    };

    if (openModal) {
      fetchData();
    }
  }, [openModal]);

  const handleSubmit = async (values: any) => {
    try {
      handlers.open();
      await handleAdd(values);
      router.refresh();
      close();
    } catch (error) {
    } finally {
      handlers.close();
    }
  };

  return (
    <Modal
      title="Thêm xe"
      opened={openModal}
      onClose={close}
      lockScroll
      centered
      closeOnClickOutside={false}
      radius={0}
      size={500}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={16}>
          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              {...form.getInputProps("numberPlates")}
              size="md"
              label="Biển số xe"
              type="text"
              placeholder="Biển số xe"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <Select
              size="md"
              {...form.getInputProps("carBrandId")}
              label="Hãng xe"
              placeholder="Hãng xe"
              searchable={true}
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
              size="md"
              searchable={true}
              {...form.getInputProps("carNameId")}
              label="Dòng xe"
              placeholder="Dòng xe"
              data={modelOptions}
              onChange={async (value) => {
                const optionsData = await getOptionsYearCar(Number(value));
                setYearCarOptions(optionsData);
                form.setFieldValue("carNameId", value);
                form.setFieldValue("carYearId", null);
              }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <Select
              size="md"
              searchable={true}
              {...form.getInputProps("carYearId")}
              label="Năm sản xuất"
              placeholder="Năm sản xuất"
              data={yearCarOptions}
              onChange={(value) => {
                form.setFieldValue("carYearId", value);
              }}
            />
          </Grid.Col>
        </Grid>
        <Group justify="end" mt={60}>
          <Button
            loading={loading}
            style={{ marginLeft: "12px" }}
            type="submit"
            variant="filled"
            color="var(--primary-color)"
            leftSection={<IconPlus size={16} />}
          >
            Thêm
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
