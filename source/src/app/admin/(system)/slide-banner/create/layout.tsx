import { ReactNode, Fragment } from "react";
import styles from "../index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
interface IProps {
  children: ReactNode;
}

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách banner", href: "/admin/slide-banner" },
  { title: "Thêm banner" },
];
export default function CreateLayout({ children }: IProps) {
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div className={styles.content}>{children}</div>
    </Fragment>
  );
}
