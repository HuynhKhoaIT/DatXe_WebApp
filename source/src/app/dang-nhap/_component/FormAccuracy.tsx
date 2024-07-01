"use client";
import { Button, PinInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, hasLength } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import useFcmToken from "@/app/hooks/useFCMToken";
import { toast } from "react-toastify";
export function FormAccuracy({ login }: any) {
  const router = useRouter();
  const [opened, handlers] = useDisclosure(false);
  const { fcmToken } = useFcmToken();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const phone = searchParams.get("phone");
  const form = useForm({
    initialValues: {
      phone: phone || "",
      pin: "",
    },

    validate: {
      pin: hasLength({ min: 6, max: 6 }, "Mã xác thực phải đủ 6 ký tự"),
    },
  });

  const onLogin = async () => {
    const { phone, pin } = form.values;
    try {
      await login({
        phone: phone,
        otp: pin.toString(),
        tokenFirebase: fcmToken,
      });
      toast.success("Đăng nhập thành công");
      router.push("/");
      handlers.close();
    } catch (error) {
      toast.error("Đăng nhập thất bại");
      handlers.close();
    }
  };
  return (
    <form className="login-accuracy-input" onSubmit={form.onSubmit(onLogin)}>
      <PinInput
        placeholder="○"
        variant="unstyled"
        type="number"
        size="md"
        length={6}
        {...form.getInputProps("pin")}
        mb={20}
      />
      <Button
        size="md"
        loading={opened}
        className="login-btn"
        type="submit"
        variant="filled"
        color="var(--theme-color)"
        fullWidth
      >
        Xác thực
      </Button>
    </form>
  );
}
