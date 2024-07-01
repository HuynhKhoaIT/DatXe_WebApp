import { Fragment, ReactNode, Suspense } from "react";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import Header from "../layout/common/desktop/HeaderDesktop";
import { MyFooter } from "../layout/common/desktop/Footer/FooterDesktop";
import HeaderTopMobileApp from "../layout/common/mobile/HeaderTopMobileApp";
import FooterMobileApp from "../layout/common/mobile/Footer/FooterMobileApp";
import { getSession } from "@/lib/auth";
export const dynamic = "force-dynamic";

interface IProps {
  children: ReactNode;
}
export default async function Layout({ children }: IProps) {
  const session = await getSession();
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  return (
    <Fragment>
      {isMobile ? (
        <main>
          <HeaderTopMobileApp />
          <div
            style={{
              minHeight: "calc(100vh - 67px)",
              marginTop: "var(--header-height)",
              marginBottom: "var(--bottom-height-mobile)",
            }}
          >
            {children}
          </div>
          <FooterMobileApp user={session?.user} />
        </main>
      ) : (
        <main>
          <Header />
          <div style={{ minHeight: "calc(100vh - 195px)" }}>{children}</div>
          <MyFooter />
        </main>
      )}
    </Fragment>
  );
}
