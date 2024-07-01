"use client";
import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { Button, Flex, Rating, Select, Textarea } from "@mantine/core";
import ReviewItem from "./ReviewItem";
import { useForm } from "@mantine/form";
import { useAddReview } from "@/app/hooks/reviewsExpert/useAddReview";
import { useSession } from "next-auth/react";

const Reviews = ({ reviews, expertId, review }: any) => {
  const { data }: any = useSession();
  const { addItem, updateItem } = useAddReview();
  const form = useForm({
    initialValues: {
      garageId: expertId,
      star: 5,
      message: "",
    },
    validate: {},
  });
  const handleSubmit = async (values: any) => {
    if (review?.data?.length > 0) {
      updateItem({ id: review?.data[0]?.id, ...values });
    } else {
      addItem(values);
    }
    form.reset();
  };

  return (
    <div className={styles.wrapper}>
      {data?.user && (
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
              size="md"
              onChange={(value) => {
                form.setFieldValue("star", value);
              }}
            />
          </div>
          <div className={styles.review}>
            <Textarea
              size="md"
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
      )}
      <div className={styles.header}>
        <Typo size="sub" type="bold" style={{ color: "var(--title-color)" }}>
          Đánh giá ({reviews?.total})
        </Typo>
        <Select
          size="md"
          radius={0}
          w={130}
          placeholder="Lọc theo"
          data={["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"]}
        />
      </div>
      <div className={styles.average}>
        <Rating value={reviews?.avg?._avg?.star} readOnly fractions={2} />
        <Typo size="primary" style={{ color: "var(--title-color-sub)" }}>
          Tuyệt vời {reviews?.avg?._avg?.star}
        </Typo>
      </div>
      <div className={styles.body}>
        {reviews?.data?.map((item: any, index: number) => {
          return <ReviewItem dataDetail={item} key={index} />;
        })}
      </div>
    </div>
  );
};
export default Reviews;
