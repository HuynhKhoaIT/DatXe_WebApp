import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createQrGarage } from "@/app/libs/prisma/garage";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if(session){
            const json = await request.json();
            const garage = await createQrGarage(json);
            return NextResponse.json(garage);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}