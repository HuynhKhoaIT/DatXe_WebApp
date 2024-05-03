import prisma from "../prismadb";

export async function createSeoMeta(dataInput:any) {
    try{
        const metaData = {
            title: dataInput.seoTitle,
            description: dataInput.seoDescription,
            thumbnail: dataInput.seoThumbnail,
            productId: dataInput.productId,
            postId: dataInput.postId
        }
        let metaId;
        if(dataInput.productId){
            let ob = await getByProductId(dataInput.productId);
            metaId = ob?.id;
        }else{
            let ob = await getByPostId(dataInput.postId);
            metaId = ob?.id;
        }
        console.log("metaId",metaId);
        if(metaId){
            return await prisma.seoMeta.updateMany({
                where:{
                    id: metaId
                },
                data: metaData
            })
        }
        return await prisma.seoMeta.create({
            data: metaData,
        })
    } catch (error) {
        return { error };
    }
}
export async function getByProductId(productId:string) {
    return await prisma.seoMeta.findFirst({
        where: {
            productId: productId
        }
    })
}
export async function getByPostId(postId:string) {
    return await prisma.seoMeta.findFirst({
        where: {
            postId: postId
        }
    })
}