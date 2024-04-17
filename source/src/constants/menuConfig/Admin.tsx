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
    icon: IconCalendarStats,
  },
  { link: "/admin/slide-banner", label: "Danh sách banner", icon: IconCar },

  // {
  //   label: "Danh mục",
  //   link: "/admin/system-category",
  //   icon: IconCalendarStats,
  // },

  { link: "/admin/system-car", label: "Danh mục xe", icon: IconCar },
];

export default menuConfigAdmin;
