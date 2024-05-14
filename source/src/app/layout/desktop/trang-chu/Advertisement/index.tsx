import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { Button, Image } from "@mantine/core";
import oto1 from "@/assets/images/oto1.png";
import oto2 from "@/assets/images/oto2.png";
import Container from "@/app/components/common/Container";
import ImageField from "@/app/components/form/ImageField";
import { AppConstants } from "@/constants";

export default function Advertisement({ advertisement }: any) {
  return (
    <Container>
      <div className={styles.flex}>
        <div
          className={styles.wrapper}
          onClick={() =>
            advertisement?.[0]?.url && window.open(`${advertisement?.[0]?.url}`)
          }
        >
          <ImageField
            src={`${AppConstants.contentRootUrl}${advertisement?.[0]?.banners}`}
            height={{ base: 240, md: 300, lg: 300 }}
            radius={20}
            className={styles.img}
          />
          <div className={styles.info}>
            <div className={styles.title}>{advertisement?.[0]?.title}</div>
          </div>
        </div>
        <div
          className={styles.wrapper}
          onClick={() =>
            advertisement?.[1]?.url && window.open(`${advertisement?.[1]?.url}`)
          }
        >
          <ImageField
            src={`${AppConstants.contentRootUrl}${advertisement?.[1]?.banners}`}
            height={{ base: 240, md: 300, lg: 300 }}
            radius={20}
            className={styles.img}
          />
          <div className={styles.info}>
            <div className={styles.title}>{advertisement?.[1]?.title}</div>
          </div>
        </div>
      </div>
    </Container>
  );
}
