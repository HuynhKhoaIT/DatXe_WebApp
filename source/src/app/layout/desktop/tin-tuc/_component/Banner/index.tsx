import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { Flex, Image, Title } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import { fitString, formatTimeDifference } from "@/utils/until";
import { AppConstants } from "@/constants";
import BlogImage2 from "@/assets/images/blog/blog1.png";
import BannerImg from "@/assets/images/bannerExpert.png";

const Banner = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <div className={classNames("container", styles.content)}>
        <Typo type={"bold"} className={styles.title}>
          {data?.title}
        </Typo>
        <div>
          <p className={styles.timeTile}>
            Đăng lúc {formatTimeDifference(data?.updatedAt)}
          </p>
          {/* <Flex>
            <div className={styles.subDes}>
              {fitString(data?.shortDescription, 300)}
            </div>
          </Flex> */}
        </div>
      </div>
      <Image
        src={
          data?.banner
            ? `${AppConstants.contentRootUrl}${data?.banner}`
            : data?.thumnail
            ? `${AppConstants.contentRootUrl}${data?.thumnail}`
            : BannerImg.src
        }
        alt=""
        className={styles.banner}
      ></Image>
    </div>
  );
};

export default Banner;
