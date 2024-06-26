"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { Box } from "@mantine/core";
import styles from "./index.module.scss";
import "dayjs/locale/vi";
import CalendarEventBase from "../../../components/form/CalendarEventBase";
dayjs.locale("vi");
import dynamic from "next/dynamic";
const DynamicModalAcceptCalendar = dynamic(
  () => import("./ModalAcceptCalendar/index"),
  {
    ssr: false,
  }
);
export default function CalendarSchedulerGarage({
  ordersData,
  selectable = true,
  categoryOptions,
  brandOptions,
  addItem,
}: any) {
  const [layoutMobile, setLayoutMobile] = useState(false);
  const [previewInfos, setPreviewInfos] = useState();
  const [eventInfos, setEventInfos] = useState<any>();

  const [
    openedPreviewCalendar,
    { open: openPreviewCalendar, close: closePreviewCalendar },
  ] = useDisclosure(false);
  const [
    openedCalendar,
    { open: openCalendar, close: closeCalendar },
  ] = useDisclosure(false);
  useEffect(() => {
    if (window.innerWidth < 765) {
      setLayoutMobile(true);
    } else {
      setLayoutMobile(false);
    }
  }, []);

  // click mở modal xem chi tiết
  const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
    setPreviewInfos(clickInfo);
    openPreviewCalendar();
  };

  // Kiểm tra xem khung giờ đang được chọn có nằm trong quá khứ hay không
  const handleWindowResize = () => {
    if (window.innerWidth < 765) {
      setLayoutMobile(true);
    } else {
      setLayoutMobile(false);
    }
  };
  // Hàm kiểm tra xem ngày đã qua hay chưa
  const isDateInThePast = (value: any) => {
    return dayjs().isBefore(value);
  };

  // click mở modal đặt lịch
  const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
    setEventInfos(selectInfo);
    openCalendar();
    isDateInThePast(selectInfo?.start);
  };
  return (
    <div className={styles.calendar}>
      <Box pos="relative">
        <CalendarEventBase
          select={handleAddEventSelectAndOpenModal}
          eventClick={handleEditEventSelectAndOpenModal}
          events={ordersData}
          isResponsive={true}
          heightMobile="500px"
          heightDesktop="700px"
          selectable={selectable}
          views={{
            timeGridWeek: {
              type: "timeGridWeek",
              duration: layoutMobile ? { days: 4 } : { days: 7 }, // Hiển thị một tuần tại một thời điểm
              buttonText: "Tuần",
              eventLimit: 1,
              eventLimitText: 1,
            },
          }}
          firstDay={new Date().getDay() - 3}
          windowResize={handleWindowResize}
          isListEvent={true}
          categoryOptions={categoryOptions}
        />
      </Box>
      <DynamicModalAcceptCalendar
        opened={openedPreviewCalendar}
        onClose={closePreviewCalendar}
        previewInfos={previewInfos}
        categoryOptions={categoryOptions}
      />
      <DynamicModalCalendar
        opened={openedCalendar}
        onClose={closeCalendar}
        eventInfos={eventInfos}
        categoryOptions={categoryOptions}
        brandOptions={brandOptions}
        typeView={eventInfos?.view?.type}
        addItem={addItem}
      />
    </div>
  );
}
const DynamicModalCalendar = dynamic(
  () => import("./_component/ModalCreateOrder"),
  {
    ssr: false,
  }
);
