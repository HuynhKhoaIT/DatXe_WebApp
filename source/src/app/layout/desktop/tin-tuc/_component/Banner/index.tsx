import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { Flex, Image, Title } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import { fitString, formatTimeDifference } from "@/utils/until";

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
          <Flex>
            {/* <div style={{ marginTop:5, fontSize:'20px', fontWeight: 500, color:'white' }}>{data?.title}</div> */}
            <div className={styles.subDes}>
              {fitString(data?.shortDescription, 300)}
            </div>
          </Flex>
        </div>
      </div>
      <Image
        src={data?.thumbnail}
        alt=""
        className={styles.banner}
        // h={'100%'}
        // mih={400}
      ></Image>
    </div>
  );
};

export default Banner;
