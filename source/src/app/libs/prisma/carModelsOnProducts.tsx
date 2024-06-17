import prisma from "../prismadb";

export async function getProducts(brandId: string, nameId: string, yearId: string) {


    if(yearId){
        // get all of year
        const yearsID = await prisma.carModels.findMany({
            where:{
                parentId: nameId,
                id: {
                    not: yearId
                }
            },
            select:{
                id: true
            }
        });
        const namesID  = await prisma.carModels.findMany({
            where:{
                parentId: brandId,
                id: {
                    not: nameId
                }
            },
            select:{
                id: true
            }
        })
        
        return await prisma.carModelsOnProducts.findMany({
            where:{
                OR:[
                    //get all of year
                    {
                        carModelId: yearId
                    },
                    // get all of carName and not child parent
                    {
                        carModel: {
                            id:{
                                not: {
                                    
                                }
                            }
                        }
                    }
                ]
            }
        })
    }
    
    
}