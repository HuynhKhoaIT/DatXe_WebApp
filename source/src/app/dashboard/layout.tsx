import { ReactNode, Fragment } from "react";
import Menu from "../components/profile-sidebar/Menu";
import Header from "../layout/common/desktop/HeaderDesktop";
import { MyFooter } from "../layout/common/desktop/Footer/FooterDesktop";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import styles from "./index.module.scss";
import FooterMobile from "../layout/common/mobile/Footer/FooterMobile";
import HeaderMobile from "../layout/common/mobile/HeaderMobile";
import Container from "../components/common/Container";
import HeaderTopMobile from "../layout/common/mobile/HeaderTopMobile";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ROLE_CUSTOMER } from "@/constants";

interface IProps {
  children: ReactNode;
}
export default async function DashboardLayout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== ROLE_CUSTOMER) {
    return redirect(`/admin`);
  }

  return (
    <Fragment>
      {isMobile ? (
        <main>
          <HeaderTopMobile />
          <Container className={styles.wrapperMobile}>
            <div className={styles.content}>{children}</div>
          </Container>
          <FooterMobile />
        </main>
      ) : (
        <main>
          <Header />
          <div className={styles.wrapper}>
            <Container className={styles.container}>
              <div className={styles.navBar}>
                <Menu />
              </div>
              <div className={styles.content}>{children}</div>
            </Container>
          </div>
          <MyFooter />
        </main>
      )}
    </Fragment>
  );
}
