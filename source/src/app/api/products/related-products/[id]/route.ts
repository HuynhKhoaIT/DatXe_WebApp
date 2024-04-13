import { relatedProducts } from "@/app/libs/prisma/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const rs = await relatedProducts(id);
        return NextResponse.json(rs);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
