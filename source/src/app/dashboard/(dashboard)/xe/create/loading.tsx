import { Fragment } from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Box, Skeleton } from "@mantine/core";
import styles from "./index.module.scss";
import Typo from "@/app/components/elements/Typo";
const Breadcrumbs = [
  { title: "Xe của tôi", href: "/dashboard/danh-sach-xe" },
  { title: "Thêm xe" },
];
export default function Loading() {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  return (
    <Fragment>
      <Box maw={"100%"} mx="auto" className={styles.wrapper}>
        <div className={styles.headerTitle}>
          <Typo size="18px" type="bold" className={styles.title}>
            Thêm xe
          </Typo>
        </div>
        <div style={{ padding: 20 }}>
          <Skeleton height={300} />
        </div>
      </Box>
    </Fragment>
  );
}
