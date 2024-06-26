"use client";
import { Button, Flex, LoadingOverlay, Menu, ScrollArea } from "@mantine/core";
import styles from "./NotificationDropDown.module.scss";
import Typo from "@/app/components/elements/Typo";
import { IconX } from "@tabler/icons-react";
import IconBellEmpty from "@/assets/icons/iconbell.svg";
import { useNotiList } from "@/app/hooks/noti/useNoti";
import { useEffect, useState } from "react";
import { useUpdateNoti } from "@/app/hooks/noti/useUpdateNoti";
import { useClickOutside, useDisclosure, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import NotiItem from "./NotiItem";
export default function MenuNoti({ close, setOpened }: any) {
  const { data: dataNotification, isPending, isLoading } = useNotiList({
    limit: 10,
  });
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  const [data, setData] = useState([]);
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
  const ref = useClickOutside(() => setOpened(false));

  return (
    <div className={styles.notiBox} ref={ref}>
      <LoadingOverlay
        visible={isPending || isLoading}
        zIndex={0}
        overlayProps={{ radius: "sm" }}
        loaderProps={{ type: "bars" }}
      />
      <Flex justify={"space-between"}>
        <Typo type="bold" size="small" style={{ color: "#000" }}>
          Thông báo
        </Typo>
        {isMobile && <IconX onClick={close} />}
      </Flex>
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
        <Link href={"/thong-bao"} className={styles.readAllText}>
          Xem tất cả
        </Link>
      </Flex>
      <ScrollArea h={"84%"} mt={20}>
        {data?.length > 0 ? (
          data?.map((item: any, index: number) => {
            return <NotiItem item={item} key={index} />;
          })
        ) : (
          <div className={styles.empty}>
            <img src={IconBellEmpty.src} width={"240"} height={"240"} />
            <div className={styles.empty__title}>Không có thông báo</div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
