"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, hasLength } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { IconKey, IconLock, IconPhone } from "@tabler/icons-react";
import styles from "./FormLogin.module.scss";
import useFcmToken from "@/app/hooks/useFCMToken";
export default function FormLogin({ sendOtp, login, checkPhone }: any) {
  const [opened, handlers] = useDisclosure(false);
  const { fcmToken } = useFcmToken();
  const [loginPass, handlersLogin] = useDisclosure(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const form: any = useForm({
    initialValues: {
      phone: "",
    },
    validate: {
      phone: hasLength(
        { min: 10, max: 11 },
        "Vui lòng nhập đúng số điện thoại"
      ),
    },
  });
  const onSubmit = async () => {
    handlers.open();
    try {
      const { phone, password } = form.values;
      const res = await checkPhone({ phone });
      if (res?.data) {
        if (!password) {
          const result = await sendOtp({ phone });
          if (result?.data?.CodeResult == "100") {
            if (callbackUrl) {
              router.push(
                `./dang-nhap/xac-thuc?phone=${phone}&callbackUrl=${callbackUrl}`
              );
            } else {
              router.push(`./dang-nhap/xac-thuc?phone=${phone}`);
            }
            handlers.close();
          } else {
            toast.error("Lỗi tạo OTP, Vui lòng thử lại sau!");
            handlers.close();
          }
        } else {
          try {
            await login({
              phone: phone,
              password: password,
              otp: "",
              tokenFirebase: fcmToken,
            });
            toast.success("Đăng nhập thành công");
            router.push("/");
            handlers.close();
          } catch (error) {
            toast.error("Đăng nhập thất bại");
            handlers.close();
          }
        }
      } else {
        toast.error("Số điện thoại chưa được đăng ký vui lòng đăng ký!");
        handlers.close();

        form.setErrors({ phone: "Số điện thoại chưa được đăng ký!" });
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau!");
      handlers.close();
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          size="md"
          withAsterisk
          style={{ borderBottom: "1px solid #ddd" }}
          variant="unstyled"
          placeholder="Số điện thoại"
          {...form.getInputProps("phone")}
          mb={20}
          leftSection={<IconPhone size={18} />}
        />
        {loginPass && (
          <PasswordInput
            size="md"
            withAsterisk
            style={{ borderBottom: "1px solid #ddd" }}
            variant="unstyled"
            placeholder="Mật khẩu"
            {...form.getInputProps("password")}
            mb={20}
            leftSection={<IconLock size={18} />}
          />
        )}

        <Button
          size="md"
          variant="filled"
          color="var(--theme-color)"
          fullWidth
          type="submit"
          loading={opened}
        >
          Đăng nhập
        </Button>
      </form>
      <div className={styles.otherLoginTitle}>
        <p>Hoặc tiếp tục bằng</p>
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
    </>
  );
}
