"use client";
import { Button, Flex, LoadingOverlay, ScrollArea } from "@mantine/core";
import styles from "./NotificationDropDown.module.scss";
import Typo from "@/app/components/elements/Typo";
import { IconBell, IconX } from "@tabler/icons-react";
import IconBellEmpty from "@/assets/icons/iconbell.svg";
import { useNotiList } from "@/app/hooks/noti/useNoti";
import { formatTimeDifference } from "@/utils/until";
import { useEffect, useState } from "react";
import { useUpdateNoti } from "@/app/hooks/noti/useUpdateNoti";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/navigation";

export default function MenuNoti({ close }: any) {
  const router = useRouter();
  const { data: dataNotification, isPending, isLoading } = useNotiList({
    limit: 10,
  });

  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

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
    <div className={styles.notiBox}>
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
        <Link href={"thong-bao"} className={styles.readAllText}>
          Xem tất cả
        </Link>
      </Flex>
      <ScrollArea h={"90%"} mt={20}>
        {data?.length > 0 ? (
          data?.map((item: any, index: number) => {
            console.log(item);
            return (
              <div
                key={index}
                className={styles.itemNotification}
                style={{
                  //   backgroundColor: "#fff",
                  margin: "4px 0",
                  opacity: item?.notificationOnUser[0]?.readed ? "50%" : "100%",
                  //   display: deleteAll ? "none" : "",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  console.log(JSON.parse(item.data));
                  if (!item?.notificationOnUser[0]?.readed)
                    getDetail({ id: JSON.parse(item.data)?.id });

                  router.push(`/dashboard/order`);
                }}
              >
                <div>
                  <Flex justify={"space-evenly"} align={"center"}>
                    {/* {iconNotification(item?.kind)} */}
                    <IconBell />
                    <Flex
                      direction="column"
                      w={{ base: 200, md: 370, lg: 370 }}
                      justify="center"
                    >
                      <span className={styles.title}>{item?.title}</span>
                      <Typo size="tiny">
                        {formatTimeDifference(item.createdAt)}
                      </Typo>
                    </Flex>

                    <i
                      className={classNames(
                        item?.notificationOnUser[0]?.readed
                          ? styles.iconDotNone
                          : styles.iconDot
                      )}
                    ></i>
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
      </ScrollArea>
    </div>
  );
}
