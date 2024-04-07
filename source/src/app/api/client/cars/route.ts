import { createCar, getCars } from '@/app/libs/prisma/car';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
import { getCustomerByUserId } from '@/app/libs/prisma/customer';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            const { searchParams } = new URL(request.url);
            const requestData = {
                garageId: "2",
                s: searchParams.get('s'),
                carBrandId: searchParams.get('carBrandId'),
                carNameId: searchParams.get('carNameId'),
                carYearId: searchParams.get('carYearId'),
                userId: session.user?.id
            };
            const cars = await getCars(requestData);

            return NextResponse.json(cars);
        } else {
            throw new Error('Chua dang nhap');
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            const json = await request.json();
            const customer = await getCustomerByUserId((session.user?.id ?? ""))
            json.garageId = Number(process.env.GARAGE_DEFAULT);
            json.userId = Number(session.user?.id);
            json.customerId = Number(customer?.id)
            const car = await createCar(json);
            return new NextResponse(JSON.stringify(car), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
