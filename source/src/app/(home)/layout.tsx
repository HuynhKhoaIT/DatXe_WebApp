import { Fragment, ReactNode, Suspense } from "react";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import Header from "../layout/common/desktop/HeaderDesktop";
import { MyFooter } from "../layout/common/desktop/Footer/FooterDesktop";
import HeaderMobile from "../layout/common/mobile/HeaderMobile";
import FooterMobile from "../layout/common/mobile/Footer/FooterMobile";
import FooterMobileApp from "../layout/common/mobile/Footer/FooterMobileApp";
export const dynamic = "force-dynamic";

interface IProps {
  children: ReactNode;
}
export default function Layout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  return (
    <Fragment>
      {isMobile ? (
        <main>
          <HeaderMobile />
          <div
            style={{
              marginTop: "var(--header-height-mobile)",
              marginBottom: "var(--bottom-height-mobile)",
            }}
          >
            {children}
          </div>
          <FooterMobileApp />
        </main>
      ) : (
        <main>
          <Header />

          <div>{children}</div>
          <MyFooter />
        </main>
      )}
    </Fragment>
  );
}
