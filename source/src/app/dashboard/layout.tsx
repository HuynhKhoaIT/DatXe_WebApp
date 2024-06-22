import { ReactNode, Fragment } from "react";
import Menu from "../components/profile-sidebar/Menu";
import Header from "../layout/common/desktop/HeaderDesktop";
import { MyFooter } from "../layout/common/desktop/Footer/FooterDesktop";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import styles from "./index.module.scss";
import Container from "../components/common/Container";
import { redirect } from "next/navigation";
import { ROLE_CUSTOMER } from "@/constants";
import FooterMobileApp from "../layout/common/mobile/Footer/FooterMobileApp";
import HeaderTopMobileApp from "../layout/common/mobile/HeaderTopMobileApp";
import { getSession } from "@/lib/auth";

interface IProps {
  children: ReactNode;
}
export default async function DashboardLayout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  const session: any = await getSession();
  if (session?.user?.role !== ROLE_CUSTOMER) {
    return redirect(`/admin`);
  }

  return (
    <Fragment>
      {isMobile ? (
        <main>
          <HeaderTopMobileApp />
          <div className={styles.wrapperMobile}>
            <div className={styles.content}>{children}</div>
          </div>
          {/* <FooterMobile /> */}
          <FooterMobileApp user={session.user} />
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
