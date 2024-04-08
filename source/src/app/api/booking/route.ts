import {  NextResponse } from 'next/server';
import { bookingOrderClient } from '@/app/libs/prisma/order';

export async function POST(request: Request) {
    try {
        const json = await request.json();
        json.createdById = "1"
        const order = await bookingOrderClient(json);
        return new NextResponse(JSON.stringify(order), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
