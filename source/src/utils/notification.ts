import { getFirebaseTokenByGarageId, getFirebaseTokenByUserId } from "@/app/libs/prisma/firebaseToken";
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
        content: json.body ?? '',
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

export async function sendNotificationAdminOrderIntil(order:any) {
    // get token of gara
    const tokenFB = await getFirebaseTokenByGarageId(order.garageId);
    for (var t of tokenFB) {
        const dataNoti = {
            title: "Bạn có đơn hàng mới",
            body: "Bạn có đơn hàng mới",
            kind: 1,
            userId: t.userId,
            to: t.token,
            data: JSON.stringify({
                id: order.id
            })
        }
        const rs = await sendNotificationUntil(dataNoti);
    }
    return tokenFB;
}

