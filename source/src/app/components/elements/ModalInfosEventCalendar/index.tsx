"use client";
import { useMediaQuery } from "@mantine/hooks";
import BasicModal from "../../common/BasicModal";
import { ModalEventCalendar } from "./ModalEventCalendar";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
export default function ModalCalendar({
  opened,
  onClose,
  eventInfos,
  brandOptions,
  categoryOptions,
  carOptions,
  fetchDataOrders,
  advisorOptions,
  carsData,
}: any) {
  // Lấy thông tin khách hàng nếu có
  const { data: session } = useSession();
  const user = session?.user;
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

  return (
    <BasicModal
      size={600}
      isOpen={opened}
      onCloseModal={onClose}
      footer={false}
      title="Đặt lịch"
      style={{ position: "relative" }}
      fullScreen={isMobile}
      // zIndex={9999}
      radius={0}
    >
      <ModalEventCalendar
        user={user}
        brandOptions={brandOptions}
        eventInfos={eventInfos}
        categoryOptions={categoryOptions}
        advisorOptions={advisorOptions}
        carOptions={carOptions}
        onClose={onClose}
        carsData={carsData}
        fetchDataOrders={fetchDataOrders}
      />
    </BasicModal>
  );
}
