import { Flex, Skeleton } from "@mantine/core";
import styles from "./index.module.scss";
import Container from "../components/common/Container";
export default function Loading() {
  return (
    <Container>
      <div className={styles.loadingPage}>
        <div className={styles.loadingCart}>
          <div className="checkout-widget">
            <div className={styles.titleCard}>
              <Skeleton height={30} mt={6} radius="8" color="white" />
            </div>
            <Skeleton height={200} mt={6} radius="8" />
          </div>

          <div className="checkout-widget">
            <div className={styles.titleCard}>
              <Skeleton height={30} mt={6} radius="8" color="white" />
            </div>
            <Skeleton height={200} mt={6} radius="8" />
          </div>
        </div>
        <Skeleton height={100} mt={6} radius="8" />
      </div>
    </Container>
  );
}
