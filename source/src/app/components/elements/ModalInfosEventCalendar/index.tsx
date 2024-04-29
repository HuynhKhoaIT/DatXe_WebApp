"use client";
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
}: any) {
  // Lấy thông tin khách hàng nếu có
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <BasicModal
      size={600}
      isOpen={opened}
      onCloseModal={onClose}
      footer={false}
      title="Đặt lịch"
      style={{ position: "relative" }}
    >
      <ModalEventCalendar
        user={user}
        brandOptions={brandOptions}
        eventInfos={eventInfos}
        categoryOptions={categoryOptions}
        advisorOptions={advisorOptions}
        carOptions={carOptions}
        onClose={onClose}
        fetchDataOrders={fetchDataOrders}
      />
    </BasicModal>
  );
}
