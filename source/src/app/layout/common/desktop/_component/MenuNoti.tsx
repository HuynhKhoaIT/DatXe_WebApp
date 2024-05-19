"use client";
import { Button, Flex, LoadingOverlay, ScrollArea } from "@mantine/core";
import styles from "./NotificationDropDown.module.scss";
import Typo from "@/app/components/elements/Typo";
import { IconBell } from "@tabler/icons-react";
import IconBellEmpty from "@/assets/icons/iconbell.svg";
import { useNotiList } from "@/app/hooks/noti/useNoti";
import { formatTimeDifference } from "@/utils/until";
import { useState } from "react";

export default function MenuNoti() {
  const { data: dataNotification, isPending, isLoading } = useNotiList({
    limit: 10,
  });
  const [activeButtonAll, setActiveButtonAll] = useState(true);

  return (
    <div className={styles.notiBox}>
      <LoadingOverlay
        visible={isPending || isLoading}
        zIndex={0}
        overlayProps={{ radius: "sm" }}
        loaderProps={{ type: "bars" }}
      />
      <Typo type="bold" size="small">
        Thông báo
      </Typo>
      <Flex gap={10}>
        <Button
          radius={10}
          variant={activeButtonAll ? "filled" : "default"}
          onClick={() => {
            setActiveButtonAll(true);
          }}
        >
          Tất cả
        </Button>
        <Button
          variant={!activeButtonAll ? "filled" : "default"}
          onClick={() => {
            setActiveButtonAll(false);
          }}
          radius={10}
        >
          Chưa đọc
        </Button>
      </Flex>
      <ScrollArea h={"90%"} mt={20}>
        {dataNotification?.data?.length > 0 ? (
          dataNotification?.data?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={styles.itemNotification}
                style={{
                  //   backgroundColor: "#fff",
                  margin: "4px 0",
                  //   opacity: item?.state == 1 || readAll ? "50%" : "100%",
                  //   display: deleteAll ? "none" : "",
                  border: "1px solid #fafafa",
                  borderRadius: "10px",
                }}
                // onClick={() => handleOnClickChecked(item?.id)}
              >
                <div>
                  <Flex justify={"space-evenly"} align={"center"}>
                    {/* {iconNotification(item?.kind)} */}
                    <IconBell />
                    <Flex direction="column" w={370} justify="center">
                      <span className={styles.title}>{item?.title}</span>
                      <Typo size="tiny">
                        {formatTimeDifference(item.createdAt)}
                      </Typo>
                    </Flex>
                    {!item?.notificationOnUser?.readed && (
                      <i className={styles.iconDot}></i>
                    )}
                  </Flex>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.empty}>
            {/* <Empty width={"150px"} height={"150px"} /> */}
            <img src={IconBellEmpty.src} width={"240"} height={"240"} />
            <div className={styles.empty__title}>Không có thông báo</div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
