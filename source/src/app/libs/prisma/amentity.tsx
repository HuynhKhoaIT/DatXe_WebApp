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

export async function getAmentity(){
    const rs = await prisma.amenities.findMany();
    return rs;
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