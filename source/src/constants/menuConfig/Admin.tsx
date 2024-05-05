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
    link: "/admin/system-expert",
  },
  {
    label: "Quản lí trang chủ",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Danh sách banner", link: "/admin/slide-banner" },
      { label: "Sản phẩm nổi bật", link: "/admin/system-products" },
      { label: "Dịch vụ nổi bật", link: "/admin/system-services" },
      // { label: "Chương trình Marketing", link: "/admin/system-marketing" },
    ],
  },
  {
    link: "/admin/amentity",
    label: "Danh sách tiện ích",
    icon: IconGasStation,
  },
  {
    link: "/admin/system-blogs",
    label: "Danh sách bài viết",
    icon: IconClipboard,
  },
  {
    label: "Danh sách khách hàng",
    icon: IconUsers,
    link: "/admin/system-customer",
  },
  // {
  //   label: "Danh sách xe",
  //   icon: IconUsers,
  //   link: "/admin/system-cars",
  // },
  {
    label: "Danh mục",
    link: "/admin/system-categories",
    icon: IconCategory,
  },

  { link: "/admin/system-car", label: "Danh mục xe", icon: IconCar },
];

export default menuConfigAdmin;
