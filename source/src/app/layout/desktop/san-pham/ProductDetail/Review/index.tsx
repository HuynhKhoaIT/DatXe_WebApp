import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { LoadingOverlay, Select } from "@mantine/core";
import ReviewItem from "./ReviewItem";

const Reviews = ({ productReview }: any) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Typo size="sub" style={{ color: "var(--title-color)" }}>
          {productReview?.data?.length || 0} đánh giá
        </Typo>
        {/* <Select
          w={130}
          placeholder="Lọc theo"
          data={["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"]}
        /> */}
      </div>
      <div className={styles.body}>
        {productReview?.data?.map((item: any, index: number) => {
          return <ReviewItem dataDetail={item} key={index} />;
        })}
      </div>
    </div>
  );
};
export default Reviews;
