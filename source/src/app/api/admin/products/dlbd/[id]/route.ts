import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import { getServerSession } from 'next-auth';
import { getProductDetail } from '@/utils/product';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getByNameViaGarageId } from '@/app/libs/prisma/category';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
import { getCarModelById } from '@/app/libs/prisma/carModel';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        const id = params.id;
        if (session?.user?.token) {
            const productDlbd = await getProductDetail(Number(id));
            const garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            const cat = await getByNameViaGarageId(productDlbd.categoryName,garageId.toString());
            let carBrand:any = [];
            let carName:any = [];
            let carYear:any = [];
            productDlbd.carNamesText.forEach(async (c: any) => {
                if(c.type == "brand"){
                    carBrand.push(c.id);
                }else if(c.type == "car_name"){
                    carName.push(c.id)
                }else{
                    carYear.push(c.id)
                }
            });
            const carModelData = {
                "brandId": carBrand,
                "nameId": carName,
                "yearId": carYear,
            }
            const productData = {
                sku: productDlbd.productCode,
                isProduct: productDlbd.isProduct,
                productId: productDlbd.id,
                name: productDlbd.name,
                description: productDlbd.description,
                price: productDlbd.price,
                categoryId: cat?.id,
                brandDetail: carModelData,
            }
            return NextResponse.json(productData);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
