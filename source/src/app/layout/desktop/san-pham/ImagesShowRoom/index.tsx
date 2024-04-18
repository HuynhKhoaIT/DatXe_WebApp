import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import Image1 from "@/assets/images/showRoom/Image1.png";
import Image2 from "@/assets/images/showRoom/Image2.png";
import Image3 from "@/assets/images/showRoom/Image3.png";
import Image4 from "@/assets/images/showRoom/Image4.png";

const ImagesShowRoom = ({ ProductDetail }: any) => {
  let images;
  if (ProductDetail?.garage?.photos)
    images = JSON?.parse(ProductDetail?.garage?.photos);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Typo
          size="small"
          type="bold"
          style={{ color: "var(--category-name)" }}
        >
          Hình ảnh Showroom
        </Typo>
      </div>
      <div className={styles.body}>
        <div className={styles.left}>
          <img src={images?.[0] || Image1.src} />
        </div>
        <div className={styles.right}>
          <div className={styles.rightTop}>
            <img src={images?.[1] || Image2.src} />
          </div>
          <div className={styles.rightBottom}>
            <img src={images?.[2] || Image3.src} />
            <img src={images?.[3] || Image4.src} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesShowRoom;
