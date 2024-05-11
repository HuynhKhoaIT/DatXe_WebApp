import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { Button, Image } from "@mantine/core";
import oto1 from "@/assets/images/oto1.png";
import oto2 from "@/assets/images/oto2.png";
import Container from "@/app/components/common/Container";
import ImageField from "@/app/components/form/ImageField";

export default function Advertisement({ advertisement }: any) {
  console.log(advertisement);
  return (
    <Container>
      <div className={styles.flex}>
        {advertisement?.map((item: any) => {
          return (
            <div
              className={styles.wrapper}
              onClick={() => item?.url && window.open(`${item?.url}`)}
            >
              <ImageField
                src={item?.banners}
                // h={height}
                // width={'100% + 30px'}
                radius={20}
                fit="cover"
                className={styles.img}
              />
              <div className={styles.info}>
                <div className={styles.title}>{item?.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
