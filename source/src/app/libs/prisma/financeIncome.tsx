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
        const [data, total] = await prisma.$transaction([
            prisma.order.findMany({
                take: take,
                skip: skip,
                orderBy: {
                    createdAt: "desc",
                },
                where:{
                    step: Number(ORDER_DONE),
                    garageId: params.garageId,
                    dateDone:{
                        gte: new Date(params.dateStart),
                        lte: new Date(params.dateEnd)
                    }
                }
            }),
            prisma.order.count({
                where:{
                    step: Number(ORDER_DONE),
                    garageId: params.garageId,
                    dateDone:{
                        gte: new Date(params.dateStart),
                        lte: new Date(params.dateEnd)
                    }
                }
            }),
        ]);
        let totalMoney = 0;
        data.forEach(d=>{
            totalMoney += d.total;
        })
        return {
            data: data,
            total: total,
            totalMoney: totalMoney,
            currentPage: currentPage, 
            limit: limit,
            totalPage: Math.ceil(total / limit),
            status: 201,
        };
    } catch (error) {
        return { error };
    }
    

}
