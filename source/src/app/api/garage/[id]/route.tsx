import { showGarage } from "@/app/libs/prisma/garage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const garage = await showGarage(id);
        return NextResponse.json(garage)
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}