import { getOptionsModels, getOptionsYearCar } from "@/utils/until";
import { Grid, Select, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

export default function InfoCarNew({ form, brandOptions, styles }: any) {
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);

  return (
    <>
      <Grid mt="md" justify="center">
        <Grid.Col span={6} className="input-plate">
          <TextInput
            classNames={{ input: styles.input }}
            size="lg"
            radius={0}
            {...form.getInputProps("numberPlates")}
            type="text"
            placeholder="Biển số"
          />
        </Grid.Col>
      </Grid>

      <Grid gutter={10} mt="md">
        <Grid.Col span={4}>
          <Select
            size="lg"
            radius={0}
            classNames={{ input: styles.input }}
            {...form.getInputProps("carBrandId")}
            label="Hãng xe"
            type="text"
            data={brandOptions}
            placeholder="Hãng xe"
            onChange={async (value) => {
              const optionsData = await getOptionsModels(Number(value));
              setModelOptions(optionsData);
              form.setFieldValue("carBrandId", value);
              form.setFieldValue("carNameId", null);
              form.setFieldValue("carYearId", null);
            }}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            size="lg"
            radius={0}
            classNames={{ input: styles.input }}
            {...form.getInputProps("carNameId")}
            label="Dòng xe"
            type="text"
            data={modelOptions}
            placeholder="Dòng xe"
            onChange={async (value) => {
              const optionsData = await getOptionsYearCar(Number(value));
              setYearCarOptions(optionsData);
              form.setFieldValue("carNameId", value);
              form.setFieldValue("carYearId", null);
            }}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            size="lg"
            radius={0}
            classNames={{ input: styles.input }}
            {...form.getInputProps("carYearId")}
            label="Năm SX"
            data={yearCarOptions}
            type="text"
            placeholder="Năm sản xuất"
            onChange={(value) => {
              form.setFieldValue("carYearId", value);
            }}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
