import React from "react";
import { FormAccuracy } from "../_component/FormAccuracy";
import LoginPage from "@/app/components/layout/LoginPage";
import { getSession, login } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterAccuracy({ searchParams }: any) {
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
