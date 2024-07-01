import styles from "./index.module.scss";
import MenuTop, { MenuSkeleton } from "./_component/MenuTop";
import InfoDashboard, {
  InfoDashboardSkeleton,
} from "./_component/InfoDashboard";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
import ChartDashboard, {
  ChartDashboardSkeleton,
} from "./_component/ChartDashboard";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import { ORDER_ACCEPT, ORDER_CANCEL, ORDER_DONE } from "@/constants";
import { Suspense } from "react";
import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
export default async function DashboardAdmin({ searchParams }: any) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  const myGarage = await callApi(apiConfig.admin.garage.myGarage, {});

  const ordersAdmin = await callApi(apiConfig.admin.order.dashboard, {
    params: searchParams,
  });
  const newArray = ordersAdmin?.map((item: any) => ({
    id: item.id,
    step: item.step,
    dateTime: item.dateTime,
  }));
  const currentDate = new Date();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 14
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  return (
    <div className={styles.main}>
      {myGarage?.status !== "PUBLIC" && (
        <Alert
          variant="light"
          title="Xác minh"
          icon={<IconInfoCircle />}
          mb={30}
        >
          Chuyên gia chưa được xác minh, hãy xác minh để được nhiều tính năng
          hơn
        </Alert>
      )}
      {myGarage?.status == "DELETE" && (
        <Alert
          variant="light"
          title="Xác minh"
          icon={<IconInfoCircle />}
          mb={30}
        >
          Chuyên gia đã bị xoá, hãy liên hệ với admin tổng.
        </Alert>
      )}
      <Suspense fallback={<MenuSkeleton />}>
        <MenuTop />
      </Suspense>
      <Suspense fallback={<InfoDashboardSkeleton />}>
        <InfoDashboard
          firstDayOfMonth={firstDayOfMonth}
          lastDayOfMonth={lastDayOfMonth}
          newArray={newArray}
        />
      </Suspense>
      {isMobile && (
        <div className={styles.card_3}>
          <div className={styles.item_card}>
            <p>Nghiệm thu</p>
            <span className={styles.value_3}>
              {
                newArray?.filter(
                  (item: any) => item?.step === Number(ORDER_ACCEPT)
                )?.length
              }
            </span>
          </div>
          <div className={styles.item_card}>
            <p>Xuất xưởng</p>
            <span className={styles.value_3}>
              {
                newArray?.filter(
                  (item: any) => item?.step === Number(ORDER_DONE)
                )?.length
              }
            </span>
          </div>
          <div className={styles.item_card}>
            <p>Xe huỷ</p>
            <span className={styles.value_3}>
              {
                newArray?.filter(
                  (item: any) => item?.step === Number(ORDER_CANCEL)
                )?.length
              }
            </span>
          </div>
        </div>
      )}
      <Suspense fallback={<ChartDashboardSkeleton />}>
        <ChartDashboard newArray={newArray} />
      </Suspense>
      {/* {openedModal && (
        <DynamicModalAcceptCart openModal={openedModal} close={closeModal} />
      )} */}
    </div>
  );
}
