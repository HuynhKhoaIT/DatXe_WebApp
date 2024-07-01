import { Box, Space } from "@mantine/core";
import styles from "./index.module.scss";
import { GarageItem } from "@/app/components/elements/garage/GarageItem";
import Container from "@/app/components/common/Container";
export default function StoreListPage({ experts }: any) {
  return (
    <Container>
      <Box w={"100%"} mt={20}>
        <div className={styles.stores}>
          {experts?.data?.map((item: any, index: number) => (
            <GarageItem garage={item} key={index} />
          ))}
        </div>
      </Box>
    </Container>
  );
}
