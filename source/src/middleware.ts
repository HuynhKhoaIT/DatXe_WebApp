import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/gio-hang/:path*',
        '/admin/:path*',
        '/thong-bao',
        '/order/:path*',
    ],
};
// export function middleware(request: NextRequest) {
    // if (request.nextUrl.pathname.startsWith('/api')) {
    //     const BearerToken = request.headers.get("authorization") as string;
    //     if(!BearerToken){
    //         return new NextResponse(JSON.stringify({
    //             errorMessage:"Bearer token not defined"
    //         }))
    //     }
    //     console.log("token",BearerToken)
    // }
    // return NextResponse.next()
// }