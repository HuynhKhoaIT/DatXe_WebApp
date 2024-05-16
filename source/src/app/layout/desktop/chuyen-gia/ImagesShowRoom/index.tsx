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
          <img
            src={
              images?.[0]
                ? `${AppConstants.contentRootUrl}${images?.[0]}`
                : Image1.src
            }
          />
        </div>
        <div className={styles.right}>
          <div className={styles.rightTop}>
            <img
              src={
                images?.[1]
                  ? `${AppConstants.contentRootUrl}${images?.[1]}`
                  : Image2.src
              }
            />
          </div>
          <div className={styles.rightBottom}>
            <img
              src={
                images?.[2]
                  ? `${AppConstants.contentRootUrl}${images?.[2]}`
                  : Image3.src
              }
            />
            <img
              src={
                images?.[3]
                  ? `${AppConstants.contentRootUrl}${images?.[3]}`
                  : Image4.src
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesShowRoom;
