import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUsers } from "@/app/libs/prisma/user";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(request.url);
        if(session){
            let page = 1;
            if (searchParams.get('page')) {
                page = Number(searchParams.get('page'));
            }
            const requestData = {
                s: searchParams.get('phoneNumber'),
                limit: 10,
                take: 10,
                page: page,
            };
            const data =  await getUsers(requestData);
            return NextResponse.json(data)
        }else {
            throw new Error('Chua dang nhap');
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}