"use client";
import React from "react";
import { Grid, Modal, Textarea, TextInput, Box, Button } from "@mantine/core";
import dayjs from "dayjs";
import BasicModal from "@/app/components/common/BasicModal";
import { useMediaQuery } from "@mantine/hooks";
import styles from "./index.module.scss";
import { IconChevronLeft, IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
const PreviewModal = ({ data, onOk, opened, onCancel, ...props }: any) => {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  const router = useRouter();
  return (
    <BasicModal
      size={800}
      withCloseButton={!isMobile}
      classNames={{
        root: styles.rootModal,
        header: styles.headerModal,
        title: styles.titleModal,
      }}
      title={
        <div className={styles.title}>
          <IconChevronLeft onClick={onCancel} />
        </div>
      }
      isOpen={opened}
      closeButtonProps
      onCloseModal={onCancel}
      lockScroll={false}
      fullScreen={isMobile}
      radius={isMobile ? 0 : 6}
      {...props}
    >
      <Box maw={800}>
        <div className={styles.header}>
          <IconChevronLeft color="var(--primary-color)" onClick={onCancel} />
          <Button
            onClick={() => {
              router.push(`/dashboard/danh-sach-xe/${data?.id}`);
            }}
            color="var(--theme-color)"
            leftSection={<IconPencil color="red" size={16} />}
          >
            <span style={{ fontSize: 16, color: "white" }}>Sửa</span>
          </Button>
        </div>
        <Grid gutter={10}>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              variant="filled"
              size="md"
              classNames={{
                root: styles.root,
                input: styles.inputDashboard,
              }}
              label="Biển số xe"
              readOnly
              type="text"
              value={data.numberPlates}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              variant="filled"
              size="md"
              classNames={{
                root: styles.root,
                input: styles.inputDashboard,
              }}
              readOnly
              type="text"
              name="color"
              label="Màu xe"
              value={data.color}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              variant="filled"
              size="md"
              classNames={{
                root: styles.root,
                input: styles.inputDashboard,
              }}
              readOnly
              type="text"
              name="brandCar"
              label="Hãng xe"
              value={data?.brandName?.title}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              variant="filled"
              size="md"
              classNames={{
                root: styles.root,
                input: styles.inputDashboard,
              }}
              readOnly
              type="text"
              label="Dòng xe"
              value={data?.modelName?.title}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              variant="filled"
              size="md"
              classNames={{
                root: styles.root,
                input: styles.inputDashboard,
              }}
              readOnly
              type="text"
              label="Năm sản xuất"
              value={data?.yearName?.title}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              variant="filled"
              size="md"
              classNames={{
                root: styles.root,
                input: styles.inputDashboard,
              }}
              readOnly
              type="number"
              label="Số vin"
              value={Number(data.vinNumber)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              variant="filled"
              size="md"
              classNames={{
                root: styles.root,
                input: styles.inputDashboard,
              }}
              readOnly
              type="text"
              label="Số máy"
              value={data?.machineNumber}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              variant="filled"
              size="md"
              classNames={{
                root: styles.root,
                input: styles.inputDashboard,
              }}
              readOnly
              type="text"
              label="Hạn bảo dưỡng"
              value={
                data?.maintenanceDeadline &&
                dayjs(data.maintenanceDeadline)
                  .add(1, "day")
                  .format("DD/MM/YYYY")
              }
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              variant="filled"
              size="md"
              classNames={{
                root: styles.root,
                input: styles.inputDashboard,
              }}
              readOnly
              type="text"
              label="Hạn đăng kiểm"
              value={
                data?.registrationDeadline &&
                dayjs(data.registrationDeadline)
                  .add(1, "day")
                  .format("DD/MM/YYYY")
              }
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              variant="filled"
              size="md"
              classNames={{
                root: styles.root,
                input: styles.inputDashboard,
              }}
              readOnly
              type="text"
              label="Hạn BHVC"
              value={
                data?.materialInsuranceDeadline &&
                dayjs(data.materialInsuranceDeadline)
                  .add(1, "day")
                  .format("DD/MM/YYYY")
              }
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              variant="filled"
              size="md"
              classNames={{
                root: styles.root,
                input: styles.inputDashboard,
              }}
              readOnly
              type="text"
              label="Hạn BHDS"
              value={
                data?.civilInsuranceDeadline &&
                dayjs(data.civilInsuranceDeadline)
                  .add(1, "day")
                  .format("DD/MM/YYYY")
              }
            />
          </Grid.Col>
        </Grid>

        {/* Uncomment below to include the description TextArea */}
        {/* <Grid>
          <Grid.Col span={24}>
            <TextArea
              readOnly
              showCount
              name="description"
              maxLength={100}
              label="Mô tả chi tiết"
              placeholder="Mô tả chi tiết"
              value={data.description}
              style={{ height: 60, resize: 'none' }}
            />
          </Grid.Col>
        </Grid> */}
      </Box>
    </BasicModal>
  );
};

export default PreviewModal;
