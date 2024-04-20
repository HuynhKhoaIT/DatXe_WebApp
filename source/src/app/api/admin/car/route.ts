import { createCar, getCars } from '@/app/libs/prisma/car';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';


export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            const { searchParams } = new URL(request.url);
            const requestData = {
                garageId: garageId,
                s: searchParams.get('s'),
                customerId: searchParams.get('customerId'),
                carBrandId: searchParams.get('carBrandId'),
                carNameId: searchParams.get('carNameId'),
                carYearId: searchParams.get('carYearId'),
                limit: searchParams.get('limit'),
                page: searchParams.get('page'),
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
            const json      = await request.json();
            let garageId    = await getGarageIdByDLBDID(Number(session.user?.garageId));
            json.garageId   = garageId;
            json.userId     = session?.user?.id.toString();
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
