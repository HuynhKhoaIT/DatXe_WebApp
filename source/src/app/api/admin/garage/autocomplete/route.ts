import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { autoComplete } from "@/app/libs/prisma/garage";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);        
        if (1) {
            const { searchParams } = new URL(request.url);
            const garages = await autoComplete({
                s: searchParams.get('s')
            });
            return NextResponse.json(garages);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}