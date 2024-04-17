import { createCustomer } from "@/app/libs/prisma/customer";
import { NextResponse } from "next/server";
import { sha256 } from "js-sha256";
import prisma from "@/app/libs/prismadb";
import { generateUUID } from "@/utils/until";

export async function POST(request: Request) {
    try {
        const json = await request.json();
        json.garageId = (process.env.GARAGE_DEFAULT)?.toString();
        json.cityId = null;
        json.districtId = null;
        json.wardId = null;
        const hash = sha256(`${json.phoneNumber}|@|${(json.fullName)}`);
        if(json.hash == hash){
            // const customer = await createCustomer(json);
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
                    garageId: "2",
                    status: json.status,
                    userId: (json.userId).toString()
                },
                include: {
                    cars: true,
                },
            });
            return new NextResponse(JSON.stringify(customer), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}