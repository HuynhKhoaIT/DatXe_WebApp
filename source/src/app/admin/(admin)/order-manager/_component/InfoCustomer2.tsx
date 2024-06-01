import Typo from "@/app/components/elements/Typo";
import {
  Box,
  Button,
  Collapse,
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
import { IconChevronDown } from "@tabler/icons-react";
import classNames from "classnames";
export default function InfoCustomer2({ form, isUser }: any) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div className={classNames(styles.cardInfo, "no-print")}>
      <Box pos={"relative"}>
        {/* <LoadingOverlay zIndex={9}
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
          {opened ? (
            <IconChevronDown
              onClick={toggle}
              style={{ cursor: "pointer", rotate: "180deg" }}
            />
          ) : (
            <IconChevronDown onClick={toggle} style={{ cursor: "pointer" }} />
          )}
        </Group>
        <Collapse in={opened}>
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
        </Collapse>
      </Box>
    </div>
  );
}
