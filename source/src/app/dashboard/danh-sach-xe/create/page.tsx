import CarForm from "./CarForm";
import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { Suspense } from "react";
import { LoadingComponent } from "@/app/components/loading";
export default function CreateCar() {
  return (
    <Box maw={"100%"} mx="auto" className={styles.wrapper}>
      <div className={styles.headerTitle}>
        <Typo size="18px" type="bold" className={styles.title}>
          Thêm xe
        </Typo>
      </div>
      <div className={styles.content}>
        <CarForm />
      </div>
    </Box>
  );
}
