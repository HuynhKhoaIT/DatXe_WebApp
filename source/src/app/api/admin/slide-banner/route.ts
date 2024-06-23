import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import {
  createSlideBanner,
  getSlideBanners,
} from "@/app/libs/prisma/slideBanner";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { getSession } from "@/lib/auth";
export async function GET(request: Request) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(request.url);
    let garageId = "2";
    if (session?.user) {
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

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const session = await getSession();
    if (session?.user) {
      json.createdBy = session.user?.id.toString();
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
