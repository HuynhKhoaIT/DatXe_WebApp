"use client";
import styles from "./HeaderTopMobile.module.scss";
import Container from "@/app/components/common/Container";
import { titleHeader } from "@/constants/masterData";
import { IconChevronLeft } from "@tabler/icons-react";

import { usePathname, useRouter } from "next/navigation";

export default function HeaderTopMobileApp() {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  let page: any = parts?.[2] || parts?.[1];
  var res: any = titleHeader?.find((item) => {
    return item?.value == page;
  });
  let lastPage: any = parts?.[parts?.length - 1];
  return (
    <div className={styles.headerTop}>
      <Container>
        <div className={styles.topWrapper}>
          <div
            className={styles.topLeft}
            style={{ width: 24, display: "inline-block", height: 24 }}
          >
            {parts?.[3] && (
              <div className={styles.menu} onClick={() => router.back()}>
                <IconChevronLeft size={24} color="#fff" />
              </div>
            )}
          </div>
          <div className={styles.title}>
            {lastPage == "create" ? (
              <h2>{res.create}</h2>
            ) : parts?.length - 1 == 3 ? (
              <h2>{res.detail}</h2>
            ) : (
              <h2>{res?.label}</h2>
            )}
          </div>
          <div style={{ width: 24, display: "inline-block", height: 24 }}></div>
        </div>
      </Container>
    </div>
  );
}
