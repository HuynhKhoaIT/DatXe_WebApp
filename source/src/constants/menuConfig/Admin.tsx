import {
  IconCategory,
  IconClipboard,
  IconGasStation,
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
    link: "/admin/amentity",
    label: "Danh sách tiện ích",
    icon: IconGasStation,
  },
  { link: "/admin/slide-banner", label: "Danh sách banner", icon: IconPhoto },
  {
    link: "/admin/system-blogs",
    label: "Danh sách bài viết",
    icon: IconClipboard,
  },

  {
    label: "Danh mục",
    link: "/admin/system-categories",
    icon: IconCategory,
  },

  { link: "/admin/system-car", label: "Danh mục xe", icon: IconCar },
];

export default menuConfigAdmin;
