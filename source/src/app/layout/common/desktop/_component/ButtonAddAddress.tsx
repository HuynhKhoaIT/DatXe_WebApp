"use client";
import { Button } from "@mantine/core";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { IconLocation, IconMapPin } from "@tabler/icons-react";
import { fitString } from "@/utils/until";

const DynamicModalAddAddress = dynamic(() => import("./ModalAddAddress"), {
  ssr: false,
});
export default function ButtonAddAddress({ styles, user }: any) {
  const router = useRouter();
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );

  return (
    <>
      <Button
        color="#EEF1F9"
        leftSection={<IconMapPin />}
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
        {fitString("P3, Q4, Hồ Chí Minh", 18)}
      </Button>
      <DynamicModalAddAddress
        openModal={openedModal}
        close={closeModal}
        myAccount={user}
      />
    </>
  );
}
