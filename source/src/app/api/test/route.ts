import { checkAuthToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    const getAuth = await checkAuthToken(request);
    // if(checkAuth!==true){
    //     return checkAuth;
    // }
    // const { searchParams } = new URL(request.url);
    return NextResponse.json({getAuth});
}