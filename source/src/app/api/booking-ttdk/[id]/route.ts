import { find } from "@/app/libs/prisma/bookingTTDK";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const data =  await find(id);
        return NextResponse.json(data);
    }catch (error:any) {
        return new NextResponse(error.message, { status: 500 });
    }
}