"use client";
import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { Grid, NumberInput, Select, Textarea } from "@mantine/core";
import { stepOrderOptions } from "@/constants/masterData";
export default function InfoCart({ calculateSubTotal, form, isEditing }: any) {
  return (
    <div style={{ marginTop: 20 }} className={styles.card}>
      <Typo
        className={styles.title}
        size="primary"
        type="bold"
        style={{ color: "var(--primary-orange)" }}
      >
        Thông tin đơn hàng
      </Typo>

      <Grid gutter={12} mt={24} className={styles.marketingInfo}>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <NumberInput
            classNames={{ input: styles.input }}
            size="md"
            radius={0}
            label="Tổng đơn hàng"
            placeholder="Tổng đơn hàng"
            suffix="đ"
            readOnly
            thousandSeparator=","
            value={calculateSubTotal()}
          />
        </Grid.Col>
        {isEditing ? (
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <Select
              classNames={{ input: styles.input }}
              size="md"
              radius={0}
              label="Tình trạng đơn hàng"
              placeholder="Tình trạng đơn hàng"
              {...form.getInputProps("step")}
              disabled
              data={stepOrderOptions}
            />
          </Grid.Col>
        ) : (
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}></Grid.Col>
        )}
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Textarea
            size="md"
            classNames={{ input: styles.input }}
            radius={0}
            {...form.getInputProps("note")}
            label="Ghi chú của khách hàng"
            minRows={2}
            autosize={true}
            placeholder="Ghi chú của khách hàng"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Textarea
            size="md"
            classNames={{ input: styles.input }}
            radius={0}
            {...form.getInputProps("notePrivate")}
            label="Ghi chú nội bộ"
            minRows={2}
            autosize={true}
            placeholder="Ghi chú nội bộ"
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}
