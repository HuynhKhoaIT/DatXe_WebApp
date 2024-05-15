import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import Image1 from "@/assets/images/showRoom/Image1.png";
import Image2 from "@/assets/images/showRoom/Image2.png";
import Image3 from "@/assets/images/showRoom/Image3.png";
import Image4 from "@/assets/images/showRoom/Image4.png";
import ImageField from "@/app/components/form/ImageField";
import { AppConstants } from "@/constants";

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
          {/* <img src={images?.[0] || Image1.src} /> */}
          <ImageField
            src={images?.[0] && `${AppConstants.contentRootUrl}${images?.[0]}`}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.rightTop}>
            <ImageField
              src={
                images?.[1] && `${AppConstants.contentRootUrl}${images?.[1]}`
              }
            />
          </div>
          <div className={styles.rightBottom}>
            <ImageField
              src={
                images?.[2] && `${AppConstants.contentRootUrl}${images?.[2]}`
              }
            />
            <ImageField
              src={
                images?.[3] && `${AppConstants.contentRootUrl}${images?.[3]}`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesShowRoom;
