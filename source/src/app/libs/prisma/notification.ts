
import prisma from "../prismadb";

export async function createNotification(json: any){
    return await prisma.notification.create({
        data: {
            title: json.title,
            content: json.content,
            icon: json.icon,
            image: json.image,
            action: json.action,
            data: json.data,
            kind: json.kind,
            notificationOnUser: {
                create:{
                    userId: json.userId,
                    customerId:json.customerId
                }
            }
        }
    });
}

