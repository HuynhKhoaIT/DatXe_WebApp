import { useUpdateNoti } from "@/app/hooks/noti/useUpdateNoti";
import { Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconDots, IconSquareX } from "@tabler/icons-react";
import classNames from "classnames";

export default function ActionNoti({ styles, item }: any) {
  const [opened, { toggle }] = useDisclosure();
  const { deleteItem, getDetail } = useUpdateNoti();
  return (
    <div
      className={classNames(styles.actionNoti)}
      style={opened ? { display: "block" } : {}}
    >
      <Menu
        trigger="hover"
        onOpen={() => {
          toggle();
        }}
        onClose={() => {
          toggle();
        }}
      >
        <Menu.Target>
          <IconDots size={20} />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => {
              getDetail({ id: item.id });
            }}
            leftSection={<IconCheck />}
          >
            Đánh dấu là đã đọc
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              deleteItem({ id: item.id });
            }}
            leftSection={<IconSquareX />}
          >
            Gỡ thông báo này
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
