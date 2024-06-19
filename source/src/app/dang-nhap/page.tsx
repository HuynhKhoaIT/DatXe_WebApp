"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { redirect } from "next/navigation";
import styles from "./index.module.scss";
import { Avatar, Button } from "@mantine/core";
import Link from "next/link";
import FormLogin from "./_component/FormLogin";
import { IconKey } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import FormLoginPassword from "./_component/FormLoginPassword";
export default function Login() {
  const [loginPass, handlersLogin] = useDisclosure(false);

  const { data: session } = useSession();
  if (session && session.user) {
    redirect("/dashboard");
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className="d-flex justify-content-center flex-column align-items-center ">
          <Avatar
            src="https://datxe.com/wp-content/uploads/2021/08/cropped-logo-DatXE-App-vuong-1.jpg"
            alt="it's me"
            radius={"50%"}
            size={"100px"}
          />
          <p className="login-title-1">DatXe - Ứng dụng đặt lịch ô tô</p>
        </div>
        <div className="login-title-2">
          <h2>Xin chào,</h2>
          <p>Đăng nhập hoặc tạo tài khoản</p>
        </div>

        {loginPass ? <FormLoginPassword /> : <FormLogin />}
        <div className="other-login">
          <p className="other-login__title">Hoặc tiếp tục bằng</p>
          <div className="other-login__btn ">
            <Button
              variant="outline"
              color="gray"
              style={{ marginRight: "5px" }}
              w={60}
              onClick={() => handlersLogin.toggle()}
            >
              <IconKey />
            </Button>
          </div>
          <div className="login-footer">
            <p>
              Bạn không có tài khoản?{" "}
              <Link href="dang-ky" style={{ color: "blue" }}>
                Đăng Ký
              </Link>
            </p>
          </div>
          {/* <p>
            Bằng việc tiếp tục, bạn đã chấp nhận{" "}
            <a href="/" style={{ color: "blue" }}>
              {" "}
              Điều khoản sử dụng
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
}
