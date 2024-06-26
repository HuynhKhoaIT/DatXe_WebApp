import { BackgroundImage, Image } from "@mantine/core";
import styles from "./index.module.scss";
import BannerImg from "@/assets/images/bannerExpert.png";
import { AppConstants } from "@/constants";
const Banner = ({ heigth = 295, detailData }: any) => {
  return (
    <div className={styles.wrapper}>
      {/* <BackgroundImage
        h={heigth}
        src={
          detailData?.banner
            ? `${AppConstants.contentRootUrl}${detailData?.banner}`
            : BannerImg.src
        }
        radius="sm"
      ></BackgroundImage> */}
      <Image
        src={
          detailData?.banner
            ? `${AppConstants.contentRootUrl}${detailData?.banner}`
            : BannerImg.src
        }
        fit="cover"
        className={styles.img}
      ></Image>
      <div className={styles.bg}></div>
    </div>
  );
};

export default Banner;
