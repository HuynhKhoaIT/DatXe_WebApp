import { Avatar, Checkbox } from "@mantine/core";
import styles from "./LoginPage.module.scss";
import Logo from "@/../../public/assets/images/logoDatxe.png";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

export default function LoginPage({
  title,
  subTitle,
  description,
  form,
  isLogin,
  isVerify,
  isRegister,
}: any) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {isVerify && (
          <Link href={"/dang-nhap"}>
            <IconChevronLeft size={32} color="var(--theme-color)" />
          </Link>
        )}
        <div className={styles.headerLogin}>
          <Avatar src={Logo.src} radius={"50%"} size={"100px"} />
          <p className={styles.loginTitle1}>{title}</p>
        </div>
        <div className={styles.loginTitle2}>
          <h2>{subTitle}</h2>
          <p>{description}</p>
        </div>
        {form}
        {isLogin && (
          <div>
            <p>
              Bạn không có tài khoản?{" "}
              <Link href="dang-ky" style={{ color: "blue" }}>
                Đăng Ký
              </Link>
            </p>
          </div>
        )}
        {isRegister && (
          <div className={styles.accept}>
            Bằng việc tiếp tục, bạn đã chấp nhận{" "}
            <div className={styles.acceptRules}>
              <p> Điều khoản sử dụng </p>
              <Checkbox
                defaultChecked
                labelPosition="left"
                color="var(--theme-color)"
              />
            </div>
          </div>
        )}

        {isVerify && (
          <div className="other-accuracy">
            <p className="other-accuracy__title">
              Mã xác minh có hiệu lực trong vòng 15 phút
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
