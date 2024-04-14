import { ReactNode, Fragment } from "react";
import styles from "../index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
interface IProps {
  children: ReactNode;
}

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách hãng xe", href: "/admin/system-car" },
  { title: "Thêm hãng xe" },
];
export default function CreateLayout({ children }: IProps) {
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div>{children}</div>
    </Fragment>
  );
}
