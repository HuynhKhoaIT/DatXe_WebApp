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
        if (1) {
            const json = await request.json();
            json.garageId = Number(process.env.GARAGE_DEFAULT);
            json.userId = Number(2090);
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
