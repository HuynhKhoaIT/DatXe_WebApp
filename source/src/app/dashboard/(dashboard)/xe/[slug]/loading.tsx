import { Fragment } from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import { Box, Skeleton } from "@mantine/core";
import styles from "../create/index.module.scss";
import Typo from "@/app/components/elements/Typo";

export default function Loading() {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  return (
    <Fragment>
      <Box maw={"100%"} mx="auto" className={styles.wrapper}>
        <div className={styles.headerTitle}>
          <Typo size="18px" type="bold" className={styles.title}>
            Cập nhật xe
          </Typo>
        </div>
        <div style={{ padding: 20 }}>
          <Skeleton height={300} />
        </div>
      </Box>
    </Fragment>
  );
}
