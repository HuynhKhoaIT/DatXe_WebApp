"use client";
import { Button, Tooltip } from "@mantine/core";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { IconMapPin } from "@tabler/icons-react";
import { fitString } from "@/utils/until";
import { getData } from "@/utils/until/localStorage";
import { storageKeys } from "@/constants";
import { Suspense, useEffect, useState } from "react";
import styles from "./ModalAddress.module.scss";
const DynamicModalAddAddress = dynamic(() => import("./ModalAddAddress"), {
  ssr: false,
});
export default function ButtonAddAddress() {
  const router = useRouter();
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );

  const [address, setAddress] = useState("Chọn địa chỉ");

  const addressData = getData(storageKeys.ADDRESS_DEFAULT);
  useEffect(() => {
    if (!addressData) {
      setAddress("Chọn địa chỉ");
      return;
    }
    const address =
      `${addressData?.province?.name && addressData?.province?.name}` +
      ", " +
      `${addressData?.district?.name && addressData?.district?.name}`;
    setAddress(address);
  }, [addressData]);
  return (
    <div>
      <Tooltip label={address} position="bottom">
        <Button
          color="#EEF1F9"
          leftSection={<IconMapPin size={20} />}
          classNames={{
            root: styles.btnAdd,
            inner: styles.innerAdd,
          }}
          maw={300}
          w={{ base: 150, md: 220, lg: 300 }}
          onClick={() => {
            openModal();
          }}
        >
          {fitString(address.toString(), 20)}
        </Button>
      </Tooltip>

      <DynamicModalAddAddress openModal={openedModal} close={closeModal} />
    </div>
  );
}
