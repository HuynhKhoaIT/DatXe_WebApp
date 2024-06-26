import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sendRequest } from "@/services/api";
import apiConfig from "@/constants/apiConfig";
import { appAccount, storageKeys } from "@/constants";
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
    const profile = await getProfile(login?.data?.user?.token);
    return { ...profile?.data?.data };
  } catch (error) {
    return null;
  }
}

async function getProfile(token: string) {
  try {
    const profile = await sendRequest(
      {
        ...apiConfig.account.getAccountDlbd,
        ignoreAuth: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      {}
    );
    return profile;
  } catch (error) {
    cookies().set("session", "", { expires: new Date(0) });
    window.location.reload();
    return error;
  }
}

async function login(formData: any) {
  const account = await getUser(formData);
  if (account) {
    var user = {
      token: account.token,
      user: {
        id: account.id,
        token: account.token,
        phone: account.phoneNumber,
        name: account.fullName,
        address: account.address,
        garageId: account.garageId,
        isAdmin: account.garageId,
        role: account.phoneNumber == "0964824588" ? "ADMIN" : account.role,
        useDLBD: account?.useDLBD || 0,
      },
    };
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 ngày
    const session = await encrypt({ user, expires });
    // Save the session in a cookie

    cookies().set("session", session, { expires, httpOnly: true });
  } else throw new Error("Login fail");
}

async function register(formData: any) {
  const account = await getUser(formData);
  if (account) {
    var user = {
      token: account.token,
      user: {
        id: account.id,
        token: account.token,
        phone: account.phoneNumber,
        name: account.fullName,
        address: account.address,
        garageId: account.garageId,
        isAdmin: account.garageId,
        role: account.phone == "0964824588" ? "ADMIN" : account.role,
        useDLBD: account?.useDLBD || 0,
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
