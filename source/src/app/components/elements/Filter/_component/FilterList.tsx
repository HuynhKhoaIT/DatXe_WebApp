"use client";
import useFetch from "@/app/hooks/useFetch";
import { storageKeys } from "@/constants";
import {
  getOptionsBrands,
  getOptionsDistrict,
  getOptionsModels,
  getOptionsProvince,
  getOptionsYearCar,
} from "@/utils/until";
import { getData } from "@/utils/until/localStorage";
import { Autocomplete, CloseButton, Flex, Select } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import styles from "./index.module.scss";
import FillterListGarage from "./FilterGarage";
import Scroll from "@/app/components/common/Scroll";
export default function FillterList({ isFilterLocation = true }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  const s = searchParams.get("s");
  const garageId = searchParams.get("garageId");
  const locationId = searchParams.get("locationId");

  if (garageId) {
    return <FillterListGarage />;
  }
  const brandId = searchParams.get("brandId");
  const modelId = searchParams.get("modelId");
  const yearId = searchParams.get("yearId");
  const addRess = getData(storageKeys.ADDRESS_DEFAULT);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const [districtOptions, setDistrictOptions] = useState<any>([]);
  const [province, setProvince] = useState<any>();
  const [district, setDistrict] = useState<any>();

  useEffect(() => {
    if (isFilterLocation && locationId) {
      if (addRess?.district?.id == locationId) {
        setDistrict(locationId);
        setProvince(addRess?.province?.id);
      } else if (addRess?.province?.id == locationId) {
        setProvince(locationId);
      }
    } else if (isFilterLocation) {
      setProvince(addRess?.province?.id);
      setDistrict(addRess?.district?.id);
    }
  }, []);
  const [brand, setBrand] = useState<any>(brandId);

  const [model, setModel] = useState<any>(modelId);

  const [year, setYear] = useState<any>(yearId);

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

  useEffect(() => {
    const fetchOptionsData = async () => {
      try {
        const promises = [];

        if (addRess?.province?.id) {
          const districtPromise = getOptionsDistrict(
            Number(addRess.province.id)
          );
          promises.push(districtPromise.then(setDistrictOptions));
        }

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
  }, [addRess?.province?.id, brandId, modelId]);

  // thay đổi param mỗi khi được select
  useEffect(() => {
    if (province) {
      params?.set("locationId", `${district || province}`);
    } else {
      params?.delete("locationId");
    }
    const path = pathname + "?" + params?.toString();
    router.push(path);
  }, [province, district, s, locationId]);

  // thay đổi param mỗi khi được select
  useEffect(() => {
    params?.set("brand", `${year || model || brand}`);
    if (year == null) {
      params?.delete("yearId");
    } else {
      params?.set("yearId", year);
    }
    if (model == null) {
      params?.delete("modelId");
    } else {
      params?.set("modelId", model);
    }
    if (brand == null) {
      params?.delete("brandId");
      params?.delete("brand");
    } else {
      params?.set("brandId", brand);
    }

    const path = pathname + "?" + params?.toString();
    router.push(path);
  }, [brand, model, year]);

  return (
    <Scroll>
      <Select
        placeholder="Chọn tỉnh"
        data={provinceOptions}
        value={province}
        searchable={true}
        classNames={{ dropdown: styles.dropdown }}
        miw={140}
        onChange={async (value) => {
          const optionsData: any = await getOptionsDistrict(Number(value));
          setDistrictOptions(optionsData);
          setProvince(value);
          setDistrict(null);
        }}
        clearable={true}
      />

      <Select
        placeholder="Huyện/Phường"
        classNames={{ dropdown: styles.dropdown }}
        data={districtOptions}
        searchable={true}
        value={district}
        onChange={(value) => {
          setDistrict(value);
        }}
        miw={140}
        clearable={true}
      />
      <Select
        placeholder="Hãng xe"
        classNames={{ dropdown: styles.dropdown }}
        data={brandOptions}
        searchable={true}
        value={brand}
        miw={140}
        onChange={async (value) => {
          const optionsData = await getOptionsModels(Number(value));
          setModelOptions(optionsData);
          setBrand(value);
          setModel(null);
          setYear(null);
        }}
        clearable={true}
      />
      <Select
        leftSectionPointerEvents="none"
        placeholder="Dòng xe"
        value={model}
        miw={140}
        searchable={true}
        classNames={{ dropdown: styles.dropdown }}
        data={modelOptions}
        onChange={async (value) => {
          const optionsData = await getOptionsYearCar(Number(value));
          setYearCarOptions(optionsData);
          setModel(value);
          setYear(null);
        }}
        clearable={true}
      />
      <Select
        leftSectionPointerEvents="none"
        placeholder="Năm sản xuất"
        searchable={true}
        value={year}
        miw={140}
        classNames={{ dropdown: styles.dropdown }}
        data={yearCarOptions}
        onChange={(value) => {
          setYear(value);
        }}
        clearable={true}
      />
    </Scroll>
  );
}
