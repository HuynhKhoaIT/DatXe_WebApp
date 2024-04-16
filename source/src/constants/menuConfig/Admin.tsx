import { IconCalendarStats, IconUsers, IconCar } from "@tabler/icons-react";

const menuConfigAdmin = [
  { label: "Danh mục", link: "/admin/categories", icon: IconCalendarStats },
  {
    label: "Danh sách chuyên gia",
    icon: IconUsers,
    link: "/admin/expert",
  },
  { link: "/admin/system-car", label: "Danh mục xe", icon: IconCar },
  {
    link: "/admin/amentity",
    label: "Danh sách tiện ích",
    icon: IconCalendarStats,
  },
  { link: "/admin/slide-banner", label: "Danh sách banner", icon: IconCar },
];

export default menuConfigAdmin;
