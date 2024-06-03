"use client";
import { Indicator } from "@mantine/core";
import { IconBell, IconBellRinging } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useGlobalContext } from "@/app/Context/store";

const DynamicMenuNoti = dynamic(() => import("./MenuNoti"), {
  ssr: false,
});
export default function NotificationDropDown({ color = "#fff" }: any) {
  const { data } = useSession();
  const [opened, setOpened] = useState(false);
  const { noti, setNoti } = useGlobalContext();

  return (
    <div>
      {data?.user && (
        <i style={{ cursor: "pointer" }}>
          <Indicator color="red" size={noti ? 8 : 0}>
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
                  setNoti(false);
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
