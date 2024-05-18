import { createFirebaseToken } from "@/app/libs/prisma/firebaseToken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const dataInput = {
            token: json.token,
            userId: json.userId,
            customerId: json.customerId
        };
        const data = await createFirebaseToken(dataInput);
        return NextResponse.json(data);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function PUT(request: Request) {
    try {
        const json = await request.json();
        
        return NextResponse.json({
            token: json.token,
            userId: json.userId.toString()
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}