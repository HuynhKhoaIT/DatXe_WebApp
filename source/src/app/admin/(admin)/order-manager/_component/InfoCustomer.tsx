import Typo from "@/app/components/elements/Typo";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
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
import { IconEdit, IconPhoneCall, IconUpload } from "@tabler/icons-react";
export default function InfoCustomer({
  form,
  isUser,
  openModalUpdateCustomer,
  loading,
}: any) {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  const [loadingCustomer, handlersLoadingCustomer] = useDisclosure();
  return (
    <div className={styles.cardInfo}>
      <Box pos={"relative"}>
        <LoadingOverlay
          visible={loadingCustomer || loading}
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
                className="no-print"
                onClick={openModalUpdateCustomer}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          )}
        </Group>
        <Grid gutter={12} className={styles.marketingInfo}>
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <Grid gutter={12}>
              <Grid.Col span={{ base: 10, sm: 9, md: 9, lg: 9 }}>
                <AutocompletePhone
                  isUser={isUser}
                  disabled={isUser}
                  placeholder="Số điện thoại"
                  label="Số điện thoại"
                  isClear={false}
                  getOptionData={getOptionsPhone}
                  form={form}
                  name="phoneNumber"
                  handlersLoadingCustomer={handlersLoadingCustomer}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 3, sm: 3, md: 3, lg: 2 }}>
                <a href={`tel:${form?.values.phoneNumber}`}>
                  <ActionIcon size={50} mt={24.8}>
                    <IconPhoneCall />
                  </ActionIcon>
                </a>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <TextInput
              disabled={isUser}
              size="lg"
              classNames={{ input: styles.input }}
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
              disabled={isUser}
              classNames={{ input: styles.input }}
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
