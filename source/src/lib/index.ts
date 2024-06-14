import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendRequest } from "@/services/api";

async function getData() {
  const session = await getServerSession(authOptions);
  const requestData = {
    session: session,
  };
  return requestData;
}

async function callApi(options: any, payload: any) {
  let { session }: any = await getData();
  let token;
  if (session) {
    token = session?.user?.token;
  }

  try {
    const item: any = await sendRequest(options, payload, token);
    return item.data;
  } catch (error) {
    console.log(error);
    return;
  }
}
export { callApi };
