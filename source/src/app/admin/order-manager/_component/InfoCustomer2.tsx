import Typo from "@/app/components/elements/Typo";
import {
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { getOptionsPhone } from "../until";
import { AutocompletePhone } from "./AutoCompletePhone";
import styles from "./index.module.scss";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconUpload } from "@tabler/icons-react";
export default function InfoCustomer2({ form, isUser }: any) {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  const [loadingCustomer, handlersLoadingCustomer] = useDisclosure();
  return (
    <div className={styles.cardInfo}>
      <Box pos={"relative"}>
        {/* <LoadingOverlay
          visible={loadingCustomer}
          loaderProps={{ type: "bars" }}
        /> */}
        <Group justify="space-between" className={styles.title}>
          <Typo
            size="primary"
            type="bold"
            style={{ color: "var(--primary-orange)" }}
          >
            Thông tin liên hệ
          </Typo>
        </Group>
        <Grid gutter={12} className={styles.marketingInfo}>
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <TextInput
              size="lg"
              radius={0}
              // withAsterisk
              {...form.getInputProps("billingPhone")}
              label="Số điện thoại"
              type="text"
              placeholder="Số điện thoại"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <TextInput
              size="lg"
              radius={0}
              {...form.getInputProps("billingCustomerName")}
              label="Tên khách hàng"
              type="text"
              placeholder="Tên khách hàng"
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              size="lg"
              radius={0}
              {...form.getInputProps("billingAdress")}
              label="Địa chỉ"
              type="text"
              placeholder="Địa chỉ"
            />
          </Grid.Col>
        </Grid>
      </Box>
    </div>
  );
}
