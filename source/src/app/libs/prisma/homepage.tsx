import prisma from "../prismadb";

export async function getProductsHome(isProduct: number) {
    try {
        return await prisma.productsHome.findMany({
            orderBy: { index: "desc" },
            where: {
                AND: [
                    {
                        isProduct: isProduct
                    },
                ],
            },
            include: {
                product: true
            }
        })
    } catch (error) {
        return { error };
    }
}

export async function createProductsHome(params:any) {
    try {
        let isProduct = 1;
        if(params.isProduct == 'false' || params.isProduct == false){
            isProduct = 0;
        }
        let index = 10;
        if(params.index){
            index = Number(params.index);
        }
        return await prisma.productsHome.create({
            data:{
                productId: params.id,
                isProduct: isProduct,
                index: params.index
            }
        })
    } catch (error) {
        return { error };
    }
}

export async function deleteProductsHome(productId:string) {
    try {
        return await prisma.productsHome.delete({
            where:{
                productId
            }
        })
    } catch (error) {
        return { error };
    }
}