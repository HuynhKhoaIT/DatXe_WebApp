import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Các đường dẫn cần bảo vệ
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

export function middleware(request: NextRequest) {
  // Lấy session cookie từ request
  const sessionCookie = request.cookies.get("session");
  console.log(sessionCookie); // Debug: Kiểm tra giá trị cookie session

  // Kiểm tra sự tồn tại của session cookie
  if (!sessionCookie) {
    // Nếu không có session cookie, chuyển hướng đến trang login
    return NextResponse.redirect(new URL("/dang-nhap", request.url));
  }

  // Kiểm tra xem đường dẫn hiện tại có nằm trong danh sách các route được bảo vệ hay không
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    // Kiểm tra tính hợp lệ của session cookie (ví dụ: gọi API để kiểm tra tính hợp lệ của session)

    const session = sessionCookie.value;
    // Giả sử bạn có một hàm kiểm tra tính hợp lệ của session
    if (!isValidSession(session)) {
      // Nếu session không hợp lệ, chuyển hướng đến trang login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Nếu session hợp lệ hoặc đường dẫn không cần bảo vệ, cho phép tiếp tục
  const response = NextResponse.next();

  // Thiết lập cookie mới trên response (nếu cần thiết)
  response.cookies.set("vercel", "fast");
  response.cookies.set({
    name: "vercel",
    value: "fast",
    path: "/",
  });

  const newCookie = response.cookies.get("vercel");
  console.log(newCookie); // Debug: Kiểm tra giá trị cookie vercel

  return response;
}

// Giả sử bạn có một hàm kiểm tra tính hợp lệ của session (bạn cần triển khai hàm này)
function isValidSession(session: string): boolean {
  // Thêm logic kiểm tra session ở đây (ví dụ: kiểm tra trong cơ sở dữ liệu hoặc gọi API)
  // Trả về true nếu session hợp lệ, ngược lại trả về false
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
