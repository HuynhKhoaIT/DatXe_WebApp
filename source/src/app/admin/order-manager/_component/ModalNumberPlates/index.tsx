"use client";
import Typo from "@/app/components/elements/Typo";
import useFetch from "@/app/hooks/useFetch";
import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Grid,
  Group,
  Modal,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  useDebouncedValue,
  useDisclosure,
  useMediaQuery,
} from "@mantine/hooks";
import { IconCamera } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { getOptionsCar } from "../../until";
import { useEffect, useState } from "react";
import AutocompleteField from "@/app/components/form/AutoCompleteField";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DynamicModalCamera = dynamic(() => import("../ModalCamera"), {
  ssr: false,
});
export default function ModalNumberPlates({
  openModal,
  close,
  formOrder,
  handleGetInfo,
  numberPlate,
  setNumberPlate,
}: any) {
  const router = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  const [carOptions, setCarOptions] = useState([]);
  const [debounced] = useDebouncedValue(numberPlate, 400);
  useEffect(() => {
    const fetchData = async () => {
      const data: any = await getOptionsCar({ s: debounced });
      setCarOptions(data);
      return data;
    };
    if (debounced?.length >= 3) {
      fetchData();
    }
  }, [debounced]);
  const [
    openedModalCamera,
    { open: openModalCamera, close: closeModalCamera },
  ] = useDisclosure(false);
  // const { data: carOptions, isLoading } = useFetch({
  //   queryKey: ["carOptions"],
  //   queryFn: () => getOptionsCar(),
  // });
  return (
    <Modal
      opened={openModal}
      onClose={close}
      withCloseButton={false}
      lockScroll
      centered
      radius={0}
      zIndex={99}
      closeOnEscape={false}
      closeOnClickOutside={false}
      size={isMobile ? "100%" : "400px"}
    >
      <Box h={200} w={"100%"}>
        <Typo style={{ fontSize: 24, fontWeight: 500 }}>Nhập biển số xe</Typo>
        <Grid gutter={12}>
          <Grid.Col span={10}>
            <AutocompleteField
              size="lg"
              radius={0}
              w={"100%"}
              placeholder="Biển số xe"
              value={numberPlate}
              onChange={(value: any) => {
                setNumberPlate(value);
                formOrder.setFieldValue("numberPlates", value);
              }}
              getOptionData={getOptionsCar}
              form={formOrder}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <ActionIcon
              onClick={openModalCamera}
              size="lg"
              h={50}
              w={50}
              variant="filled"
              aria-label="Settings"
            >
              <IconCamera
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Grid.Col>
        </Grid>
        <div
          style={{
            width: "100%",
            position: "fixed",
            gap: "20px",
            bottom: 0,
            left: 0,
            display: "flex",
            justifyContent: "end",
            padding: 10,
            borderTop: "1px solid #ddd",
          }}
        >
          <Button
            onClick={() => {
              router.back();
            }}
          >
            Huỷ bỏ
          </Button>
          <Button
            onClick={() => {
              handleGetInfo(numberPlate);
              close();
            }}
          >
            Tiếp tục
          </Button>
        </div>
      </Box>
      <DynamicModalCamera
        openModal={openedModalCamera}
        close={closeModalCamera}
        formOrder={formOrder}
        handleGetInfo={handleGetInfo}
        setNumberPlate={setNumberPlate}
      />
    </Modal>
  );
}
