import { NextRequest, NextResponse } from "next/server";
import { GET_PROFILE_ENDPOINT } from "./constants/endpoints";
import axios from "axios";
import { IUser } from "@/types/next-auth";
import prisma from "@/app/libs/prismadb";

export async function checkAuthToken(request: NextRequest) {
  const BearerToken = request.headers.get("authorization") as string;

  if (!BearerToken) {
    return;
  }
  const token = BearerToken?.split(" ")[1];
  console.log("token", token);

  const user = await getUser(token);
  return user;
}

async function getUser(token: string) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${GET_PROFILE_ENDPOINT}`, config);
  const us = res.data.data as Promise<IUser>;
  if (await us) {
    return await prisma.user.findFirst(res.data.data.id);
  }
  return;
}
