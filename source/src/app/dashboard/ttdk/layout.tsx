import { ReactNode, Fragment } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
interface IProps {
  children: ReactNode;
}

const Breadcrumbs = [
  { title: "Xe của tôi", href: "/dashboard/danh-sach-xe" },
  { title: "Đăng kiểm xe" },
];
export default function CreateLayout({ children }: IProps) {
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
