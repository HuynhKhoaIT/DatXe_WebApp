import { deleteFirebaseTokenByUserIdAndToken } from "@/app/libs/prisma/firebaseToken";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const json = await request.json();
  return NextResponse.json(json);
  const session = await getSession();
  if (session) {
    let userId = session?.user?.id ?? "";
    const notiRs = await deleteFirebaseTokenByUserIdAndToken(
      userId?.toString(),
      json.token
    );
    return NextResponse.json(notiRs);
  }
  return NextResponse.json({});
}
