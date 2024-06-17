"use client";
import useFetch from "@/app/hooks/useFetch";
import { QUERY_KEY, storageKeys } from "@/constants";
import {
  getOptionsDistrict,
  getOptionsProvince,
  getOptionsWard,
} from "@/utils/until";
import {
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Modal,
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft, IconPlus, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import styles from "./ModalAddress.module.scss";
import Scroll from "@/app/components/common/Scroll";
import classNames from "classnames";
import { getData, removeItem, setData } from "@/utils/until/localStorage";
import Typo from "@/app/components/elements/Typo";
import { useRouter } from "next/navigation";
export default function ModalAddAddress({ openModal, close }: any) {
  const addressDefault = getData(storageKeys.ADDRESS_DEFAULT);

  const router = useRouter();
  const { data: provinceOptions, isLoading: isLoadingProvince } = useFetch({
    queryKey: [QUERY_KEY.optionsProvince],
    queryFn: () => getOptionsProvince(),
  });
  const [districtOptions, setDistrictOptions] = useState<any>([]);
  const [wardOptions, setWardOptions] = useState<any>([]);
  const [province, setProvince] = useState<any>(addressDefault?.province?.id);
  const [district, setDistrict] = useState<any>();
  const [ward, setWard] = useState<any>();
  const [provinceName, setProvinceName] = useState<any>();
  const [districtName, setDistrictName] = useState<any>();
  const [wardName, setWardName] = useState<any>();
  const [active, setActive] = useState("province");

  const [loading, handlers] = useDisclosure();

  const form = useForm({
    initialValues: {},
    validate: {},
  });

  useEffect(() => {
    if (addressDefault?.district) {
      setDistrictName(addressDefault?.district?.name);
    }
    if (addressDefault?.province) {
      setProvinceName(addressDefault?.province?.name);
    }
  }, []);

  const handleSubmit = async () => {};

  const handleResetAddress = () => {
    setProvinceName(null);
    setDistrictName(null);
    removeItem(storageKeys.ADDRESS_DEFAULT);
    setActive("province");
    router.refresh();
    close();
  };
  return (
    <Modal
      opened={openModal}
      onClose={close}
      lockScroll
      // centered
      withCloseButton={false}
      radius={0}
      size={600}
      classNames={{
        body: styles.body,
      }}
      zIndex={9991}
    >
      <Box pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={99}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <div className={styles.header}>
          <span className={styles.headerTitle}>
            {active !== "province" && (
              <IconChevronLeft
                color="#fff"
                onClick={() => {
                  if (active == "ward") {
                    setActive("district");
                    setWardName(null);
                  } else if (active == "district") {
                    setActive("province");
                    setDistrictName(null);
                  }
                }}
              />
            )}
            {districtName}
            {districtName && ", "}
            {provinceName}
          </span>
          <IconX style={{ cursor: "pointer" }} color="#fff" onClick={close} />
        </div>
        <Flex p={16} align={"center"} justify={"space-between"}>
          <Flex align={"center"} gap={10}>
            <Typo size="primary">Vị trí hiện tại: </Typo>
            <Typo size="primary">
              {districtName ? <>{districtName},</> : <></>}
              {provinceName ? <>{provinceName}</> : <></>}
            </Typo>
          </Flex>
          {(districtName || provinceName) && (
            <Button
              color="blue"
              variant="outline"
              h={30}
              onClick={handleResetAddress}
            >
              Xoá
            </Button>
          )}
        </Flex>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className={styles.wrapper}>
            <span className={styles.title}>
              {active == "province"
                ? "Chọn tỉnh/ thành phố"
                : active == "district"
                ? "Chọn huyện/ quận"
                : "Chọn xã/ phường"}
            </span>

            <ScrollArea h={600}>
              {active == "province" && (
                <div className={styles.content}>
                  {provinceOptions?.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={classNames(
                          styles.item,
                          province == item.value && styles.activeItem
                        )}
                        onClick={async () => {
                          const optionsData: any = await getOptionsDistrict(
                            Number(item.value)
                          );
                          setActive("district");
                          setDistrictOptions(optionsData);
                          form.setFieldValue("cityId", item.value);
                          form.setFieldValue("districtId", "");
                          form.setFieldValue("wardId", "");
                          setProvince(item.value);
                          setProvinceName(item.label);
                          setDistrictName(null);
                          setDistrict(null);
                          setWard(null);
                        }}
                      >
                        {item?.label}
                      </div>
                    );
                  })}
                </div>
              )}
              {active == "district" && (
                <div className={styles.content}>
                  {districtOptions?.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={classNames(
                          styles.item,
                          district == item.value && styles.activeItem
                        )}
                        onClick={async () => {
                          // const optionsData: any = await getOptionsWard(
                          //   Number(item.value)
                          // );
                          // setActive("ward");
                          // setWardOptions(optionsData);
                          form.setFieldValue("districtId", item.value);
                          // form.setFieldValue("wardId", "");
                          setDistrictName(item.label);
                          setDistrict(item.value);
                          const address = {
                            province: {
                              id: province,
                              name: provinceName,
                            },
                            district: {
                              id: item.value,
                              name: item.label,
                            },
                          };
                          setData(storageKeys.ADDRESS_DEFAULT, address);
                          close();
                        }}
                      >
                        {item?.label}
                      </div>
                    );
                  })}
                </div>
              )}
              {/* {active == "ward" && (
                <div className={styles.content}>
                  {wardOptions?.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={classNames(
                          styles.item,
                          ward == item.value && styles.activeItem
                        )}
                        onClick={() => {
                          form.setFieldValue("wardId", item.value);
                          setWard(item.value);
                          setWardName(item.label);
                          const address = {
                            province: {
                              id: province,
                              name: provinceName,
                            },
                            district: {
                              id: district,
                              name: districtName,
                            },
                            ward: {
                              id: item.value,
                              name: item.label,
                            },
                          };
                          setData(storageKeys.ADDRESS_DEFAULT, address);
                          close();
                        }}
                      >
                        {item?.label}
                      </div>
                    );
                  })}
                </div>
              )} */}
            </ScrollArea>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
