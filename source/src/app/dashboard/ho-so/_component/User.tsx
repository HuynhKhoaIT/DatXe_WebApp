"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextInput,
  Group,
  Card,
  Text,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";

import {
  getOptionsDistrict,
  getOptionsProvince,
  getOptionsWard,
} from "@/utils/until";
import useFetch from "@/app/hooks/useFetch";
import Typo from "@/app/components/elements/Typo";
import DateField from "@/app/components/form/DateField";
import CropImageLink from "@/app/components/common/CropImage";
import axios from "axios";
import { QUERY_KEY } from "@/constants";
import { useAddAccount } from "../../hooks/profile/useAddProfile";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { toast } from "react-toastify";
// import { useFormState } from "react-dom";

export default function UserProfile({ myAccount, handleUpdate }: any) {
  // const [state, formAction] = useFormState(createUser, initialState);

  const [districtOptions, setDistrictOptions] = useState<any>([]);
  const [wardOptions, setWardOptions] = useState<any>([]);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

  const [isLoading, handlerLoading] = useDisclosure(false);
  const { data: provinceOptions, isLoading: isLoadingProvince } = useFetch({
    queryKey: [QUERY_KEY.optionsProvince],
    queryFn: () => getOptionsProvince(),
  });

  const router = useRouter();
  const form = useForm({
    initialValues: {
      fullName: myAccount?.fullName || "",
    },

    validate: {
      fullName: (value) => (value.length > 1 ? null : "Vui lòng nhập tên"),
    },
  });
  const uploadFileThumbnail = async (file: File) => {
    try {
      const baseURL = "https://up-image.dlbd.vn/api/image";
      const options = { headers: { "Content-Type": "multipart/form-data" } };

      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      const response = await axios.post(baseURL, formData, options);
      form.setFieldValue("avatar", response.data);
      setAvatarUrl(response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateProfile = async (values: any) => {
    handlerLoading.open();
    const res = await handleUpdate(values);
    if (res) {
      toast.success("Cập nhật hồ sơ thành công");
    }
    handlerLoading.close();
    router.refresh();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        form.setInitialValues(myAccount);
        form.setValues(myAccount);
        setAvatarUrl(myAccount?.avatar);
        if (myAccount?.dob)
          form.setFieldValue("dob", dayjs(myAccount?.dob).toDate());
        const [districts, wards] = await Promise.all([
          getOptionsDistrict(Number(myAccount?.cityId)),
          getOptionsWard(Number(myAccount?.districtId)),
        ]);
        form.setFieldValue("cityId", myAccount?.cityId.toString());
        form.setFieldValue("districtId", myAccount?.districtId?.toString());
        form.setFieldValue("wardId", myAccount?.wardId?.toString());
        setDistrictOptions(districts);
        setWardOptions(wards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (myAccount) {
      fetchData();
    } else {
      form.setFieldValue("status", "PUBLIC");
    }
  }, [myAccount]);

  return (
    <div className={styles.wrapper}>
      <div>
        <div style={{ borderBottom: "1px solid #eeeeee" }}>
          <Typo size="18px" type="bold" className={styles.title}>
            Cập nhật thông tin
          </Typo>
        </div>

        <Card w={"100%"} p={0}>
          <form
            name="userProfileForm"
            onSubmit={form.onSubmit((values) => handleUpdateProfile(values))}
            className={styles.formUser}
          >
            <Text size={"16px"} c={"#3d4465"} mb={"6px"}>
              Ảnh đại diện
            </Text>
            <div className={styles.avatar}>
              <CropImageLink
                shape="round"
                defaultImage={avatarUrl}
                uploadFileThumbnail={uploadFileThumbnail}
                aspect={1 / 1}
                form={form}
                name="avatar"
              />
            </div>
            <Grid gutter={16} w={"100%"}>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <TextInput
                  size="md"
                  w={"100%"}
                  withAsterisk
                  {...form.getInputProps("fullName")}
                  label="Họ tên"
                  placeholder="Họ và tên"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <DateField
                  size="md"
                  {...form.getInputProps("dob")}
                  label="Ngày sinh"
                  placeholder="Ngày sinh"
                  clearable={true}
                  maxDate={new Date()}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 12, lg: 12, xs: 12 }}>
                <TextInput
                  size="md"
                  {...form.getInputProps("address")}
                  label="Địa chỉ"
                  placeholder="Nhập địa chỉ của bạn"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <TextInput
                  size="md"
                  type="tel"
                  disabled={true}
                  {...form.getInputProps("phoneNumber")}
                  label="Điện thoại"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <Select
                  size="md"
                  searchable={true}
                  {...form.getInputProps("cityId")}
                  label="Tỉnh/Thành phố"
                  placeholder="Chọn tỉnh"
                  data={provinceOptions}
                  onChange={async (value) => {
                    const optionsData: any = await getOptionsDistrict(
                      Number(value)
                    );
                    setDistrictOptions(optionsData);
                    form.setFieldValue("cityId", value);
                    form.setFieldValue("districtId", "");
                    form.setFieldValue("wardId", "");
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <Select
                  size="md"
                  {...form.getInputProps("districtId")}
                  label="Huyện/Phường"
                  placeholder="Huyện/Phường"
                  data={districtOptions}
                  onChange={async (value) => {
                    const optionsData = await getOptionsWard(Number(value));
                    setWardOptions(optionsData);
                    form.setFieldValue("districtId", value);
                    form.setFieldValue("wardId", "");
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <Select
                  size="md"
                  {...form.getInputProps("wardId")}
                  label="Xã/Phường"
                  placeholder="Chọn xã/phường"
                  data={wardOptions}
                  onChange={(value) => {
                    form.setFieldValue("wardId", value);
                  }}
                />
              </Grid.Col>
            </Grid>
            <Group pt={20} pb={{ base: 10, md: 0, lg: 0 }} justify="end">
              <Button
                fullWidth={isMobile}
                type="submit"
                loading={isLoading}
                color="var(--primary-color)"
              >
                Cập nhật
              </Button>
            </Group>
          </form>
        </Card>
      </div>
    </div>
  );
}
