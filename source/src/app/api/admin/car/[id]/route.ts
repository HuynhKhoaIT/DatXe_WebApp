import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { getCarModelById } from '@/app/libs/prisma/carModel';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const session = await getServerSession(authOptions);

        if (session) {
            const car = await prisma.car.findFirst({
                where: {
                    id: id,
                },
                include: {
                    customer: true,
                    carStyle: true,
                },
            });
            let carRs = JSON.parse(JSON.stringify(car));
            let br = await getCarModelById(carRs.carBrandId);
            let md = await getCarModelById(carRs.carNameId);
            let y = await getCarModelById(carRs.carYearId);
            carRs.brandName = br;
            carRs.modelName = md;
            carRs.yearName = y;
            return NextResponse.json(carRs);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            const id = params.id;
            if (!id) {
                return new NextResponse("Missing 'id' parameter");
            }
            const json = await request.json();
            let updateData = {
                customerId: (json.customerId),
                numberPlates: json.numberPlates,
                carBrandId: (json.carBrandId),
                carNameId: (json.carNameId),
                carYearId: (json.carYearId),
                carStyleId: (json.carStyleId),
                color: json.color,
                vinNumber: json.vinNumber,
                machineNumber: json.machineNumber,
                description: json.description,
                status: json.status,
                garageId: (json.garageId),
            };
            const updatedCar = await prisma.car.update({
                where: {
                    id: (id),
                },
                data: updateData,
                include: {
                    customer: true,
                    carStyle: true,
                },
            });

            let carRs = JSON.parse(JSON.stringify(updatedCar));
            let br = await getCarModelById(carRs.carBrandId);
            let md = await getCarModelById(carRs.carNameId);
            let y = await getCarModelById(carRs.carYearId);
            carRs.brandName = br;
            carRs.modelName = md;
            carRs.yearName = y;

            return new NextResponse(JSON.stringify(carRs), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    if (!id) {
        return new NextResponse("Missing 'id' parameter");
    }

    const rs = await prisma.car.update({
        where: {
            id: (id.toString()),
        },
        data: {
            status: 'DELETE',
        },
    });

    return NextResponse.json({ success: 1, message: 'Delete success' });
}


