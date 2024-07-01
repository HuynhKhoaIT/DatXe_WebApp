import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import {
  createSlideBanner,
  getSlideBanners,
} from "@/app/libs/prisma/slideBanner";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { getSession } from "@/lib/auth";
import { checkAuthToken } from "@/utils/auth";
export async function GET(request: NextRequest) {
  try {
    const auth = await checkAuthToken(request);
    const { searchParams } = new URL(request.url);
    let garageId = "2";
    if (auth) {
      const requestData = {
        s: searchParams.get("s"),
        kind: searchParams.get("kind"),
        garageId: garageId,
      };
      const slideBanners = await getSlideBanners(requestData);
      return NextResponse.json(slideBanners);
    } else {
      throw new Error("Chua dang nhap");
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const auth = await checkAuthToken(request);
    if (auth) {
      json.createdBy = auth.id;
      const serviceAdvisor = await createSlideBanner(json);
      return new NextResponse(JSON.stringify(serviceAdvisor), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
