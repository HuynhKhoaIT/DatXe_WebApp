"use server";
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
import { sha256 } from "js-sha256";
import { sendNotificationGarageNew } from "./notification";
import prisma from "@/app/libs/prismadb";
import { getSession } from "@/lib/auth";
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
  const session = await getSession();
  if (session?.user) {
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

export const login = async (phone: string, password: string): Promise<void> => {
  try {
    const res = await axios.post(
      `${POST_LOGIN_ENDPOINT}`,
      {
        phone: phone,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      // Login was successful
      const data = res.data;
      localStorage.setItem("token", data.token);
    } else {
      // Login failed
    }
  } catch (error) {
    console.error(error);
    throw new Error("Đăng nhập thất bại");
  }
};

export const register = async ({ formData }: any): Promise<void> => {
  try {
    const res = await axios.post(
      `${POST_REGISTER_ENDPOINT}`,
      {
        name: formData?.name,
        phone: formData?.phone,
        otp: formData?.otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const userNew = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify({
        id: res.data.user.id.toString(),
        email: res.data.user.email,
        phoneNumber: res.data.user.phone,
        name: res.data.user.name,
        hash: sha256(`${res.data.user.phone}|@|${Number(res.data.user.id)}`),
        garageId: "2",
        role: "CUSTOMER",
      }),
    });
    const customerNew = await fetch("/api/client/customer", {
      method: "POST",
      body: JSON.stringify({
        userId: res.data.user.id.toString(),
        fullName: res.data.user.name,
        phoneNumber: res.data.user.phone,
        hash: sha256(`${res.data.user.phone}|@|${res.data.user.name}`),
        garageId: "2",
      }),
    });
    // signIn("credentials", {
    //   phone: phone,
    //   otp: pin,
    //   tokenFirebase: fcmToken,
    //   callbackUrl: `/dashboard`,
    // });
  } catch (error) {
    console.error(error);
    throw new Error("Đăng Ký thất bại");
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
