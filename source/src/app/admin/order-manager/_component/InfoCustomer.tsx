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
export default function InfoCustomer({ form, isUser }: any) {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  const [loadingCustomer, handlersLoadingCustomer] = useDisclosure();
  return (
    <div className={styles.cardInfo}>
      <Box pos={"relative"}>
        <LoadingOverlay
          visible={loadingCustomer}
          loaderProps={{ type: "bars" }}
        />
        <Group justify="space-between" className={styles.title}>
          <Typo
            size="primary"
            type="bold"
            style={{ color: "var(--primary-orange)" }}
          >
            Thông tin khách hàng
          </Typo>
          {isUser && (
            <Tooltip label="Cập nhật khách hàng" position="bottom" withArrow>
              <IconEdit
                // onClick={openModalUpdate}
                style={{ cursor: "pointer" }}
              />
            </Tooltip> // <Button
            //   leftSection={<IconUpload size={16} />}
            //   // onClick={openModalUpdate}
            // >
            //   Cập nhật
            // </Button>
          )}
        </Group>
        <Grid gutter={12} className={styles.marketingInfo}>
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <AutocompletePhone
              isUser={isUser}
              placeholder="Số điện thoại"
              label="Số điện thoại"
              isClear={false}
              getOptionData={getOptionsPhone}
              form={form}
              name="phoneNumber"
              handlersLoadingCustomer={handlersLoadingCustomer}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <TextInput
              size="lg"
              radius={0}
              {...form.getInputProps("fullName")}
              label="Tên khách hàng"
              type="text"
              placeholder="Tên khách hàng"
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              size="lg"
              radius={0}
              {...form.getInputProps("address")}
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
