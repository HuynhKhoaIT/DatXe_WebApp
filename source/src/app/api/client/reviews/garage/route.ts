import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createReviewGarage } from "@/app/libs/prisma/reviewGarage";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const session = await getServerSession(authOptions);
        if (session) {
            json.createdId = session.user?.id.toString();
            const review = await createReviewGarage(json);
            return NextResponse.json({
                data: review,
                status: 200,
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}