import { create, gets } from "@/app/libs/prisma/bookingTTDK";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const requestData = {
            garageId: searchParams.get('garageId'),
            s: searchParams.get('s'),
            limit: searchParams.get('limit'),
            page: searchParams.get('page'),
        }
        const order = await gets(requestData);
        return new NextResponse(JSON.stringify(order));
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const dataInput = {
            licensePlates: json.licensePlates,
            phone: json.phone,
            fullname: json.fullname,
            dateSchedule: json.dateSchedule,
            time: json.time,
            garageId: json.garageId,
            note: json.note,
        }
        const order = await create(dataInput);
        return new NextResponse(JSON.stringify(order), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}