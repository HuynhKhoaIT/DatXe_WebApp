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

const DynamicModalAddAddress = dynamic(() => import("./ModalAddAddress"), {
  ssr: false,
});
export default function ButtonAddAddress({ styles, user }: any) {
  const router = useRouter();
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );

  const [address, setAddress] = useState("Chọn địa chỉ");

  const addressData = getData(storageKeys.ADDRESS_DEFAULT);
  useEffect(() => {
    if (!addressData) return;
    const address =
      `${addressData?.province?.name && addressData?.province?.name}` +
      ", " +
      `${addressData?.district?.name && addressData?.district?.name}` +
      ", " +
      `${addressData?.ward?.name && addressData?.ward?.name}`;
    setAddress(address);
  }, [addressData]);
  return (
    <div>
      <Tooltip label={address} position="bottom">
        <Button
          color="#EEF1F9"
          leftSection={<IconMapPin />}
          classNames={{
            root: styles.btnAdd,
            inner: styles.innerAdd,
          }}
          onClick={() => {
            openModal();
          }}
        >
          {fitString(address.toString(), 20)}
        </Button>
      </Tooltip>

      <DynamicModalAddAddress
        openModal={openedModal}
        close={closeModal}
        myAccount={user}
      />
    </div>
  );
}
