import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import {
  editMarketingCampaign,
  findMarketingCampaign,
} from "@/app/libs/prisma/marketingCampaign";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return new NextResponse("Missing 'id' parameter");
    }
    const marketingCampaign = await findMarketingCampaign(id);
    return NextResponse.json(marketingCampaign);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return new NextResponse("Missing 'id' parameter");
    }
    const json = await request.json();

    const updatedPost = await editMarketingCampaign(id, json);

    return new NextResponse(JSON.stringify(updatedPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return new NextResponse("Missing 'id' parameter");
  }

  const deletePost = await prisma.marketingCampaign.update({
    where: {
      id: id.toString(),
    },
    data: {
      status: "DELETE",
    },
  });

  return NextResponse.json({ success: 1, message: "Delete success" });
}
