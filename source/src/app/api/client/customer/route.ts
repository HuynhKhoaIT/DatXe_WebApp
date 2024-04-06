import { createCustomer } from "@/app/libs/prisma/customer";
import { NextResponse } from "next/server";
import { sha256 } from "js-sha256";

export async function POST(request: Request) {
    try {
        const json = await request.json();
        json.garageId = Number(process.env.GARAGE_DEFAULT);
        json.userId = Number(json.userId);
        const hash = sha256(`${json.phoneNumber}|@|${Number(json.fullName)}`);
        if(json.hash == hash){
            const car = await createCustomer(json);
            return new NextResponse(JSON.stringify(car), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}