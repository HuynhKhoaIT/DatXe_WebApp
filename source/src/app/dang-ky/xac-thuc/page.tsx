import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FormAccuracy } from "../_component/FormAccuracy";
import { callApi, getSession, login } from "@/lib/auth";
import LoginPage from "@/app/components/layout/LoginPage";

export default async function LoginAccuracy({ searchParams }: any) {
  const session = await getSession();
  if (session && session.user) {
    redirect("/dashboard");
  }
  const phone = searchParams.phone;
  async function handleLogin(formData: any) {
    "use server";
    await login(formData);
  }

  return (
    <LoginPage
      title="DatXe - Ứng dụng đặt lịch ô tô"
      subTitle="Nhập mã xác minh"
      isVerify={true}
      description={
        <span>
          Bạn vui lòng nhập mã gồm 6 chữ số vừa được gửi đến{" "}
          <span style={{ color: "var(--theme-color" }}> {phone}</span>
        </span>
      }
      form={<FormAccuracy login={handleLogin} />}
    />
  );
}
