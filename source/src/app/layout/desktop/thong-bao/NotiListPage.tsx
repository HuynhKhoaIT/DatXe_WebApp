"use client";
import { Grid, Box, Flex, Button, ScrollArea } from "@mantine/core";
import Container from "@/app/components/common/Container";
import Banner from "../chuyen-gia/Banner";
import styles from "./index.module.scss";
import Typo from "@/app/components/elements/Typo";
import { useEffect, useState } from "react";
import { useUpdateNoti } from "@/app/hooks/noti/useUpdateNoti";
import { useNotiList } from "@/app/hooks/noti/useNoti";
import { IconBell } from "@tabler/icons-react";
import IconBellEmpty from "@/assets/icons/iconbell.svg";

import { formatTimeDifference } from "@/utils/until";
import { useRouter } from "next/navigation";
import { NOTIFICATION_ORDER_KIND, ROLE_EXPERT } from "@/constants";
import NotiItem from "../../common/desktop/_component/NotiItem";
export default function NotiListPage({ notifications }: any) {
  const { data: dataNotification, isPending, isLoading } = useNotiList({
    limit: 100,
  });

  const router = useRouter();

  const [data, setData] = useState([]);
  const { getDetail } = useUpdateNoti();
  const [activeButtonAll, setActiveButtonAll] = useState(true);

  useEffect(() => {
    if (activeButtonAll) {
      setData(dataNotification?.data);
    } else {
      const res = dataNotification?.data
        ?.filter((item: any) => !item.notificationOnUser[0]?.readed)
        .map((item: any) => {
          return item;
        });
      setData(res);
    }
  }, [activeButtonAll, dataNotification]);

  return (
    <Container className={styles.container}>
      <div className={styles.notiBox}>
        <Typo type="bold" size="small" style={{ color: "#000" }}>
          Thông báo
        </Typo>
        <Flex gap={10}>
          <Button
            radius={10}
            variant={activeButtonAll ? "filled" : "default"}
            onClick={() => {
              setActiveButtonAll(true);
            }}
            color="var(--theme-color)"
          >
            Tất cả
          </Button>
          <Button
            variant={!activeButtonAll ? "filled" : "default"}
            onClick={() => {
              setActiveButtonAll(false);
            }}
            radius={10}
            color="var(--theme-color)"
          >
            Chưa đọc
          </Button>
        </Flex>
        <Flex justify={"space-between"}>
          <span className={styles.befforeText}>Trước đó</span>
        </Flex>
        {data?.length > 0 ? (
          data?.map((item: any) => {
            return <NotiItem item={item} key={item?.id} />;
          })
        ) : (
          <div className={styles.empty}>
            <img src={IconBellEmpty.src} width={"240"} height={"240"} />
            <div className={styles.empty__title}>Không có thông báo</div>
          </div>
        )}
      </div>
    </Container>
  );
}
