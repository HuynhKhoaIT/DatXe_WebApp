import { Fragment, ReactNode, Suspense } from "react";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import HeaderMobile from "@/app/layout/common/mobile/HeaderMobile";
import FooterMobile from "@/app/layout/common/mobile/Footer/FooterMobile";
import Header from "@/app/layout/common/desktop/HeaderDesktop";
import { MyFooter } from "@/app/layout/common/desktop/Footer/FooterDesktop";
import HeaderTop from "../layout/common/desktop/HeaderTop";
import HeaderLanding from "../layout/common/desktop/HeaderLanding";
import FooterMobileApp from "../layout/common/mobile/Footer/FooterMobileApp";
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
          <HeaderTop />
          <HeaderLanding />
          <div>{children}</div>
          <MyFooter />
        </main>
      )}
    </Fragment>
  );
}
