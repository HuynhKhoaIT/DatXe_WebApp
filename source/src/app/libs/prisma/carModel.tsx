import prisma from "../prismadb";

export async function getCarModels(requestData:any) {
    let parentId = "0";
    if(requestData.parentId){
        parentId = (requestData.parentId)
    }
    let currentPage = 1;
    let take = 10;
    if(requestData.limit){
      take = parseInt(requestData.limit)
    }
    const skip = take * (currentPage - 1);
    let page = requestData.page;
    if (page) {
        currentPage = Number(page);
    }
    let titleFilter = '';
    if(requestData.s){
        titleFilter = requestData.s;
    }
    const [carModels, total] = await prisma.$transaction([
        prisma.carModels.findMany({
            take: take,
            skip: skip,
            where: {
                parentId: parentId,
                title: {
                    contains: titleFilter!,
                }
            },
            orderBy: {
                title: 'asc',
            },
        }),
        prisma.carModels.count({
            where: {
                parentId: parentId,
                title: {
                    contains: titleFilter!,
                }
            },
        })
    ])
    const totalPage = Math.ceil(total / take);
    return {
        data: carModels,
        total: total,
        currentPage: currentPage,
        limit: take,
        totalPage: totalPage,
        status: 200,
    };
}
export async function getCarModelById(id: string) {
    try {
        const rs = await prisma.carModels.findUnique({
            where:{
                id: (id)
            }
        });
        return rs;
    } catch (error) {
      return {error} ;
    }
}

export async function createCarModel(params:any) {
    try {
        const rs = await prisma.carModels.create({
            data: {
                title: params.title,
                description: params.description,
                parentId: (params.parentId),
                type: (params.type),
            }
        });
        return rs;
    } catch (error) {
        return {error} ;
    }
}

export async function updateCarModel(id:string,data: any) {
    try {
        const rs = await prisma.carModels.update({
            where:{
                id: (id)
            },
            data
        });
        return rs;
    } catch (error) {
        
    }
}
export async function removeCarModel(id:string) {
    try {
        const rs = await prisma.carModels.delete({
            where:{
               id:  (id)
            }
        });
        return rs;
    } catch (error) {
        
    }
}

