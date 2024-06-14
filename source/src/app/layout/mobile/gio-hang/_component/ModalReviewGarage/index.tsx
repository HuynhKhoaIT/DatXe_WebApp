"use client";
import React from "react";
import BasicModal from "@/app/components/common/BasicModal";
import { Button, Flex, Image, Rating, Textarea } from "@mantine/core";
import styles from "./index.module.scss";
import Typo from "@/app/components/elements/Typo";
import { useForm } from "@mantine/form";
import { useAddReview } from "@/app/hooks/reviewsExpert/useAddReview";
export default function ModalReviewGarage({
  openedModal,
  onCloseModal,
  onOkModal,
  onCancelModal,
  dataDetail,
}: any) {
  console.log(dataDetail);
  const form = useForm({
    initialValues: {
      garageId: dataDetail?.garageId,
      star: 5,
      message: "",
    },
    validate: {},
  });
  const { addItem, updateItem } = useAddReview();

  const handleSubmit = async (values: any) => {
    // if (review?.data?.length > 0) {
    //   updateItem({ id: review?.data[0]?.id, ...values });
    // } else {
    //   addItem(values);
    // }
    addItem(values);
    form.reset();
  };
  return (
    <BasicModal
      isOpen={openedModal}
      onCloseModal={onCloseModal}
      onOkModal={onOkModal}
      footer={false}
      size={800}
      centered={true}
      onCancelModal={onCancelModal}
      okText="Hoàn thành"
      cancelText="Trở lại"
      withCloseButton={false}
      classNames={{
        root: styles.root,
        title: styles.title,
      }}
    >
      <form
        className={styles.sendReview}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className={styles.title}>
          <Typo
            type="bold"
            style={{ color: "var(--title-color)", fontSize: "24px" }}
          >
            Viết đánh giá
          </Typo>
        </div>
        <div className={styles.rating}>
          <Typo size="primary">Chất lượng chuyên gia</Typo>
          <Rating
            defaultValue={5}
            size="lg"
            onChange={(value) => {
              form.setFieldValue("star", value);
            }}
          />
        </div>
        <div className={styles.review}>
          <Textarea
            size="lg"
            radius={0}
            label="Đánh giá chuyên gia:"
            placeholder="Để lại đánh giá"
            variant="unstyled"
            bg={"#ffffff"}
            p={20}
            classNames={{
              root: styles.rootTextArea,
              label: styles.labelTextArea,
              input: styles.iputTextArea,
            }}
            {...form.getInputProps("message")}
            style={{ border: "1px solid #333" }}
          />
        </div>
        <Flex py={20} justify={"end"}>
          <Button color="var(--primary-color)" type="submit" key="submit">
            Gửi đánh giá
          </Button>
        </Flex>
      </form>
    </BasicModal>
  );
}
