import Drawer from "rc-drawer";
import Typo from "../../elements/Typo";
import styles from "./index.module.scss";
import { IconX } from "@tabler/icons-react";
export default function ReactDrawer({
  opened,
  placement = "left",
  width = "300px",
  mask = false,
  children,
  headerTitle,
  onClose,
}: any) {
  console.log("opened", opened);
  return (
    <Drawer
      className={styles.drawer}
      width={width}
      mask={mask}
      open={true}
      placement={placement}
    >
      <div className={styles.header}>
        <div className={styles.title}>
          {/* <ArrowLeft onClick={onClose}/> */}
          <Typo size="small">{headerTitle}</Typo>
        </div>
        <div onClick={onClose} className={styles.close}>
          <IconX />
        </div>
      </div>
      {children}
    </Drawer>
  );
}
