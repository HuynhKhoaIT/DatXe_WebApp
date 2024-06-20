"use client";
import { usePathname } from "next/navigation";
import { SidebarClient } from "./SidebarClient";
import { SidebarAdmin } from "./SidebarAdmin";
import { useAccountDetail } from "@/app/dashboard/hooks/profile/useProfile";
const ProfileSidebar = ({ myAccount }: any) => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  console.log(myAccount);
  return (
    <div
      className="user-profile-sidebar"
      style={{ height: "calc(100vh  - 40px)", overflowY: "auto" }}
    >
      <div className="user-profile-sidebar-top">
        <div className="user-profile-img">
          <img
            src={myAccount?.data?.avatar || "/assets/img/account/user.jpg"}
            alt=""
          />
          <input type="file" className="profile-img-file" />
        </div>
        <h5>{myAccount?.data?.fullName}</h5>
        <p>{myAccount?.data?.phoneNumber}</p>
      </div>
      {parts[1] === "admin" ? <SidebarAdmin /> : <SidebarClient />}
    </div>
  );
};
export { ProfileSidebar };
