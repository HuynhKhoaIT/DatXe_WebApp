import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getSession();
  return Response.json(session);
}
