"use client";
import styles from "./index.module.scss";
import Scan from "@/assets/icons/scan.svg";
import Report from "@/assets/icons/record-svgrepo-com.svg";
import Car from "@/assets/icons/car-steering-wheel-svgrepo-com.svg";
import Product from "@/assets/icons/product.svg";
import SP from "@/assets/icons/sp.svg";
import Marketing from "@/assets/icons/analysis-comparison-svgrepo-com.svg";
import Calendar from "@/assets/icons/calendar-svgrepo-com.svg";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "@mantine/core";
export default function MenuTop() {
  const router = useRouter();
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );

  const menu = [
    {
      id: 1,
      icon: Scan.src,
      label: "Tiếp nhận",
      action: openModal,
    },
    {
      id: 2,
      icon: Report.src,
      label: "Đơn hàng",
      link: "/admin/order-manager",
    },
    {
      id: 3,
      icon: Calendar.src,
      label: "Lịch đặt",
      link: "/admin/orders",
    },
    {
      id: 4,
      icon: Product.src,
      label: "Thêm sp/dv",
      link: "/admin/products/create",
    },
    {
      id: 5,
      icon: Car.src,
      label: "Thêm xe",
      link: "/admin/cars/create",
    },
    {
      id: 6,
      icon: Marketing.src,
      label: "Chương trình",
      link: "/admin/marketing-campaign",
    },
    {
      id: 7,
      icon: SP.src,
      label: "SP đường dẫn",
      link: "/admin/products",
    },
    {
      id: 8,
      icon: Calendar.src,
      label: "Doanh thu",
      link: "/admin/revenue",
    },
  ];
  return (
    <>
      <div className={styles.wrapper_1}>
        <div className={styles.card1}>
          <div className={styles.info}>
            <span className={styles.title}>Hiện đang có</span>
            {/* <span className={styles.updating}>Đang cập nhật</span> */}
          </div>
          <div className={styles.boxMenu}>
            {menu?.map((item: any, index: number) => {
              const Action = item?.action;

              return (
                <div
                  onClick={() => {
                    if (item?.link) {
                      router.push(item.link);
                    }
                    if (item?.action) {
                      Action();
                    }
                  }}
                  className={styles.itemMenu}
                  key={index}
                >
                  <div className={styles.iconMenu}>
                    {/* <Icon size={40} stroke={1} /> */}
                    <img src={item.icon} />
                  </div>
                  <span className={styles.titleItem}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {openedModal && (
        <DynamicModalAcceptCart openModal={openedModal} close={closeModal} />
      )}
    </>
  );
}
const DynamicModalAcceptCart = dynamic(
  () => import("../../_component/ModalAcceptCar"),
  {
    ssr: false,
  }
);

export function MenuSkeleton() {
  return <Skeleton h={236} radius={10} />;
}
