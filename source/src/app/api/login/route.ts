import { findUser } from "@/app/libs/prisma/user";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const json = await request.json();
    const res = await fetch('https://v2.dlbd.vn/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone: json?.phone,
            password: json?.password,
        }),
    });
    const userRs = await res.json();

    if (userRs.user.id) {
        const user = await findUser(userRs.user.id.toString())
        userRs.data = user
        delete userRs.user
        delete userRs.garageId
    }
    return NextResponse.json(userRs);
}