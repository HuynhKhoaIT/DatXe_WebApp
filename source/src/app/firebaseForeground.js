'use client'
import useFcmToken from "./hooks/useFCMToken";
import { getMessaging, onMessage } from 'firebase/messaging';
import firebaseApp from '../utils/firebase';
import { useEffect } from 'react';
import { notifications } from "@mantine/notifications";

export default function FcmTokenComp() {
  const {  notificationPermissionStatus } = useFcmToken();
  useEffect(() => {
    
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) =>{
          new Notification(payload.data.title)
          notifications.show({
            title: payload.data.title,
            message: payload.data.body,
          });
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);



  return null; // This component is primarily for handling foreground notifications
}