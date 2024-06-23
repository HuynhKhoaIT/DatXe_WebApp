import { NextResponse } from "next/server";
import {
  createMarketingCampaign,
  getMarketingCampaign,
} from "@/app/libs/prisma/marketingCampaign";
import { createMarketingCampaignDetail } from "@/app/libs/prisma/marketingCampaignDetail";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(request.url);
    if (session?.user) {
      let garageId =
        (
          await getGarageIdByDLBDID(Number(session.user?.garageId))
        ).toString() ?? "2";
      const requestData = {
        s: searchParams.get("s"),
        limit: searchParams.get("limit"),
        page: searchParams.get("page"),
      };

      const marketingCampaign = await getMarketingCampaign(
        garageId,
        requestData
      );
      return NextResponse.json(marketingCampaign);
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
      json.createdBy = session.user?.id;
      json.garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
      const marketingCampaign = await createMarketingCampaign(json);
      return new NextResponse(JSON.stringify(marketingCampaign), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
