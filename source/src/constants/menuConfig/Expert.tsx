import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconUsers,
  IconCar,
  IconClipboard,
} from "@tabler/icons-react";

import { IconUsersGroup } from "@tabler/icons-react";
const menuConfigExpert = [
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
];

export default menuConfigExpert;