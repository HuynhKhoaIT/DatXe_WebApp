import { Fragment, ReactNode, Suspense } from "react";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
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
          <div
            style={{
              minHeight: "calc(100vh - 67px)",
              marginTop: "var(--header-height-mobile)",
              marginBottom: "var(--bottom-height-mobile)",
            }}
          >
            {children}
          </div>
        </main>
      ) : (
        <main>
          <div style={{ minHeight: "calc(100vh - 195px)" }}>{children}</div>
        </main>
      )}
    </Fragment>
  );
}
