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
import { Flex, Select } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FillterList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  const s = searchParams.get("s");
  const addRess = getData(storageKeys.ADDRESS_DEFAULT);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const [districtOptions, setDistrictOptions] = useState<any>([]);
  const [province, setProvince] = useState<any>(addRess?.province?.id);
  const [district, setDistrict] = useState<any>(addRess?.district?.id);

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
      if (addRess?.province?.id) {
        try {
          const optionsData = await getOptionsDistrict(
            Number(addRess?.province?.id)
          );
          setDistrictOptions(optionsData);
        } catch (error) {
          console.error("Error fetching district options:", error);
        }
      }
    };

    fetchOptionsData();
  }, [addRess?.province?.id]);

  useEffect(() => {
    params?.set("locationId", `${district || province}`);
    if (province == null) {
      params?.delete("locationId");
    }
    const path = pathname + "?" + params?.toString();
    router.push(path);
  }, [province, district, s]);

  console.log(addRess);
  return (
    <Flex gap={10} mb={20}>
      <Select
        placeholder="Chọn tỉnh"
        data={provinceOptions}
        value={province}
        onChange={async (value) => {
          const optionsData: any = await getOptionsDistrict(Number(value));
          setDistrictOptions(optionsData);
          setProvince(value);
          setDistrict(null);
        }}
        clearable
      />

      <Select
        placeholder="Huyện/Phường"
        value={district}
        data={districtOptions}
        onChange={(value) => {
          setDistrict(value);
        }}
        clearable
      />
      <Select
        leftSectionPointerEvents="none"
        placeholder="Hãng xe"
        data={brandOptions}
        onChange={async (value) => {
          const optionsData = await getOptionsModels(Number(value));
          setModelOptions(optionsData);
        }}
        clearable
      />
      <Select
        leftSectionPointerEvents="none"
        placeholder="Dòng xe"
        data={modelOptions}
        onChange={async (value) => {
          const optionsData = await getOptionsYearCar(Number(value));
          setYearCarOptions(optionsData);
        }}
        clearable
      />
      <Select
        leftSectionPointerEvents="none"
        placeholder="Năm sản xuất"
        data={yearCarOptions}
        clearable
      />
    </Flex>
  );
}
