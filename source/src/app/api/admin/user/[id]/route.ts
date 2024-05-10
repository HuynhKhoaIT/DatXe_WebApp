import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { findUser, updateUser } from "@/app/libs/prisma/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const data =  await findUser(id);
        return NextResponse.json(data);
    }catch (error:any) {
        return new NextResponse(error.message, { status: 500 });
    }
}


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const json = await request.json();
        const session = await getServerSession(authOptions);
        if (session) {
            json.id = id;
            const user = await updateUser(json);
            return new NextResponse(JSON.stringify(user), {
            status: 201,
            headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error:any) {
        return new NextResponse(error.message, { status: 500 });
    }
}