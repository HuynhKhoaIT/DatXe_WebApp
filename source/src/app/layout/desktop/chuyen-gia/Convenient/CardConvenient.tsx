"use client";
import { Box, Card } from "@mantine/core";
import styles from "./Convenient.module.scss";
import Link from "next/link";
import ImageField from "@/app/components/form/ImageField";
import Typo from "@/app/components/elements/Typo";
import { AppConstants } from "@/constants";
const CardConvenient = ({ convenient }: any) => {
  return (
    <div className={styles.wrapper}>
      <Box w={"100%"}>
        <div className={styles.card}>
          <div>
            <div style={{ width: "100%" }}>
              <ImageField
                src={
                  convenient?.thumbnail &&
                  `${AppConstants.contentRootUrl}${convenient?.thumbnail}`
                }
                height={222}
                width={266}
              />
            </div>
          </div>

          <div className={styles.infoCard}>
            <div>
              <Typo
                size="small"
                type="bold"
                style={{ color: "var(--title-white)" }}
                className={styles.productName}
              >
                {convenient?.title}
              </Typo>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default CardConvenient;
