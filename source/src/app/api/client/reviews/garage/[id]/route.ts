import { NextRequest, NextResponse } from 'next/server';
import { deleteReviewGarage, findReviewGarage, updateReviewGarage } from '@/app/libs/prisma/reviewGarage';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const review = await findReviewGarage(id);
        return NextResponse.json(review);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            const id = params.id;
            if (!id) {
                return new NextResponse("Missing 'id' parameter");
            }
            const json = await request.json();
            let updateData = {
                orderId: json.orderId,
                star: json.star,
                message: json.message,
                status: json.status,
            };
            const updatedReview = await updateReviewGarage(id,updateData);

            return new NextResponse(JSON.stringify(updatedReview), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            const id = params.id;
            if (!id) {
                return new NextResponse("Missing 'id' parameter");
            }
            const json = await request.json();
            const updatedReview = await deleteReviewGarage(id);

            return new NextResponse(JSON.stringify(updatedReview), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}