"use client";
import { Indicator } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";

const DynamicMenuNoti = dynamic(() => import("./MenuNoti"), {
  ssr: false,
});
export default function NotificationDropDown() {
  const { data } = useSession();
  const [opened, handlers] = useDisclosure(false);

  return (
    <div>
      {data?.user && (
        <i style={{ cursor: "pointer" }}>
          <Indicator color="red" size={10} processing>
            <IconBell
              color="#fff"
              onClick={() => {
                handlers.toggle();
              }}
            />
          </Indicator>
        </i>
      )}
      {opened && <DynamicMenuNoti />}
    </div>
  );
}
