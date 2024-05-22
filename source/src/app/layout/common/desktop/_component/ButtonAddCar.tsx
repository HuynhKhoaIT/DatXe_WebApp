"use client";
import { Button } from "@mantine/core";
import car from "@/assets/icons/car.svg";
import dynamic from "next/dynamic";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";

const DynamicModalAddCar = dynamic(() => import("./ModalAddCar"), {
  ssr: false,
});
export default function ButtonAddCar({ styles, user }: any) {
  const router = useRouter();
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );

  const isTablet = useMediaQuery(`(max-width: ${"1024px"})`);

  return (
    <>
      <Button
        color="#EEF1F9"
        leftSection={!isTablet && <img src={car.src} alt="Car Icon" />}
        classNames={{
          root: styles.btnAdd,
          inner: styles.innerAdd,
        }}
        onClick={() => {
          if (user) {
            openModal();
          } else {
            router.push("/dang-nhap");
          }
        }}
      >
        Thêm xe
      </Button>
      <DynamicModalAddCar
        openModal={openedModal}
        close={closeModal}
        myAccount={user}
      />
    </>
  );
}
