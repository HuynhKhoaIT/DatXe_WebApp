"use client";
import {
  Autocomplete,
  Button,
  Flex,
  Grid,
  Select,
  Tabs,
  TextInput,
} from "@mantine/core";
import Truck from "@/assets/icons/truck.svg";
import Call from "@/assets/icons/call.svg";
import Container from "@/app/components/common/Container";
import styles from "./index.module.scss";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getOptionsBrands,
  getOptionsModels,
  getOptionsProvince,
  getOptionsYearCar,
} from "@/utils/until";
import useFetch from "@/app/hooks/useFetch";
export default function BookForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);

  const { data: provinceOptions, isLoading: isLoading } = useFetch({
    queryKey: ["provinceOptions"],
    queryFn: () => getOptionsProvince(),
  });

  const { data: brandOptions, isLoading: isLoadingBrand } = useFetch({
    queryKey: ["brandOptions"],
    queryFn: () => getOptionsBrands(),
    options: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: false,
    },
  });
  const router = useRouter();
  const icon = <img src={ArrowDown.src} />;
  const form = useForm({
    initialValues: {},
    validate: {},
  });
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);

  const handleSubmit = async (values: any) => {
    let brand = "";
    // if (values?.provinceId) {
    //   queryString = "provinceId" + "=" + values?.provinceId;
    // }
    if (values?.carBrandId) {
      brand = values?.carBrandId;
      params.set("brandId", values?.carBrandId);
    }
    if (values?.carNameId) {
      brand = values?.carNameId;
      params.set("modelId", values?.carNameId);
    }
    if (values?.carYearId) {
      brand = values?.carYearId;
      params.set("yearId", values?.carYearId);
    }
    if (brand != "") {
      params.set("brand", brand);
    }

    try {
      const path = pathname + "tim-kiem" + "?" + params?.toString();
      router.push(path);
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <Tabs defaultValue="search" classNames={{ list: styles.list }}>
          <Tabs.List>
            <Tabs.Tab value="search" leftSection={<img src={Truck.src} />}>
              Tìm kiếm
            </Tabs.Tab>
            <Tabs.Tab value="appointment" leftSection={<img src={Call.src} />}>
              Hẹn lịch
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="search">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Grid gutter={16}>
                <Grid.Col span={10}>
                  <Flex mt={16}>
                    <Autocomplete
                      {...form.getInputProps("carBrandName")}
                      classNames={{ input: styles.input1 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Hãng xe"
                      data={brandOptions}
                      onOptionSubmit={async (value) => {
                        console.log(value);
                        const optionsData = await getOptionsModels(
                          Number(value)
                        );
                        setModelOptions(optionsData);
                        form.setFieldValue("carBrandId", value);
                        form.setFieldValue("carNameId", null);
                        form.setFieldValue("carYearId", null);
                      }}
                    />
                    <Autocomplete
                      {...form.getInputProps("carNameName")}
                      classNames={{ input: styles.input3 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Dòng xe"
                      data={modelOptions}
                      onOptionSubmit={async (value) => {
                        const optionsData = await getOptionsYearCar(
                          Number(value)
                        );
                        setYearCarOptions(optionsData);
                        form.setFieldValue("carNameId", value);
                        form.setFieldValue("carYearId", null);
                      }}
                    />
                    <Autocomplete
                      {...form.getInputProps("carYearName")}
                      classNames={{ input: styles.input4 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Năm sản xuất"
                      data={yearCarOptions}
                      onOptionSubmit={(value) => {
                        form.setFieldValue("carYearId", value);
                      }}
                    />
                  </Flex>
                </Grid.Col>
                <Grid.Col span={2} mt={16}>
                  <Button
                    h={54}
                    style={{ width: "100%" }}
                    color={"var(--yellow-btn)"}
                    type="submit"
                  >
                    Tìm kiếm
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="appointment">
            <form>
              <Grid gutter={16}>
                <Grid.Col span={10}>
                  <Flex mt={16}>
                    <Select
                      classNames={{ input: styles.input1 }}
                      variant="unstyled"
                      leftSection={icon}
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Vị trí"
                      data={["React", "Angular", "Vue", "Svelte"]}
                    />
                    <Select
                      classNames={{ input: styles.input2 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Hãng xe"
                      data={["React", "Angular", "Vue", "Svelte"]}
                    />
                    <Select
                      classNames={{ input: styles.input3 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Dòng xe"
                      data={modelOptions}
                      onChange={async (value) => {
                        const optionsData = await getOptionsYearCar(
                          Number(value)
                        );
                        form.setFieldValue("carNameId", value);
                      }}
                    />
                    <Select
                      classNames={{ input: styles.input4 }}
                      leftSection={icon}
                      variant="unstyled"
                      leftSectionPointerEvents="none"
                      rightSection={<></>}
                      placeholder="Năm sản xuất"
                      data={yearCarOptions}
                      onChange={(value) => {
                        form.setFieldValue("carYearId", value);
                      }}
                    />
                  </Flex>
                </Grid.Col>
                <Grid.Col span={2} mt={16}>
                  <Button
                    h={54}
                    style={{ width: "100%" }}
                    color={"var(--yellow-btn)"}
                  >
                    Tìm kiếm
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  );
}
