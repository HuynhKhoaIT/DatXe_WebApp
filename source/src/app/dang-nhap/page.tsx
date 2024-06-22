import React from "react";
import { redirect } from "next/navigation";
import FormLogin from "./_component/FormLogin";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import apiConfig from "@/constants/apiConfig";
import { callApi, login } from "@/lib/auth";
import LoginPage from "../components/layout/LoginPage";
export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    redirect("/dashboard");
  }
  async function sendOtp(formData: any) {
    "use server";
    const data = await callApi(apiConfig.user.GenOTP, {
      data: formData,
    });
    return {
      data: data,
    };
  }
  async function handleLogin(formData: any) {
    "use server";
    await login(formData);
  }
  async function checkPhone(formData: any) {
    "use server";
    const res = await callApi(apiConfig.user.CheckPhone, {
      pathParams: formData,
    });
    return {
      data: res,
    };
  }
  return (
    <LoginPage
      title="DatXe - Ứng dụng đặt lịch ô tô"
      subTitle="Xin chào,"
      isLogin={true}
      description="Đăng nhập hoặc tạo tài khoản"
      form={
        <FormLogin
          sendOtp={sendOtp}
          login={handleLogin}
          checkPhone={checkPhone}
        />
      }
    />
  );
}
