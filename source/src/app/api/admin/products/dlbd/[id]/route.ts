import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import { getServerSession } from 'next-auth';
import { getProductDetail } from '@/utils/product';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getByNameViaGarageId } from '@/app/libs/prisma/category';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        const id = params.id;
        if (session?.user?.token) {
            const productDlbd = await getProductDetail(Number(id));
            const garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            const cat = await getByNameViaGarageId(productDlbd.categoryName,garageId.toString());
            let carBrand:any = [];
            productDlbd.carNamesText.forEach(async (c: any) => {
                let yearId: any = [];
                if(c.type == "brand"){
                    let nameId: any = [];
                    productDlbd.carNamesText.forEach(async (cN: any) => {
                        if(cN.parent_id == c.id){
                            nameId.push(cN.id)
                            productDlbd.carNamesText.forEach(async (yN: any) => {
                                if(yN.type == "year" &&  yN.parent_id == cN.id){
                                    yearId.push(yN.id)
                                }
                            })
                        }
                        
                    })
                    carBrand.push({
                        brandId: c.id,
                        nameId: nameId.toString(),
                        yearId: yearId.toString()
                    });
                }
            });
            const productData = {
                sku: productDlbd.productCode,
                isProduct: productDlbd.isProduct,
                productId: productDlbd.id,
                name: productDlbd.name,
                description: productDlbd.description,
                price: productDlbd.price,
                categoryId: cat?.id,
                brandDetail: JSON.stringify(carBrand),
            }
            return NextResponse.json(productData);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
