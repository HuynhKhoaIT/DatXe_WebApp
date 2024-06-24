import { getCustomers } from "@/app/libs/prisma/customer";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { generateUUID } from "@/utils/until";
import { getSession } from "@/lib/auth";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = await checkAuthToken(request);
    if (auth) {
      let garageId = auth?.garageId;
      const { searchParams } = new URL(request.url);
      let customerGroup: any = 0;
      if (searchParams.get("customerGroup")) {
        customerGroup = Number(searchParams.get("customerGroup"));
      }
      let page = 1;
      if (searchParams.get("page")) {
        page = Number(searchParams.get("page"));
      }
      const requestData = {
        s: searchParams.get("s"),
        phoneNumber: searchParams.get("phoneNumber"),
        limit: 10,
        take: 10,
        page: page,
        customerGroup: customerGroup,
        garageId: garageId,
        status: "PUBLIC",
      };
      const customers = await getCustomers(requestData);
      return NextResponse.json(customers);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

interface formData {
  fullName: string;
  phoneNumber: string;
  cityId: Number;
  districtId: Number;
  wardId: Number;
  address: string;
  dob: Date;
  description: string;
  garageId: Number;
  sex: any;
  status: any;
}

export async function POST(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      let garageId = getAuth?.garageId;
      const json: formData = await request.json();
      const checkCustomer = await prisma.customer.findFirst({
        where: {
          phoneNumber: json.phoneNumber,
          garageId,
          status: {
            not: "DELETE",
          },
        },
      });
      // return NextResponse.json(checkCustomer)
      if (!checkCustomer) {
        const customer = await prisma.customer.create({
          data: {
            uuId: generateUUID(),
            fullName: json.fullName,
            phoneNumber: json.phoneNumber,
            cityId: Number(json.cityId),
            districtId: Number(json.districtId),
            wardId: Number(json.wardId),
            address: json.address,
            dob: json.dob,
            description: json.description,
            sex: json.sex,
            garageId: garageId.toString(),
            status: json.status,
            userId: session.user?.id.toString() ?? "1",
          },
          include: {
            cars: true,
          },
        });
        return new NextResponse(JSON.stringify(customer), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new NextResponse("Lỗi trùng số điện thoại", {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
