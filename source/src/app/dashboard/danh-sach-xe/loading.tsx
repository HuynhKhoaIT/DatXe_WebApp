import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { Box, Skeleton } from "@mantine/core";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
export default function LoadingPage() {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  return (
    <>
      {!isMobile ? (
        <div className={styles.loadingPage}>
          <div className={styles.content}>
            <div style={{ borderBottom: "1px solid #eeeeee" }}>
              <Typo size="18px" type="bold" className={styles.title}>
                Xe của tôi
              </Typo>
            </div>
            <div className={styles.table}>
              <Skeleton height={300} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loadingPage}>
          <Box p={8}>
            <Skeleton height={220} />
          </Box>
          <Box p={8}>
            <Skeleton height={220} />
          </Box>
          <Box p={8}>
            <Skeleton height={220} />
          </Box>
        </div>
      )}
    </>
  );
}
