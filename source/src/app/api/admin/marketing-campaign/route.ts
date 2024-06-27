import { NextRequest, NextResponse } from "next/server";
import {
  createMarketingCampaign,
  getMarketingCampaign,
} from "@/app/libs/prisma/marketingCampaign";
import { createMarketingCampaignDetail } from "@/app/libs/prisma/marketingCampaignDetail";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { getSession } from "@/lib/auth";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    const { searchParams } = new URL(request.url);
    if (getAuth) {
      let garageId = getAuth.garageId ?? "";
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

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      json.createdBy = getAuth?.id;
      json.garageId = getAuth?.garageId;
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
