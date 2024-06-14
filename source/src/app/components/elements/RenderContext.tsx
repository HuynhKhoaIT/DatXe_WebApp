import React from "react";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
const RenderContext = ({ components, layoutProps, ...props }: any) => {
  const { isMobile, isTablet, isDesktop } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  const ComponentRender = !isMobile
    ? components?.desktop?.defaultTheme
    : components?.mobile?.defaultTheme;
  // const ComponentRender = isTablet ?
  return <ComponentRender {...props} />;
};

export default RenderContext;
