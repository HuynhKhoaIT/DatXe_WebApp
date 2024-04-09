import { BackgroundImage } from "@mantine/core";
import styles from "./index.module.scss";
import BannerImg from "@/assets/images/bannerExpert.png";
const Banner = ({ heigth = 295, detailData }: any) => {
  return (
    <div className={styles.wrapper}>
      <BackgroundImage
        h={heigth}
        src={detailData?.banner ? detailData?.banner : BannerImg.src}
        radius="sm"
      ></BackgroundImage>
      <div className={styles.bg}></div>
    </div>
  );
};

export default Banner;
