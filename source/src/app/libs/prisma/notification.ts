
import prisma from "../prismadb";

export async function getNotications(requestData: any) {
    try {
      let currentPage = 1;
      let take = 10;
      let limit = Number(requestData.limit);
      let page = requestData.page;
  
      if (page) {
        currentPage = Number(page);
      }
      if (limit) {
        take = Number(limit);
      } else {
        limit = 10;
      }
      const skip = take * (currentPage - 1);
      const [data, total] = await prisma.$transaction([
        prisma.notification.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            take: take,
            skip: skip,
            where: {
                userId: requestData.userId.toString(),
                notificationOnUser:{
                    some: {
                        deleted: false
                    }
                }
            },
            include:{
                notificationOnUser: {
                    select: {
                        readed:true
                    }
                }
            }
            }),
            prisma.notification.count({
                where: {
                    userId: requestData.userId.toString(),
                    notificationOnUser:{
                        some: {
                            deleted: false
                        }
                    }
                },
            }),
      ]);
      return {
        data: data,
        total: total,
        currentPage: currentPage,
        limit: limit,
        totalPage: Math.ceil(total / limit),
        status: 201,
      };
    } catch (error) {
      return { error };
    }
}


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
            userId: json.userId,
            customerId:json.customerId,
            notificationOnUser: {
                create:{
                    userId: json.userId,
                    customerId:json.customerId
                }
            }
        }
    });
}

export async function showNotification(id:string) {
    return prisma.notification.findFirst({
        where:{
            id
        },
        include: {
            notificationOnUser: true
        }
    });
}

export async function readedNotification(id:string) {
    const noti = await prisma.notification.findFirst({
        where: {
            id
        }
    })
    const notiUser = await prisma.notificationOnUser.findFirst({
        where: {
            notifictaionId: id,
        }
    });
    if(!notiUser){
        return await prisma.notificationOnUser.create({
            data: {
                notifictaionId: id,
                readed: true,
                userId: noti?.userId,
                customerId: noti?.customerId
            }
        });
    }
    return await prisma.notificationOnUser.updateMany({
        where: {
            notifictaionId: id,
        },
        data: {
            readed: true,
        }
    })
}

export async function deletedNotification(id:string) {
    const noti = await prisma.notification.findFirst({
        where: {
            id
        }
    })
    const notiUser = await prisma.notificationOnUser.findFirst({
        where: {
            notifictaionId: id,
        }
    });
    if(!notiUser){
        return await prisma.notificationOnUser.create({
            data: {
                notifictaionId: id,
                deleted: true,
                userId: noti?.userId,
                customerId: noti?.customerId
            }
        });
    }
    return await prisma.notificationOnUser.updateMany({
        where: {
            notifictaionId: id,
        },
        data: {
            deleted: true,
        }
    })
}

