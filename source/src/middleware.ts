import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession, getProfile, callApi } from "./lib/auth";
import apiConfig from "./constants/apiConfig";

export async function middleware(request: NextRequest) {
  const session: any = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/dang-nhap", request.url));
  }
  // if (!isValidSession(session?.token)) {
  //   return NextResponse.redirect(new URL("/dang-nhap", request.url));
  // }
  const response = NextResponse.next();
  return response;
}

// Giả sử bạn có một hàm kiểm tra tính hợp lệ của session (bạn cần triển khai hàm này)
async function isValidSession(token: string) {
  // Thêm logic kiểm tra session ở đây (ví dụ: kiểm tra trong cơ sở dữ liệu hoặc gọi API)
  return true;
}

// Chỉ định các route sẽ áp dụng middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/gio-hang/:path*",
    "/admin/:path*",
    "/thong-bao",
    "/order/:path*",
  ],
};
