import { ReactNode, Fragment } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
interface IProps {
  children: ReactNode;
}

const Breadcrumbs = [
  { title: "Đơn hàng", href: "/dashboard/danh-sach-don-hang" },
  { title: "Thông tin đơn hàng" },
];
export default function OrderDetailLayout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  return (
    <Fragment>
      {!isMobile && <Breadcrumb breadcrumbs={Breadcrumbs} />}
      {children}
    </Fragment>
  );
}
