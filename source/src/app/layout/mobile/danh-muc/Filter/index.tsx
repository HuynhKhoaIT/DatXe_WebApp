"use client";
import Container from "@/app/components/common/Container";
import styles from "./index.module.scss";
import { Button, Flex, Group, Switch } from "@mantine/core";
import IconFilter from "@/assets/icons/filter.svg";
import IconSwitch from "@/assets/icons/switch.svg";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import FilterBox from "./FilterBox";
import SliderRange from "./SliderRange";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useFetch from "@/app/hooks/useFetch";
import { QUERY_KEY } from "@/constants";
import { getOptionsCategories, getOptionsCategoriesAdmin } from "@/utils/until";
const DynamicNavFilter = dynamic(
  () => import("@/app/layout/common/mobile/NavDrawer"),
  {
    ssr: false,
  }
);
const Filter = ({ kindProduct }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  const [openedNav, { open: openNav, close: closeNav }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      isProduct: null,
      fieldId: null,
    },

    validate: {},
  });

  const handleSubmit = (values: any) => {
    Object.entries(values).forEach(([key, value]: any) => {
      if (value !== null) {
        params.set(key, value);
      }
    });

    const path = pathname + "?" + params.toString();
    router.push(path);
    closeNav();
  };
  const handleReset = () => {
    params.delete("categoryId");
    params.delete("isProduct");

    var path = pathname + params?.toString();
    router.push(path);
    closeNav();
  };

  function handleClick(value: any) {
    params?.set("isProduct", `${value}`);

    const path = pathname + "?" + params?.toString();
    router.push(path);
  }

  const {
    data: categoryOptions,
    isLoading: isLoadingCategory,
    isError,
  } = useFetch({
    queryKey: [QUERY_KEY.optionsCategory, "admin"],
    queryFn: () => getOptionsCategoriesAdmin(),
    options: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: false,
    },
  });

  return (
    <Container>
      <Group py={20} justify="space-between">
        {/* <Switch
          classNames={{ trackLabel: styles.trackLabel, track: styles.track }}
          thumbIcon={<img src={IconSwitch.src} />}
          color="#292A2E"
          size="xl"
          offLabel={"Dịch vụ"}
          onLabel={"Sản phẩm"}
          onChange={(event) => handleClick(event.currentTarget.checked)}
        /> */}
        <Button
          color="#2D3C52"
          h={34}
          leftSection={<img src={IconFilter.src} />}
          onClick={openNav}
        >
          Lọc
        </Button>
      </Group>
      <DynamicNavFilter
        open={openedNav}
        onClose={() => closeNav()}
        direction="right"
        headerTitle="Bộ lọc"
      >
        <ul className={styles.nav}>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            {/* <SliderRange step={10} min={0} max={100000000} label="Giá" /> */}
            <FilterBox
              options={kindProduct}
              queryKey="isProduct"
              queryName="Loại"
              form={form}
            />
            <FilterBox
              options={categoryOptions}
              queryKey="categoryId"
              queryName="Danh mục"
              form={form}
            />
            <Flex gap={10} mt={32}>
              <Button w={"50%"} type="submit" color={"var(--primary-color)"}>
                Lọc
              </Button>
              <Button
                w={"50%"}
                variant="outline"
                color="gray"
                onClick={() => {
                  form.reset();
                  handleReset();
                }}
              >
                Xoá bộ lọc
              </Button>
            </Flex>
          </form>
        </ul>
      </DynamicNavFilter>
    </Container>
  );
};

export default Filter;
