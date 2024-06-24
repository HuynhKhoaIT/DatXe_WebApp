import { FormRegister } from "./_component/FormRegister";
import LoginPage from "../components/layout/LoginPage";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

export default async function Register() {
  async function sendOtp(formData: any) {
    "use server";
    const data = await callApi(apiConfig.user.GenOTP, {
      data: formData,
    });
    return {
      data: data,
    };
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
      description="Đăng ký tài khoản"
      form={<FormRegister sendOtp={sendOtp} checkPhone={checkPhone} />}
      isRegister={true}
    />
  );
}
