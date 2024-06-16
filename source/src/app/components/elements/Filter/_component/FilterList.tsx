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
  const [provinceName, setProvinceName] = useState<any>();
  const [district, setDistrict] = useState<any>();
  const [districtName, setDistrictName] = useState<any>();

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
  const [brandName, setBrandName] = useState<any>();

  const [model, setModel] = useState<any>(modelId);
  const [modelName, setModelName] = useState<any>();

  const [year, setYear] = useState<any>(yearId);
  const [yearName, setYearName] = useState<any>();

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

  // set giá trị mặc định
  useEffect(() => {
    if (province && provinceOptions) {
      setProvinceName(
        getLabelByValue({ data: provinceOptions, value: province })
      );
    }
    if (district && districtOptions) {
      setDistrictName(
        getLabelByValue({ data: districtOptions, value: district })
      );
    }
  }, [provinceOptions, districtOptions, province, district]);
  // set giá trị mặc định thông tin xe
  useEffect(() => {
    if (brandId && brandOptions) {
      setBrandName(getLabelByValue({ data: brandOptions, value: brandId }));
    }
    if (modelId && modelOptions) {
      setModelName(getLabelByValue({ data: modelOptions, value: modelId }));
    }
    if (yearId && modelOptions) {
      setYearName(getLabelByValue({ data: yearCarOptions, value: yearId }));
    }
  }, [brandOptions, modelOptions, yearCarOptions, brandId, modelId, yearId]);

  return (
    <Scroll>
      <Autocomplete
        placeholder="Chọn tỉnh"
        data={provinceOptions}
        value={provinceName}
        classNames={{ dropdown: styles.dropdown }}
        miw={140}
        onChange={async (value) => {
          setProvinceName(value);
        }}
        onOptionSubmit={async (value) => {
          const optionsData: any = await getOptionsDistrict(Number(value));
          setDistrictOptions(optionsData);
          setProvince(value);
          setDistrictName("");
          setDistrict(null);
        }}
        rightSection={
          <CloseButton
            size="sm"
            variant="transparent"
            onClick={() => {
              setProvinceName("");
              setDistrictName("");
              setProvince(null);
              setDistrict(null);
            }}
            style={{ display: provinceName ? undefined : "none" }}
          />
        }
      />

      <Autocomplete
        placeholder="Huyện/Phường"
        classNames={{ dropdown: styles.dropdown }}
        data={districtOptions}
        value={districtName}
        onChange={async (value) => {
          setDistrictName(value);
        }}
        onOptionSubmit={(value) => {
          setDistrict(value);
        }}
        miw={140}
        rightSection={
          <CloseButton
            size="sm"
            variant="transparent"
            onClick={() => {
              setDistrict(null);
              setDistrictName("");
            }}
            style={{ display: district ? undefined : "none" }}
          />
        }
      />
      <Autocomplete
        placeholder="Hãng xe"
        classNames={{ dropdown: styles.dropdown }}
        data={brandOptions}
        value={brandName}
        onChange={async (value) => {
          setBrandName(value);
        }}
        miw={140}
        onOptionSubmit={async (value) => {
          const optionsData = await getOptionsModels(Number(value));
          setModelOptions(optionsData);
          setBrand(value);
          setModel(null);
          setYear(null);
        }}
        rightSection={
          <CloseButton
            size="sm"
            variant="transparent"
            onClick={() => {
              setBrand(null);
              setBrandName("");
              setModel(null);
              setModelName("");
              setYearName("");
              setYear(null);
            }}
            style={{ display: brandName ? undefined : "none" }}
          />
        }
      />
      <Autocomplete
        leftSectionPointerEvents="none"
        placeholder="Dòng xe"
        value={modelName}
        miw={140}
        classNames={{ dropdown: styles.dropdown }}
        data={modelOptions}
        onChange={async (value) => {
          setModelName(value);
        }}
        onOptionSubmit={async (value) => {
          const optionsData = await getOptionsYearCar(Number(value));
          setYearCarOptions(optionsData);
          setModel(value);
          setYear(null);
        }}
        rightSection={
          <CloseButton
            size="sm"
            variant="transparent"
            onClick={() => {
              setModel(null);
              setModelName("");
              setYearName("");
              setYear(null);
            }}
            style={{ display: modelName ? undefined : "none" }}
          />
        }
      />
      <Autocomplete
        leftSectionPointerEvents="none"
        placeholder="Năm sản xuất"
        value={yearName}
        miw={140}
        classNames={{ dropdown: styles.dropdown }}
        data={yearCarOptions}
        onChange={(value) => {
          setYearName(value);
        }}
        onOptionSubmit={(value) => {
          setYear(value);
        }}
        rightSection={
          <CloseButton
            size="sm"
            variant="transparent"
            onClick={() => {
              setYearName("");
              setYear(null);
            }}
            style={{ display: yearName ? undefined : "none" }}
          />
        }
      />
    </Scroll>
  );
}

// Helper function to get label by value
const getLabelByValue = ({ data, value }: any) => {
  return data?.find((item: any) => item.value === value)?.label || "";
};
