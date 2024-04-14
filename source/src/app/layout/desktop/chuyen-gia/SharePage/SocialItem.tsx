"use client";
import BasicSocialShare from "@/app/components/common/BasicSocialShare";
import styles from "./index.module.scss";
import { useDisclosure } from "@mantine/hooks";
const SocialItem = ({ social }: any) => {
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );
  return (
    <div className={styles.socialItem} onClick={openModal}>
      <div className={styles.avatar}>
        <img src={social?.image} />
      </div>
      <div className={styles.name}>{social?.name}</div>
      <BasicSocialShare opened={openedModal} close={closeModal} />
    </div>
  );
};
export default SocialItem;
