"use client";
import useFcmToken from "./hooks/useFCMToken";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "../utils/firebase";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { NOTIFICATION_ORDER_KIND, ROLE_EXPERT, storageKeys } from "@/constants";
import { useGlobalContext } from '@/app/Context/store';
export default function FcmTokenComp() {
  const router = useRouter();
  const { notificationPermissionStatus } = useFcmToken();
  const { noti, setNoti } = useGlobalContext();

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) => {
          setNoti(true);
          const notification = new Notification(payload.data.title, {
            icon: "https://oga.datxe.com/_next/static/media/logo.4089ae22.png",
          });
          notification.onclick = (event) => {
            event.preventDefault();
            if (
              role == ROLE_EXPERT &&
              payload.data?.kind == NOTIFICATION_ORDER_KIND
            ) {
              window.open(`https://oga.datxe.com/admin/order-manager`, "_blank");
            }
            if (
              JSON.parse(payload.data.data)?.code &&
              payload.data?.kind == NOTIFICATION_ORDER_KIND
            ) {
              window.open(`https://oga.datxe.com/dashboard/don-hang/${JSON.parse(payload.data.data)?.code}`, "_blank");
            }
          };
          toast.success((t) => (
            <div
              onClick={() => {
                if (
                  role == ROLE_EXPERT &&
                  payload.data?.kind == NOTIFICATION_ORDER_KIND
                ) {
                  router.push(`/admin/order-manager`);
                }
                if (
                  JSON.parse(payload.data.data)?.code &&
                  payload.data?.kind == NOTIFICATION_ORDER_KIND
                ) {
                  router.push(
                    `/dashboard/don-hang/${JSON.parse(payload.data.data)?.code
                    }`
                  );
                }
              }}
            >
              {payload.data.title}
            </div>
          ));
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null; // This component is primarily for handling foreground notifications
}
