import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getCarModelById } from "@/app/libs/prisma/carModel";
import { checkAuthToken } from "@/utils/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return new NextResponse("Missing 'id' parameter");
    }
    const getAuth = await checkAuthToken(request);
    if (getAuth != null) {
      const cars = await prisma.car.findFirst({
        where: {
          id: id,
        },
        include: {
          customer: true,
          carStyle: true,
        },
      });
      let carRs = JSON.parse(JSON.stringify(cars));
      if (carRs.carBrandId) {
        let br = await getCarModelById(carRs.carBrandId);
        carRs.brandName = br;
      }
      if (carRs.carNameId) {
        let md = await getCarModelById(carRs.carNameId);
        carRs.modelName = md;
      }
      if (carRs.carYearId) {
        let y = await getCarModelById(carRs.carYearId);
        carRs.yearName = y;
      }
      return NextResponse.json(carRs);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth != null) {
      const id = params.id;
      if (!id) {
        return new NextResponse("Missing 'id' parameter");
      }
      const json = await request.json();
      let updateData = {
        customerId: json.customerId,
        numberPlates: json.numberPlates,
        carBrandId: json.carBrandId,
        carNameId: json.carNameId,
        carYearId: json.carYearId,
        carStyleId: json.carStyleId,
        color: json.color,
        vinNumber: json.vinNumber,
        machineNumber: json.machineNumber,
        description: json.description,
        status: json.status,
        garageId: "2",
      };
      const updatedCar = await prisma.car.update({
        where: {
          id: id,
        },
        data: updateData,
        include: {
          customer: true,
        },
      });

      return new NextResponse(JSON.stringify(updatedCar), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  if (!id) {
    return new NextResponse("Missing 'id' parameter");
  }

  const rs = await prisma.car.update({
    where: {
      id: id.toString(),
    },
    data: {
      status: "DELETE",
    },
  });

  return NextResponse.json({ success: 1, message: "Delete success" });
}
