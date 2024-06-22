import Link from "next/link";
import styles from "./Header.module.scss";
import facebook from "@/assets/icons/faceBook.svg";
import pintest from "@/assets/icons/pinterest.svg";
import instagram from "@/assets/icons/instagram.svg";
import Container from "@/app/components/common/Container";
import SigninButton from "@/app/layout/common/desktop/login-button";
import NotificationDropDown from "./_component/NotificationDropDown";
import { getSession, logout } from "@/lib/auth";

export default async function HeaderTop() {
  const session = await getSession();
  const logoutHandle = async () => {
    "use server";
    await logout();
  };
  return (
    <div className={styles.headerTop}>
      <Container>
        <div className={styles.topWrapper}>
          <div className={styles.topLeft}>
            <img src={facebook.src} alt="Facebook Icon" />

            <img src={pintest.src} alt="{Pintest} Icon" />

            <img src={instagram.src} alt="Ig Icon" />
          </div>
          <div className={styles.topRight}>
            <Link href="/dashboard/danh-sach-don-hang" className={styles.title}>
              Kiểm tra lịch hẹn
            </Link>
            <NotificationDropDown />
            <SigninButton user={session?.user} logout={logoutHandle} />
          </div>
        </div>
      </Container>
    </div>
  );
}
