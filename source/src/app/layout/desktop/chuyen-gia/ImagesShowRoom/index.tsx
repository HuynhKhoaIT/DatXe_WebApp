import ImageField from "@/app/components/form/ImageField";
import styles from "./index.module.scss";
import Image1 from "@/assets/images/showRoom/Image1.png";
import Image2 from "@/assets/images/showRoom/Image2.png";
import Image3 from "@/assets/images/showRoom/Image3.png";
import Image4 from "@/assets/images/showRoom/Image4.png";
import classNames from "classnames";
import { AppConstants } from "@/constants";

const ImagesShowRoom = ({ className, photos }: any) => {
  let images;
  if (photos) images = JSON?.parse(photos);
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.body}>
        <div className={styles.left}>
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
