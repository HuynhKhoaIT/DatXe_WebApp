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
        return await prisma.productsHome.create({
            data:{
                productId: params.id,
                isProduct: params.isProduct,
                index: params.index
            }
        })
    } catch (error) {
        return { error };
    }
}