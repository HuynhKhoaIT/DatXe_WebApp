"use client";
import { Grid, Box, Flex, Button, ScrollArea } from "@mantine/core";
import Container from "@/app/components/common/Container";
import Banner from "../chuyen-gia/Banner";
import NotiItem from "./_component/NotiItem";
import styles from "./index.module.scss";
import Typo from "@/app/components/elements/Typo";
import { useEffect, useState } from "react";
import { useUpdateNoti } from "@/app/hooks/noti/useUpdateNoti";
import { useNotiList } from "@/app/hooks/noti/useNoti";
import { IconBell } from "@tabler/icons-react";
import IconBellEmpty from "@/assets/icons/iconbell.svg";

import { formatTimeDifference } from "@/utils/until";
export default function NotiListPage({ notifications }: any) {
  const { data: dataNotification, isPending, isLoading } = useNotiList({
    limit: 10,
  });

  const [data, setData] = useState([]);
  const { getDetail } = useUpdateNoti();
  const [activeButtonAll, setActiveButtonAll] = useState(true);

  useEffect(() => {
    if (activeButtonAll) {
      setData(dataNotification?.data);
    } else {
      const res = dataNotification?.data
        ?.filter((item: any) => !item.notificationOnUser?.readed)
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
        <Flex justify={"space-between"}>
          <span className={styles.befforeText}>Trước đó</span>
        </Flex>
        {data?.length > 0 ? (
          data?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={styles.itemNotification}
                style={{
                  //   backgroundColor: "#fff",
                  margin: "4px 0",
                  opacity: item?.notificationOnUser?.readed ? "50%" : "100%",
                  //   display: deleteAll ? "none" : "",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  if (!item?.notificationOnUser?.readed)
                    getDetail({ id: item?.id });
                }}
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
            <img src={IconBellEmpty.src} width={"240"} height={"240"} />
            <div className={styles.empty__title}>Không có thông báo</div>
          </div>
        )}
      </div>
    </Container>
  );
}
