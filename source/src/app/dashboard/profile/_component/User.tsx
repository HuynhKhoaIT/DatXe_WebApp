"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextInput,
  Select,
  Group,
  Box,
  Card,
  Text,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useForm } from "@mantine/form";
import { updateAccount } from "@/utils/user";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import ImageUpload from "@/assets/icons/image.svg";

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
export default function UserProfile({ myAccount, handleUpdate }: any) {
  console.log(myAccount);
  const [districtOptions, setDistrictOptions] = useState<any>([]);
  const [wardOptions, setWardOptions] = useState<any>([]);
  const [province, setProvince] = useState<any>();
  const [district, setDistrict] = useState<any>();
  const [avatarUrl, setAvatarUrl] = useState(null);

  const [ward, setWard] = useState<any>();
  const { data: provinceOptions, isLoading: isLoading } = useFetch({
    queryKey: ["provinceOptions"],
    queryFn: () => getOptionsProvince(),
  });
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const form = useForm({
    initialValues: {
      fullName: myAccount.fullName,
      phoneNumber: myAccount.phoneNumber,
      dob: myAccount?.dob && dayjs(myAccount?.dob).toDate(),
      address: myAccount.address,
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
    try {
      await handleUpdate(values);
      notifications.show({
        title: "Thành công",
        message: "Cập nhật thành công",
      });
      router.refresh();
    } catch (error) {
      notifications.show({
        title: "Thất bại",
        message: "Cập nhật thất bại",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (myAccount) {
        setAvatarUrl(myAccount?.avatar);
        try {
          const [districts, wards] = await Promise.all([
            getOptionsDistrict(Number(myAccount?.provinceId)),
            getOptionsWard(Number(myAccount?.districtId)),
          ]);
          setDistrictOptions(districts);
          setWardOptions(wards);

          form.setFieldValue("cityId", myAccount?.provinceId?.toString());
          form.setFieldValue("districtId", myAccount?.districtId?.toString());
          form.setFieldValue("wardId", myAccount?.wardId?.toString());
          setProvince(myAccount?.provinceId?.toString());
          setDistrict(myAccount?.districtId?.toString());
          setWard(myAccount?.wardId?.toString());
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div>
        <div style={{ borderBottom: "1px solid #eeeeee" }}>
          <Typo size="18px" type="bold" className={styles.title}>
            Cập nhật thông tin
          </Typo>
        </div>

        <Card w={"100%"} px={20}>
          <form
            name="userProfileForm"
            onSubmit={form.onSubmit((values) => handleUpdateProfile(values))}
          >
            <Grid gutter={12}>
              <Grid.Col span={{ base: 6 }}>
                <Text size={"16px"} c={"#999999"} mb={"6px"}>
                  Ảnh đại diện
                </Text>
                <CropImageLink
                  shape="rect"
                  placeholder={"Cập nhật logo"}
                  defaultImage={avatarUrl || ImageUpload.src}
                  uploadFileThumbnail={uploadFileThumbnail}
                  aspect={1 / 1}
                  form={form}
                  name="avatar"
                />
              </Grid.Col>
            </Grid>
            <Grid gutter={16} w={"100%"}>
              <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                <TextInput
                  size="lg"
                  radius={0}
                  w={"100%"}
                  withAsterisk
                  {...form.getInputProps("fullName")}
                  label="Họ tên"
                  placeholder="Nguyễn Văn A"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <DateField
                  {...form.getInputProps("dob")}
                  label="Ngày sinh"
                  placeholder="Ngày sinh"
                  clearable={true}
                  maxDate={new Date()}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <TextInput
                  size="lg"
                  radius={0}
                  type="tel"
                  disabled={true}
                  {...form.getInputProps("phoneNumber")}
                  label="Điện thoại"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <TextInput
                  size="lg"
                  radius={0}
                  {...form.getInputProps("address")}
                  label="Địa chỉ"
                  placeholder="1234 Main St"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <Select
                  size="lg"
                  radius={0}
                  {...form.getInputProps("cityId")}
                  label="Tỉnh/Thành phố"
                  placeholder="Chọn tỉnh"
                  data={provinceOptions}
                  value={province}
                  onChange={async (value) => {
                    const optionsData = await getOptionsDistrict(Number(value));
                    setDistrictOptions(optionsData);
                    form.setFieldValue("cityId", value);
                    form.setFieldValue("districtId", "");
                    form.setFieldValue("wardId", "");
                    setProvince(value);
                    setDistrict(null);
                    setWard(null);
                  }}
                ></Select>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <Select
                  size="lg"
                  radius={0}
                  {...form.getInputProps("districtId")}
                  label="Huyện/Phường"
                  placeholder="Huyện/Phường"
                  data={districtOptions}
                  value={district}
                  onChange={async (value) => {
                    const optionsData = await getOptionsWard(Number(value));
                    setWardOptions(optionsData);
                    form.setFieldValue("districtId", value);
                    form.setFieldValue("wardId", "");
                    setDistrict(value);

                    setWard(null);
                  }}
                ></Select>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, xs: 12 }}>
                <Select
                  size="lg"
                  radius={0}
                  {...form.getInputProps("wardId")}
                  label="Xã/Phường"
                  placeholder="Chọn xã/phường"
                  data={wardOptions}
                  value={ward}
                  onChange={(value) => {
                    form.setFieldValue("wardId", value);
                    setWard(value);
                  }}
                ></Select>
              </Grid.Col>
            </Grid>
            <Group pt={20} justify="end" className="col-12 text-right ">
              <Button size="lg" radius={0} type="submit">
                Cập nhật
              </Button>
            </Group>
          </form>
        </Card>
      </div>
    </div>
  );
}
