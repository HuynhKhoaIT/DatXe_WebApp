"use client";
import BasicModal from "../../common/BasicModal";
import React, { useEffect, useState } from "react";
import { Box, Avatar, Grid, Input, Button, PinInput } from "@mantine/core";
import Link from "next/link";
import { useForm, hasLength, matches } from "@mantine/form";
import { CheckOtp, CheckPhone, login, register } from "@/utils/user";
import { addCustomerCareGuest } from "@/utils/customerCare";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
export function ModalOrderGuest({
  opened,
  close,
  phone,
  router,
  dataDetail,
  onClose,
  addItem,
}: any) {
  const [countdown, setCountdown] = useState<number>(59);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      pin: "",
    },

    validate: {
      pin: hasLength({ min: 6, max: 6 }, "Mã xác thực phải đủ 6 ký tự"),
    },
  });
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);
  const onLogin = async () => {
    const { pin } = form.values;
    let password = phone + "@@Datxe.com@@";

    try {
      setLoading(true);
      const checkRs = await CheckOtp(phone, pin, "login");
      if (checkRs.CodeResult == "100") {
        addItem(dataDetail);
        try {
          signIn("credentials", {
            phone: phone,
            password: password,
            callbackUrl: "/dashboard",
          });
          toast.success("Đặt lịch thành công");

          router.push("/dashboard");
          onClose();
          setLoading(false);
        } catch (error) {
          console.error("Error creating customer care:", error);
          toast.error("Đặt lịch thất bại");

          setLoading(false);
        }
      } else {
        toast.error("Xác thực thất bại");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Xác thực thất bại");

      setLoading(false);
    }
  };
  return (
    <BasicModal
      size={500}
      isOpen={opened}
      onCloseModal={close}
      footer={false}
      title="Đăng nhập"
      trapFocus={false}
      style={{ position: "relative" }}
    >
      <div>
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
          <h3>Nhập mã xác minh</h3>
          <p>
            Bạn vui lòng nhập mã gồm 6 chữ số vừa được gửi đến{" "}
            <span style={{ color: "var(--theme-color" }}> {phone}</span>
          </p>
        </div>

        <form
          className="login-accuracy-input"
          onSubmit={form.onSubmit(onLogin)}
        >
          <PinInput
            variant="unstyled"
            placeholder="○"
            length={6}
            size="md"
            radius={0}
            {...form.getInputProps("pin")}
          />
          <Button
            size="md"
            radius={0}
            loading={loading}
            className="login-btn"
            type="submit"
            variant="filled"
            color="var(--theme-color)"
            fullWidth
          >
            Đăng nhập
          </Button>
        </form>
        <div className="other-accuracy">
          <p className="other-accuracy__time">
            Gửi lại mã sau {countdown}s{" "}
            {countdown == 0 && (
              <div onClick={() => setCountdown(59)}>Gửi lại</div>
            )}
          </p>
          <p className="other-accuracy__title">
            Mã xác minh có hiệu lực trong vòng 15 phút
          </p>
        </div>
      </div>
    </BasicModal>
  );
}
