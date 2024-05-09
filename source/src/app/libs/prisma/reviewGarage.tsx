import prisma from "../prismadb";

export async function createReviewGarage(data: any) {
    try {
        const rs = await prisma.reviewsGarage.create({
            data: {                
                garageId: (data.garageId),
                star: Number(data.star ?? 1),
                message: data.message?.toString(),
                createdId: (data.createdId).toString(),
                status: 'PUBLIC',
            }
        });
        return rs;
    } catch (error) {
        return { error };
    }
}

export async function findReviewGarage(id:string) {
    return await prisma.reviewsGarage.findFirst({
        where:{
            id
        }
    })
}

export async function updateReviewGarage(id:string, inputData: any) {
    const review = await findReviewGarage(id);
    return await prisma.reviewsGarage.update({
        where:{
            id
        },
        data: {
            garageId: inputData.garageId ?? review?.garageId,
            star: inputData.star ?? review?.star,
            message: inputData.message ?? review?.message,
            status: inputData.status ?? review?.status,
        }
    })
}

export async function deleteReviewGarage(id:string) {
    return await prisma.reviewsGarage.update({
        where:{
            id
        },
        data:{
            status: 'DELETE'
        }
    })
}

export async function getReviewsGarage(garageId:string,requestData: any) {
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
    const [reviews, total,avg] = await prisma.$transaction([
        prisma.reviewsGarage.findMany({
            take: take,
            skip: skip,
            orderBy: {
                id: "desc",
            },
            where: {
                garageId,
                status: 'PUBLIC'
            },
            include: {
                user: true
            }
        }),
        prisma.reviewsGarage.count({
            where: {
                garageId,
                status: 'PUBLIC'
            }
        }),
        prisma.reviewsGarage.aggregate({
            _avg: {
                star: true,
            },
            _count: true,
            where: {
                garageId: garageId,
            },
        })
    ]);
    const totalPage = Math.ceil(total / limit);
    return {
        data: reviews,
        avg: avg,
        total: total,
        currentPage: currentPage,
        limit: limit,
        totalPage: totalPage,
        status: 200,
    };
}

export async function getReviewOfCustomer(userId:string,garageId: string) {
    return await prisma.reviewsGarage.findFirst({
        where: {
            garageId
        }
    })
}