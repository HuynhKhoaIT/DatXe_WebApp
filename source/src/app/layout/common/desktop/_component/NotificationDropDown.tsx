"use client";
import { Button, Flex, LoadingOverlay, ScrollArea } from "@mantine/core";
import { IconBell, IconCircle, IconDots } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import styles from "./NotificationDropDown.module.scss";
import Typo from "@/app/components/elements/Typo";
import { useState } from "react";
import IconBellEmpty from "@/assets/icons/iconbell.svg";
import { useNotiList } from "@/app/hooks/noti/useNoti";
export default function NotificationDropDown() {
  const { data } = useSession();
  const { data: noti } = useNotiList({ limit: 10 });
  console.log(noti);
  const [activeIcon, setActiveIcon] = useState(false);
  const [activeButtonAll, setActiveButtonAll] = useState(true);
  const dataNotification: any = [];
  //   const dataNotification = [
  //     {
  //       id: 1,
  //       title: "title 1",
  //       content: "Xin chào buổi sáng. chúc bạn có một ngày vui vẻ hạnh phúc.",
  //     },
  //     {
  //       id: 2,
  //       title: "title 1",
  //       content: "Xin chào buổi sáng. chúc bạn có một ngày vui vẻ hạnh phúc.",
  //     },
  //     {
  //       id: 3,
  //       title: "title 1",
  //       content: "Xin chào buổi sáng. chúc bạn có một ngày vui vẻ hạnh phúc.",
  //     },
  //     {
  //       id: 4,
  //       title: "title 1",
  //       content: "Xin chào buổi sáng. chúc bạn có một ngày vui vẻ hạnh phúc.",
  //     },
  //     {
  //       id: 5,
  //       title: "title 1",
  //       content: "Xin chào buổi sáng. chúc bạn có một ngày vui vẻ hạnh phúc.",
  //     },
  //     {
  //       id: 6,
  //       title: "title 1",
  //       content: "Xin chào buổi sáng. chúc bạn có một ngày vui vẻ hạnh phúc.",
  //     },
  //     {
  //       id: 7,
  //       title: "title 1",
  //       content: "Xin chào buổi sáng. chúc bạn có một ngày vui vẻ hạnh phúc.",
  //     },
  //     {
  //       id: 8,
  //       title: "title 1",
  //       content: "Xin chào buổi sáng. chúc bạn có một ngày vui vẻ hạnh phúc.",
  //     },
  //     ,
  //     {
  //       id: 9,
  //       title: "title 1",
  //       content: "Xin chào buổi sáng. chúc bạn có một ngày vui vẻ hạnh phúc.",
  //     },
  //     {
  //       id: 10,
  //       title: "title 1",
  //       content: "Xin chào buổi sáng. chúc bạn có một ngày vui vẻ hạnh phúc.",
  //     },
  //     {
  //       id: 11,
  //       title: "title 1",
  //       content: "Xin chào buổi sáng. chúc bạn có một ngày vui vẻ hạnh phúc.",
  //     },
  //   ];
  return (
    <div>
      {data?.user && (
        <i style={{ cursor: "pointer" }}>
          <IconBell
            color="#fff"
            onClick={() => {
              activeIcon ? setActiveIcon(false) : setActiveIcon(true);
            }}
          />
        </i>
      )}
      {activeIcon && (
        <div className={styles.notiBox}>
          <LoadingOverlay
            // visible={loading}
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
            {dataNotification?.length > 0 ? (
              dataNotification?.map((item: any, index: number) => {
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
                          <span className={styles.title}>{item?.content}</span>
                          <Typo size="tiny">3 phút trước</Typo>
                        </Flex>
                        <i className={styles.iconDot}></i>
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
      )}
    </div>
  );
}
