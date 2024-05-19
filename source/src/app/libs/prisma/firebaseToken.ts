import prisma from "../prismadb";

export async function createFirebaseToken(json: any){
    return await prisma.firebaseToken.create({
        data: {
            token: json.token,
            userId : json.userId as string,
            customerId: json.customerId as string
        }
    });
}

export async function getFirebaseTokenByPhone(phoneNumber:string) {
    return await prisma.firebaseToken.findFirst({
        select: {
            token: true,
            userId: true,
        },
        where:{
            user:{
                phoneNumber
            }
        }
    });
}

export async function getFirebaseTokenByUserId(userId:string) {
    return await prisma.firebaseToken.findMany({
        select: {
            token: true,
            userId: true,
        },
        where:{
            userId
        }
    });
}

export async function getFirebaseTokenByGarageId(garageId: string) {
    return await prisma.firebaseToken.findMany({
        select: {
            token: true,
            userId: true,
        },
        where:{            
            user:{
                role: 'ADMINGARAGE',
                status:'PUBLIC',
                garage:{
                    id: garageId
                }
            }
        }
    })
}

export async function getFirebaseTokenByCustomerId(customerId:string) {
    return await prisma.firebaseToken.findMany({
        where:{
            customerId
        }
    });
}
export async function deleteFirebaseTokenByUserIdAndToken(userId:string,token:string) {
    return await prisma.firebaseToken.deleteMany({
        where:{
            userId,
            token
        }
    })
}