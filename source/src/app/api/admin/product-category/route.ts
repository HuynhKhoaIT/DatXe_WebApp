import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getCategories } from "@/app/libs/prisma/category";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      let garageId = getAuth?.garageId;
      if (getAuth?.role == "ADMIN") {
        garageId = "2";
      }
      const { searchParams } = new URL(request.url);
      let page = 1;
      if (searchParams.get("page")) {
        page = Number(searchParams.get("page"));
      }
      const requestData = {
        s: searchParams.get("s"),
        limit: searchParams.get("limit") || 10,
        take: 10,
        page: page,
        garageId: garageId,
      };
      const productCategory = await getCategories(requestData);
      return NextResponse.json(productCategory);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      let garageId = getAuth?.garageId;
      if (getAuth.role == "ADMIN") {
        garageId = "2";
      }
      json.garageId = garageId;
      const productCategory = await prisma.productCategory.create({
        data: json,
      });
      return new NextResponse(JSON.stringify(productCategory), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
