import { createGarage, getGarageByDlbdId } from "@/app/libs/prisma/garage";
import { findUser, registerUser } from "@/app/libs/prisma/user";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const json = await request.json();
        return prisma.$transaction(async (tx) => {
            const user = await findUser(json.id.toString());
            if(!user){
                // create garage
                const garage = await fetch("https://v2.dlbd.vn/api/v3/app/garages/"+json.garage_id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${json.token}`,
                    },
                });
                const garageRS = await garage.json();
                let garageId = '';
                const issetGarage = await getGarageByDlbdId(json.garage_id);
                
                if(!issetGarage){
                    const garageNew:any = await createGarage({
                        "routeId": json.garage_id,
                        "shortName": garageRS.data.name,
                        "name": garageRS.data.name,
                        "logo": garageRS.data.logo,
                        "phoneNumber": garageRS.data.phoneNumber,
                        "address": garageRS.data.address,
                    });
                    garageId = garageNew.id;
                }else{
                    garageId = issetGarage.id
                }
                const userNew = await registerUser({
                    "id": json.id.toString(),
                    "fullName": json.name,
                    "email": json.email,
                    "phoneNumber": json.phone,
                    "garageId": garageId,
                    "role": json.role ?? 'CUSTOMER'
                });
                console.log('userNew',userNew)
                return garage;
            }
            return user;
        })
    } catch (error: any) {
        console.log(error)
        return new NextResponse(error.message, { status: 500 });
    }
}
