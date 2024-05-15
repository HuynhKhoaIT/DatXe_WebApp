import { IProduct } from "@/interfaces/product";
import styles from "./index.module.scss";
import Typo from "@/app/components/elements/Typo";
import Link from "next/link";
import avatar from "@/assets/images/avatar.jpeg";
import IconFaceBook from "@/assets/icons/fbIcon.svg";
import IconInstagram from "@/assets/icons/igIcon.svg";
import { AppConstants } from "@/constants";

const ExpertBox = ({ ProductDetail }: { ProductDetail: IProduct }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <img
          className={styles.avatarImg}
          src={
            ProductDetail?.garage?.logo
              ? `${AppConstants.contentRootUrl}${ProductDetail?.garage?.logo}`
              : avatar.src
          }
          alt="avatar"
        />
      </div>
      <div style={{ flex: 1 }}>
        <div className={styles.headerInfo}>
          <div className={styles.leftInfo}>
            <Typo type="bold" style={{ color: "#170F49" }}>
              {ProductDetail?.garage?.shortName}
            </Typo>
            <Link
              href={`/chuyen-gia/${ProductDetail?.garage?.id}`}
              className={styles.toExpert}
            >
              Đi đến chuyên gia
            </Link>
          </div>
          <div className={styles.social}>
            <Link href={"#"}>
              <img src={IconFaceBook.src} />
            </Link>
            <Link href={"#"}>
              <img src={IconInstagram.src} />
            </Link>
          </div>
        </div>
        <Typo
          size="sub"
          style={{ color: "#6F6C90" }}
          className={styles.description}
        >
          {ProductDetail?.garage?.description}
        </Typo>
      </div>
    </div>
  );
};
export default ExpertBox;
