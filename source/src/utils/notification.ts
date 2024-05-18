import { createNotification } from "@/app/libs/prisma/notification";
import axios from "axios";

export async function sendNotificationUntil(json:any){

    const dataInput = {
        priority:"HIGH",
        data:{
            "title": json.title,
            "body":  json.body
        },
        to: json.to
    };
    const {data} = await axios.post('https://fcm.googleapis.com/fcm/send', dataInput, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${process.env.FIREBASE_KEY}`
        }
    })
    const crNoti = await createNotification({
        title: json.title,
        content: json.content ?? '',
        icon: json.icon ?? '',
        image: json.image ?? '',
        action: json.action ?? '',
        data: json.data ?? '',
        kind: json.kind ?? 0,
        userId: json.userId,
        customerId: json.customerId ?? "1"
    });
    return crNoti;
}