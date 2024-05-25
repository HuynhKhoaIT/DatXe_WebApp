import { getFirebaseTokenByGarageId, getFirebaseTokenByPhone, getFirebaseTokenByUserId } from "@/app/libs/prisma/firebaseToken";
import { createNotification } from "@/app/libs/prisma/notification";
import axios from "axios";
import { showStatusOrder } from "./order";

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

export async function sendNotificationAdminOrderUntil(order:any) {
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
                id: order.id,
                code: order.code
            })
        }
        const rs = await sendNotificationUntil(dataNoti);

    }
    return tokenFB;
}


export async function sendNotificationOrderUntil(order:any) {
    // get token of gara
    const tokenFB = await getFirebaseTokenByPhone(order.customer.phoneNumber);
    
    for (var t of tokenFB) {
        const statusOrder = showStatusOrder(order.step.toString());
        const dataNoti = {
            title: `Đơn hàng ${order.code} ${statusOrder}`,
            body: `Đơn hàng ${order.code} ${statusOrder}`,
            kind: 1,
            userId: t.userId,
            to: t.token,
            data: JSON.stringify({
                id: order.id,
                code: order.code
            })
        }
        const rs = await sendNotificationUntil(dataNoti);
        console.log('token',rs)
    }
    return tokenFB;
}

export async function sendNotificationGarageNew(garage: any) {
    const tokenFB = await getFirebaseTokenByPhone('0964824588');
    for (var t of tokenFB) {
        const dataNoti = {
            title: `Có chuyên gia mới ${garage.shortName}`,
            body: `Có chuyên gia mới ${garage.shortName}`,
            kind: 1,
            userId: t.userId,
            to: t.token,
            data: JSON.stringify({
                id: garage.id,
                code: garage.code
            })
        }
        const rs = await sendNotificationUntil(dataNoti);
    }
    return tokenFB;
}
export async function deleteToken({token}:any) {

    const response = await fetch('/api/notification/token', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({token})
    },
    );   
      
    return await response.json();
}

