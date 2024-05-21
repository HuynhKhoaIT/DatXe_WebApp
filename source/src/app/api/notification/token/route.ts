import { deleteToken } from "firebase/messaging";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { deleteFirebaseTokenByUserIdAndToken } from "@/app/libs/prisma/firebaseToken";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const json = await request.json();
    const session = await getServerSession(authOptions);
    if(session){
        let userId = session?.user?.id ?? '';
        const notiRs = await deleteFirebaseTokenByUserIdAndToken(userId?.toString(),json.token);
        return NextResponse.json(notiRs)
    }
    return NextResponse.error()
}