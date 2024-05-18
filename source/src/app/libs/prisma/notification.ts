
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

