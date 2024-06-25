/**
 * External Dependencies.
 */
import axios from "axios";
/**
 * Internal Dependencies.
 */
import {
  GET_MY_ACCOUNT_ENDPOINT,
  POST_LOGIN_ENDPOINT,
  POST_REGISTER_ENDPOINT,
  CHECK_PHONE_NUMBER,
  CHECK_OTP,
  GET_PROFILE_ENDPOINT,
  POST_GARAGE_REGISTER_ENDPOINT,
} from "./constants/endpoints";

import { IUser } from "@/interfaces/user";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sha256 } from "js-sha256";
import { sendNotificationGarageNew } from "./notification";
import prisma from "@/app/libs/prismadb";
// import ForgotPassword from '@/app/forgot-password/page';
/**
 * Get getMyAccount.
 *
 * @return {Promise<void>}
 */

export async function getUserByValidSessionToken(token: string) {
  const res = await fetch(GET_PROFILE_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const data = await res.json();
  return {
    username: data.name,
  };
}

export const getMyAccount = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.token) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${session.user.token}` },
      };
      const res = await axios.get(`${GET_PROFILE_ENDPOINT}`, config);
      return res.data.data as Promise<IUser>;
    } catch (error) {
      console.log(error);
      throw new Error("Lỗi lấy thông tin my-account");
    }
  }
};

export const registerGarage = async (
  name: string,
  phone: string,
  pin: string,
  address: string,
  garageName: string,
  fcmToken: string
): Promise<void> => {
  try {
    const res = await axios.post(
      `${POST_GARAGE_REGISTER_ENDPOINT}`,
      {
        name: name,
        phone: phone,
        address: address,
        garageName: garageName,
        otp: pin,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const garageNew = await fetch("/api/admin/garage", {
      method: "POST",
      body: JSON.stringify({
        routeId: Number(res.data.garageId),
        name: garageName,
        shortName: garageName,
        logo: "",
        email: `${phone}@datxe.com`,
        phoneNumber: phone,
        website: "",
        address: address,
        status: "PENDING",
        description: "",
      }),
    });

    const garageData = await garageNew.json();

    const userNew = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify({
        id: res.data.id.toString(),
        email: res.data.email,
        phoneNumber: res.data.phone,
        name: res.data.name,
        hash: sha256(`${res.data.phone}|@|${Number(res.data.id)}`),
        garageId: garageData.id ?? "2",
        role: "ADMINGARAGE",
      }),
    });
    await sendNotificationGarageNew(garageData);
    signIn("credentials", {
      phone: phone,
      otp: pin,
      tokenFirebase: fcmToken,
      callbackUrl: "/admin",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Đăng Ký thất bại");
  }
};

export const GenOTP = async (phone: string) => {
  try {
    const res = await axios.post(
      `/api/sms/send-otp`,
      {
        phone: phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("GEN OTP thất bại");
  }
};

export const CheckPhone = async (phone: string) => {
  try {
    const res = await axios.get(`${CHECK_PHONE_NUMBER}/${phone}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      // const data = res;
      return res.data;
    } else {
      console.log("Login failed");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Đăng nhập thất bại");
  }
};
export const CheckOtp = async (phone: string, otp: string, action: string) => {
  try {
    const res = await axios.post(
      `/api/sms/check-otp`,
      {
        phone: phone,
        code: otp,
        action: action,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      // const data = res;
      return res.data;
    } else {
      console.log("Check OTP failed");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Check OTP thất bại");
  }
};
export const updateAccount = async (profileData: any, token: string) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      profileData.name = profileData.fullName;
      const res = await axios.put(
        `${GET_PROFILE_ENDPOINT}`,
        profileData,
        config
      );
      return res.data.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình cập nhật profiles");
  }
};
