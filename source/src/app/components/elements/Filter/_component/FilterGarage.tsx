"use client";
import useFetch from "@/app/hooks/useFetch";
import {
  getOptionsBrands,
  getOptionsModels,
  getOptionsYearCar,
} from "@/utils/until";
import { Flex, Select } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Scroll from "@/app/components/common/Scroll";
export default function FillterListGarage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  const s = searchParams.get("s");
  const brandId = searchParams.get("brandId");
  const modelId = searchParams.get("modelId");
  const yearId = searchParams.get("yearId");
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const [brand, setBrand] = useState<any>(brandId);
  const [model, setModel] = useState<any>(modelId);
  const [year, setYear] = useState<any>(yearId);

  const { data: brandOptions, isLoading: isLoadingBrand } = useFetch({
    queryKey: ["brandOptions"],
    queryFn: () => getOptionsBrands(),
    options: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: false,
    },
  });

  useEffect(() => {
    const fetchOptionsData = async () => {
      try {
        const promises = [];

        if (brandId) {
          setBrand(brandId);
          const modelPromise = getOptionsModels(Number(brandId));
          promises.push(modelPromise.then(setModelOptions));
        }

        if (modelId) {
          const yearCarPromise = getOptionsYearCar(Number(modelId));
          promises.push(yearCarPromise.then(setYearCarOptions));
        }

        await Promise.all(promises);
      } catch (error) {
        console.error("Lỗi khi lấy các tùy chọn:", error);
      }
    };

    fetchOptionsData();
  }, [brandId, modelId]);

  useEffect(() => {
    params?.set("brand", `${year || model || brand}`);
    if (year == null) {
      params?.delete("yearId");
    }
    if (model == null) {
      params?.delete("modelId");
    }
    if (brand == null) {
      params?.delete("brandId");
      params?.delete("brand");
    }

    const path = pathname + "?" + params?.toString();
    router.push(path);
  }, [brand, model, year]);
  return (
    <Scroll>
      <Select
        value={brand}
        leftSectionPointerEvents="none"
        placeholder="Hãng xe"
        classNames={{ dropdown: styles.dropdown }}
        data={brandOptions}
        w={140}
        miw={140}
        onChange={async (value) => {
          const optionsData = await getOptionsModels(Number(value));
          setModelOptions(optionsData);
          setBrand(value);
          setModel(null);
          setYear(null);
        }}
        clearable
      />
      <Select
        leftSectionPointerEvents="none"
        placeholder="Dòng xe"
        value={model}
        w={140}
        miw={140}
        classNames={{ dropdown: styles.dropdown }}
        data={modelOptions}
        onChange={async (value) => {
          const optionsData = await getOptionsYearCar(Number(value));
          setYearCarOptions(optionsData);
          setModel(value);
          setYear(null);
        }}
        clearable
      />
      <Select
        leftSectionPointerEvents="none"
        placeholder="Năm sản xuất"
        value={year}
        w={140}
        miw={140}
        classNames={{ dropdown: styles.dropdown }}
        data={yearCarOptions}
        onChange={(value) => {
          setYear(value);
        }}
        clearable
      />
    </Scroll>
  );
}
