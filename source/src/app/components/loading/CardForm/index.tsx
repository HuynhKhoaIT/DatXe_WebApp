import { Box, Group, LoadingOverlay } from "@mantine/core";
import styles from "./index.module.scss";
import Typo from "../../elements/Typo";
export default function CardFormSekeleton({ title, height, mb = 0 }: any) {
  return (
    <Box mb={mb} className={styles.cardInfo}>
      <Group justify="space-between" className={styles.title}>
        {title && (
          <Typo
            size="primary"
            type="bold"
            style={{ color: "var(--primary-orange)" }}
          >
            {title}
          </Typo>
        )}
      </Group>
      {height && (
        <Box pos="relative" h={height}>
          <LoadingOverlay
            zIndex={9}
            visible={true}
            loaderProps={{ type: "bars" }}
          />
        </Box>
      )}
    </Box>
  );
}
