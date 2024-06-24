import prisma from "../prismadb";

export async function getProducts() {

    const nameId = '29';
    const yearId = '32';
    const brandId = '12742';
    const yearsID = await prisma.carModels.findMany({
        where:{
            parentId: nameId,
            id: {
                not: yearId
            }
        },
        select:{
            id: true,
            // title: true,
        }
    });
    let years:any = [];
    yearsID.map((i) => {
        years.push(i.id);
    })
    const namesID  = await prisma.carModels.findMany({
        where:{
            parentId: brandId,
            id: {
                not: nameId
            }
        },
        select:{
            id: true,
        }
    })

    let names:any = [];
    namesID.map((i) => {
        names.push(i.id);
    })

    const productsInOtherYears = await prisma.product.findMany({
        where:{
            brands:{
                some:{
                    carModelId: {
                        in: years
                    }
                }
            }
        },
        select: {
            id: true
        }
    })

    let productsNotIn:any = [];
    productsInOtherYears.map((i)=>{
        productsNotIn.push(i.id)
    })

    return await prisma.product.findMany({
        where:{
            OR:[
                {
                    brands:{
                        none: {}
                    }
                },
                //get all of year
                {
                    brands:{
                        some: {
                            carModelId: yearId
                        }
                    }
                },
                //get all of carName and not child parent
                {
                    id: {
                        notIn: productsNotIn
                    },
                    brands:{
                        some:{
                            carModelId: nameId
                        }
                    }
                }
                
            ]
        }
    })
    
    
}