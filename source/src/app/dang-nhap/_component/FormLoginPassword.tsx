"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, hasLength } from "@mantine/form";
import { CheckPhone, GenOTP } from "@/utils/user";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { signIn } from "next-auth/react";
import useFcmToken from "@/app/hooks/useFCMToken";
export default function FormLoginPassword() {
  const { fcmToken } = useFcmToken();
  const [opened, handlers] = useDisclosure(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const error = searchParams.get("error");

  const form = useForm({
    initialValues: {
      phone: "",
      password: "",
    },

    validate: {
      phone: hasLength(
        { min: 10, max: 11 },
        "Vui lòng nhập đúng số điện thoại"
      ),
    },
  });
  const handleSubmit = async (values: any) => {
    handlers.open();
    try {
      console.log("----1");
      Object.assign(values, { tokenFirebase: "value3" });
      console.log(values);
      const res = await fetch("https://v2.dlbd.vn/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
        }),
      });
      const user = await res.json();
      if (user?.success) {
        const resA = await fetch("/api/admin/init-garage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user.user),
        });

        signIn("credentials", {
          ...values,
          tokenFirebase: fcmToken,
          callbackUrl: callbackUrl || "/dashboard",
        });
        notifications.show({
          title: "Thành công",
          message: "Đăng nhập thành công",
        });
      } else {
        notifications.show({
          title: "Error",
          message: "Đăng nhập thật bại",
        });
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau!",
      });
    } finally {
      handlers.close();
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {" "}
      <TextInput
        size="md"
        withAsterisk
        style={{ borderBottom: "1px solid #ddd" }}
        variant="unstyled"
        placeholder="Số điện thoại"
        {...form.getInputProps("phone")}
        mb={20}
      />
      <PasswordInput
        size="md"
        withAsterisk
        style={{ borderBottom: "1px solid #ddd" }}
        variant="unstyled"
        placeholder="Mật khẩu"
        {...form.getInputProps("password")}
        mb={20}
      />
      <Button
        size="md"
        variant="filled"
        color="var(--theme-color)"
        fullWidth
        type="submit"
        loading={opened}
      >
        Tiếp tục
      </Button>
    </form>
  );
}
