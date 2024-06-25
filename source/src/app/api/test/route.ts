import { getProducts } from "@/app/libs/prisma/carModelsOnProducts";
import prisma from "@/app/libs/prismadb";
import { checkAuthToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    // const getAuth = await checkAuthToken(request);
    // // if(checkAuth!==true){
    // //     return checkAuth;
    // // }
    // // const { searchParams } = new URL(request.url);
    // return NextResponse.json({getAuth});
    const data = await getProducts();
    return NextResponse.json(data)
}