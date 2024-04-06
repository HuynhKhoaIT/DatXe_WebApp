import Typo from "@/app/components/elements/Typo";
import { Grid, TextInput } from "@mantine/core";
import styles from "./index.module.scss";
import { getOptionsPhone } from "../until";
import { AutocompletePhone } from "./AutoCompletePhone";
export default function InfoCard({ form, handleGetInfo }: any) {
  return (
    <div className={styles.card}>
      <Typo
        size="primary"
        type="bold"
        style={{ color: "var(--primary-orange)" }}
        className={styles.title}
      >
        Thông tin khách hàng
      </Typo>
      <Grid gutter={12} className={styles.marketingInfo}>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <AutocompletePhone
            placeholder="Số điện thoại"
            label="Số điện thoại"
            isClear={false}
            getOptionData={getOptionsPhone}
            form={form}
            handleGetInfo={handleGetInfo}
            name="phoneNumber"
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
    </div>
  );
}
