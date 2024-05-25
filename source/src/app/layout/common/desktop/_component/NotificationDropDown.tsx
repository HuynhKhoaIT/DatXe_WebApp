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
import { useState } from "react";

const DynamicMenuNoti = dynamic(() => import("./MenuNoti"), {
  ssr: false,
});
export default function NotificationDropDown({ color = "#fff" }: any) {
  const { data } = useSession();
  const [opened, setOpened] = useState(false);

  console.log(opened);
  return (
    <div>
      {data?.user && (
        <i style={{ cursor: "pointer" }}>
          <Indicator color="red" size={10} processing>
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
