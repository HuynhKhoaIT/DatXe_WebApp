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

export async function getFirebaseTokenByUserId(userId:string) {
    return await prisma.firebaseToken.findMany({
        where:{
            userId
        }
    });
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