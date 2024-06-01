"use client";
import { Indicator } from "@mantine/core";
import {
  IconBell,
  IconBellDown,
  IconBellRinging,
  IconBellUp,
  IconNote,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import { useClickOutside } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { useNotiList } from "@/app/hooks/noti/useNoti";

const DynamicMenuNoti = dynamic(() => import("./MenuNoti"), {
  ssr: false,
});
export default function NotificationDropDown({ color = "#fff" }: any) {
  const { data: dataNotification, isPending, isLoading } = useNotiList({
    limit: 10,
  });
  const { data } = useSession();
  const [opened, setOpened] = useState(false);
  const { noti, setNoti } = useGlobalContext();

  useEffect(() => {
    if (dataNotification) {
      let isNoti = dataNotification?.data?.some((item: any) => {
        return item?.notificationOnUser[0]?.readed === false;
      });
      if (isNoti) {
        setNoti(true);
      } else {
        setNoti(false);
      }
    }
  }, [dataNotification]);
  return (
    <div>
      {data?.user && (
        <i style={{ cursor: "pointer" }}>
          <Indicator color="red" size={noti ? 10 : 0}>
            {opened ? (
              <IconBell
                color={color}
                onClick={(e) => {
                  e.preventDefault();
                  setOpened(false);
                }}
              />
            ) : (
              <IconBellRinging
                color={color}
                onClick={(e) => {
                  e.preventDefault();
                  setOpened(true);
                }}
              />
            )}
          </Indicator>
        </i>
      )}
      {opened && (
        <DynamicMenuNoti
          close={() => {
            setOpened(false);
          }}
          setOpened={setOpened}
        />
      )}
    </div>
  );
}
