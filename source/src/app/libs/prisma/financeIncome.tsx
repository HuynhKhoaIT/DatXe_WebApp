import { ORDER_DONE } from "@/constants";
import prisma from "../prismadb";
export async function getFinanceIncome(params:any) {
    try {
        let currentPage = 1;
        let take = 10;
        let limit = Number(params.limit);
        let page = params.page;

        if (page) {
        currentPage = Number(page);
        }
        if (limit) {
        take = Number(limit);
        } else {
        limit = 10;
        }
        const skip = take * (currentPage - 1);
        const [data, total,allData] = await prisma.$transaction([
            prisma.order.findMany({
                take: take,
                skip: skip,
                orderBy: {
                    dateDone: "desc",
                },
                where:{
                    step: Number(ORDER_DONE),
                    garageId: params.garageId,
                    dateDone:{
                        gte: new Date(params.startDate),
                        lte: new Date(params.endDate)
                    }
                },
                include:{
                    customer: true
                }
            }),
            prisma.order.count({
                where:{
                    step: Number(ORDER_DONE),
                    garageId: params.garageId,
                    dateDone:{
                        gte: new Date(params.startDate),
                        lte: new Date(params.endDate)
                    }
                }
            }),
            prisma.order.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                select:{
                    createdAt: true,
                    dateDone:true,
                    total:true
                },
                where:{
                    step: Number(ORDER_DONE),
                    garageId: params.garageId,
                    dateDone:{
                        gte: new Date(params.startDate),
                        lte: new Date(params.endDate)
                    }
                },
            })
        ]);
        
        return {
            data: data,
            total: total,
            allData: allData,
            currentPage: currentPage, 
            limit: limit,
            totalPage: Math.ceil(total / limit),
            status: 201,
        };
    } catch (error) {
        return { error };
    }
    

}
