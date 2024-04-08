import prisma from "../prismadb";
import { getProductSimpleByID } from "./product";

export async function createReviewProduct(data: any) {
    try {
        const rs = await prisma.reviewsProduct.create({
            data: {                
                productId: (data.productId),
                orderId: (data.orderId).toString(),
                star: Number(data.star ?? 1),
                message: data.message?.toString(),
                createdId: (data.createdId),
                status: 'PUBLIC',
            }
        });
        return rs;
    } catch (error) {
        return { error };
    }
}
export async function getReviewsProduct(id:string,requestData: any) {
    let currentPage = 1;
    let take = 10;
    let limit = 10;
    if (requestData.limit) {
        take = parseInt(requestData.limit);
    }
    let page = requestData.page;
    if (page) {
        currentPage = Number(page);
    }
    const skip = take * (currentPage - 1);
    let product = await getProductSimpleByID(id);
    const [reviews, total] = await prisma.$transaction([
        prisma.reviewsProduct.findMany({
            take: take,
            skip: skip,
            orderBy: {
                id: "desc",
            },
            where: {
                productId: product?.id,
                status: 'PUBLIC'
            },
            include: {
                user: true
            }
        }),
        prisma.reviewsProduct.count({
            where: {
                productId: product?.id,
                status: 'PUBLIC'
            }
        })
    ]);
    const totalPage = Math.ceil(total / limit);

    // let reviewsRs = JSON.parse(JSON.stringify(reviews));


    return {
        data: reviews,
        total: total,
        currentPage: currentPage,
        limit: limit,
        totalPage: totalPage,
        status: 200,
    };
}