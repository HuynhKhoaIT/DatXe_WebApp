import {
  IconCategory,
  IconClipboard,
  IconGasStation,
  IconNotes,
  IconPhoto,
} from "@tabler/icons-react";
import { IconCalendarStats, IconUsers, IconCar } from "@tabler/icons-react";

const menuConfigAdmin = [
  {
    label: "Danh sách chuyên gia",
    icon: IconUsers,
    link: "/admin/system-experts",
  },
  {
    label: "Quản lí trang chủ",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Danh sách sản phẩm", link: "/admin/system-products" },
      { label: "Sản phẩm nổi bật", link: "/admin/products-hot" },
      { label: "Dịch vụ nổi bật", link: "/admin/services-hot" },
    ],
  },
  {
    label: "Quản lí banner",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Danh sách banner", link: "/admin/slide-banners" },
      { label: "Danh sách merketing", link: "/admin/system-marketing-list" },
    ],
  },
  {
    link: "/admin/amentities",
    label: "Danh sách tiện ích",
    icon: IconGasStation,
  },
  {
    link: "/admin/system-blogs",
    label: "Danh sách bài viết",
    icon: IconClipboard,
  },
  {
    label: "Quản lí người dùng",
    icon: IconUsers,
    links: [
      {
        label: "Danh sách khách hàng",
        link: "/admin/system-customers",
      },
      {
        label: "Danh sách người dùng",
        link: "/admin/system-users",
      },
    ],
  },
  {
    label: "Danh mục",
    link: "/admin/system-categories",
    icon: IconCategory,
  },

  { link: "/admin/system-car", label: "Danh mục xe", icon: IconCar },
];

export default menuConfigAdmin;
