import { NextResponse } from "next/server";
import prisma from "../prismadb";
export async function createAmentity(data: any) {
    const rs = await prisma.amenities.create({
        data: {
            title: data.title,
            thumbnail: data.thumbnail,
            description: data.description
        }
    })
    return rs;
}

export async function getAmentity(requestData: any){
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
    let s = '';
    if(requestData.s){
        s = requestData.s;
    }
    const skip = take * (currentPage - 1);
    const [data, total] = await prisma.$transaction([
        prisma.amenities.findMany({
            take: take,
            skip: skip,
            where:{
                title: {
                    contains: s
                }
            }
        }),
        prisma.amenities.count(
            {
                where:{
                    title: {
                        contains: s
                    }
                }
            }
        )
    ])
    return {
        data: data,
        total: total,
        currentPage: currentPage,
        limit: limit,
        totalPage: Math.ceil(total / limit),
        status: 201,
    };
}
export async function findAmentity(id: string){
    const rs = await prisma.amenities.findFirst(
        {
            where:{
                id
            }
        }
    );
    return rs;
}
export async function updateAmentity(id: string,data:any) {
    const old = await prisma.amenities.findFirstOrThrow({
        where: {
            id
        }
    });
    const rs = await prisma.amenities.update({
        where:{
            id
        },
        data:{
            title: data.title ?? old.title,
            thumbnail: data.thumbnail ?? old.thumbnail,
            description: data.description ?? old.description,
        }
    })
    return rs;
}

export async function deleteAmentity(id:string) {
    return await prisma.amenities.delete({
        where:{
            id
        }
    })
}