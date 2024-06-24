import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sendRequest } from "@/services/api";
import apiConfig from "@/constants/apiConfig";
import { appAccount } from "@/constants";
import { Buffer } from "buffer";
import { access } from "fs";
var secretKey = "secret";
var key = new TextEncoder().encode(secretKey);

async function encrypt(payload: any) {
  const { user, expires } = payload;
  return await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(key);
}
async function decrypt(input: any) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

async function getUser(credentials: any) {
  console.log("credentials", credentials);
  const base64Credentials = Buffer.from(
    `${appAccount.APP_USERNAME}:${appAccount.APP_PASSWORD}`
  ).toString("base64");
  try {
    const login = await sendRequest(
      {
        ...apiConfig.account.login,
        headers: {
          ...apiConfig.account.login.headers,
          authorization: `Basic ${base64Credentials}`,
        },
        ignoreAuth: true,
      },
      {
        data: credentials,
      }
    );

    // const profile = await sendRequest(
    //   {
    //     ...apiConfig.account.getProfile,
    //     ignoreAuth: true,
    //     headers: {
    //       Authorization: `Bearer ${login?.data.access_token}`,
    //     },
    //   },
    //   {}
    // );
    return { ...login?.data };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function login(formData: any) {
  // Verify credentials && get the user

  // const user = { email: formData.get("email"), name: "John" };
  const account = await getUser(formData);

  if (account) {
    console.log("account", account);
    // Create the session

    var user = {
      token: account.user.token,
      user: {
        id: account.user.id,
        token: account.user.token,
        phone: account.user.phone,
        name: account.user.name,
        address: account.user.address,
        garageId: account.user.garageId,
        isAdmin: account.user.garageId,
        role: account.user.phone == "0964824588" ? "ADMIN" : account.user.role,
        useDLBD: account.user.useDLBD ?? 0,
      },
    };
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 ngày
    const session = await encrypt({ user, expires });
    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
  } else throw new Error("Login fail");
}

async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  const decryptedSession = decrypt(session);
  const res = await decrypt(session);

  return res;
}

async function updateSession(request: any) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 ngày
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

async function callApi(options: any, payload: any) {
  const session = cookies().get("session")?.value;
  let token;
  if (session) {
    const { user }: any = await decrypt(session);
    token = user?.token;
  }
  try {
    const item: any = await sendRequest(options, payload, token);
    return item.data;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function callApiNotToken(options: any, payload: any) {
  let token;
  try {
    const item: any = await sendRequest(options, payload, token);
    return item.data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export {
  encrypt,
  decrypt,
  login,
  logout,
  getSession,
  updateSession,
  callApi,
  callApiNotToken,
};
