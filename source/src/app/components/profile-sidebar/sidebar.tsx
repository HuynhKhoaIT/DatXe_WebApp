"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarClient } from "./SidebarClient";
import { SidebarAdmin } from "./SidebarAdmin";
import { useAccountDetail } from "@/app/dashboard/hooks/profile/useProfile";
const ProfileSidebar = ({ myAccount }: any) => {
  const pathname = usePathname();
  const parts = pathname.split("/");

  const { data: profile } = useAccountDetail();
  return (
    <div
      className="user-profile-sidebar"
      style={{ height: "calc(100vh  - 40px)", overflowY: "auto" }}
    >
      <div className="user-profile-sidebar-top">
        <div className="user-profile-img">
          <img
            src={profile?.data?.avatar || "/assets/img/account/user.jpg"}
            alt=""
          />
          {/* <button type="button" className="profile-img-btn">
            <i className="far fa-camera"></i>
          </button> */}
          <input type="file" className="profile-img-file" />
        </div>
        <h5>{profile?.data?.fullName}</h5>
        <p>{profile?.data?.phoneNumber}</p>
      </div>
      {parts[1] === "admin" ? <SidebarAdmin /> : <SidebarClient />}
    </div>
  );
};
export { ProfileSidebar };
