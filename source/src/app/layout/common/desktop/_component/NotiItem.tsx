"use client";
import { Flex } from "@mantine/core";
import ActionNoti from "./ActionNoti";
import styles from "./NotificationDropDown.module.scss";
import { IconBell } from "@tabler/icons-react";
import { useUpdateNoti } from "@/app/hooks/noti/useUpdateNoti";
import { useSession } from "next-auth/react";
import { NOTIFICATION_ORDER_KIND, ROLE_EXPERT } from "@/constants";
import { useRouter } from "next/navigation";
import { formatTimeDifference } from "@/utils/until";
import Typo from "@/app/components/elements/Typo";
export default function NotiItem({ item }: any) {
  const { getDetail } = useUpdateNoti();
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div
      className={styles.itemNotification}
      style={{
        margin: "4px 0",
        opacity: item?.notificationOnUser[0]?.readed ? "50%" : "100%",
        cursor: "pointer",
        borderRadius: "10px",
      }}
    >
      <div>
        <Flex justify={"space-evenly"} align={"center"} gap={10}>
          {/* {iconNotification(item?.kind)} */}
          <IconBell />
          <Flex
            direction="column"
            w={{ base: 200, md: 370, lg: 370 }}
            justify="center"
            style={{ flex: "1" }}
            onClick={() => {
              if (!item?.notificationOnUser[0]?.readed)
                getDetail({ id: item?.id });

              if (
                session?.user?.role == ROLE_EXPERT &&
                item?.kind == NOTIFICATION_ORDER_KIND
              ) {
                router.push(`/admin/order-manager`);
              }
              if (
                JSON.parse(item.data)?.code &&
                item?.kind == NOTIFICATION_ORDER_KIND
              ) {
                router.push(
                  `/dashboard/danh-sach-don-hang/${JSON.parse(item.data)?.code}`
                );
              }
              close();
            }}
          >
            <span className={styles.title}>{item?.title}</span>
            <Typo size="tiny">{formatTimeDifference(item.createdAt)}</Typo>
          </Flex>
          <i>
            {item?.notificationOnUser[0]?.readed ? (
              <i className={styles.iconDot}></i>
            ) : (
              <i className={styles.iconDot}></i>
            )}
          </i>
          <ActionNoti styles={styles} item={item} />
        </Flex>
      </div>
    </div>
  );
}
