import { deleted, find, updated } from "@/app/libs/prisma/bookingTTDK";
import { checkAuthToken } from "@/utils/auth";
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
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const getAuth = await checkAuthToken(request);
    if(getAuth!=null && getAuth.role == 'ADMINGARAGE'){
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const json = await request.json();
        const rs = await updated(id,json);
        return NextResponse.json(rs);
    }
    return NextResponse.json({
        status: "error",
        message: "Bearer token not defined"
    })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const getAuth = await checkAuthToken(request);
    if(getAuth!=null && getAuth.role == 'ADMINGARAGE'){
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const rs = await deleted(id);
        return NextResponse.json({ success: 1, message: 'Delete success' });
    }
    return NextResponse.json({
        status: "error",
        message: "Bearer token not defined"
    })
}