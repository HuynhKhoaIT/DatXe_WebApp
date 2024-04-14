"use client";
import { ScrollArea } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconUsers,
  IconCar,
  IconClipboard,
} from "@tabler/icons-react";
import classes from "./NavbarNested.module.scss";
import { LinksGroup } from "../components/NavBarLinksGroup/NavBarLinksGroup";
import { IconUsersGroup } from "@tabler/icons-react";
import FooterAdmin from "../layout/common/desktop/Footer/footer-admin";
import { useSession } from "next-auth/react";

export function NavbarNested({ toggle }: any) {
  var { data: session, status } = useSession();
  const mockdata = [
    { link: "/admin", label: "Tổng quan", icon: IconGauge },
    {
      label: "Đơn hàng",
      icon: IconNotes,
      initiallyOpened: true,
      links: [
        { label: "Danh sách đơn hàng", link: "/admin/order-manager" },
        { label: "Công việc & Lịch đặt", link: "/admin/orders" },
      ],
    },

    {
      label: "Sản phẩm",
      icon: IconCalendarStats,
      links: [
        { label: "Danh sách sản phẩm", link: "/admin/products" },
        { label: "Danh mục", link: "/admin/categories" },
      ],
    },

    { link: "/admin/blogs", label: "Danh sách bài viết", icon: IconClipboard },

    { link: "/admin/cars", label: "Danh sách xe", icon: IconCar },
    {
      link: "/admin/customers",
      label: "Khách hàng",
      icon: IconUsersGroup,
    },
    { link: "/admin/marketing-campaign", label: "Marketing", icon: IconGauge },
    {
      label: "Chuyên gia",
      icon: IconUsers,
      links: [{ label: "Danh sách chuyên gia", link: "/admin/expert" }],
    },
    {
      label: "Hệ thống",
      icon: IconCalendarStats,
      links: [
        { label: "Danh mục xe", link: "/admin/system-car" },
        { label: "Danh sách tiện ích", link: "/admin/amentity" },
      ],
    },
  ];

  // if (session?.user?.role === "ADMIN") {
  //   mockdata.push({
  //     label: "Hệ thống",
  //     icon: IconCalendarStats,
  //     links: [{ label: "Danh mục xe", link: "/admin/system-car" }],
  //   });
  // }
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} toggle={toggle} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
      <div className={classes.footer}>
        <FooterAdmin />
      </div>
    </nav>
  );
}
