"use client";
import { Button, PinInput } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useForm, hasLength } from "@mantine/form";
import { CheckOtp, register } from "@/utils/user";
import { useDisclosure } from "@mantine/hooks";
import useFcmToken from "@/app/hooks/useFCMToken";
import { toast } from "react-toastify";
export function FormAccuracy({ login }: any) {
  const [opened, handlers] = useDisclosure(false);
  const { fcmToken } = useFcmToken();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");

  const form = useForm({
    initialValues: {
      name: name || "",
      phone: phone || "",
      pin: "",
    },

    validate: {
      pin: hasLength({ min: 6, max: 6 }, "Mã xác thực phải đủ 6 ký tự"),
    },
  });
  const onSubmit = async () => {
    handlers.open();
    const { name, phone, pin } = form.values;
    try {
      const checkRs = await CheckOtp(phone, pin, "register");
      if (1) {
        try {
          await register({ formData: { name, phone, otp: pin, fcmToken } });
          await login({ name, phone, otp: pin, fcmToken });
          toast.success("Đăng ký thành công");
          handlers.close();
        } catch (error) {
          toast.error("Đăng ký thất bại");
          handlers.close();
        }
      } else {
        toast.error("Xác thực thất bại");

        handlers.close();
      }
    } catch (error) {
      toast.error("Xác thực thất bại");

      handlers.close();
      form.setErrors({ pin: "Mã Otp không hợp lệ!" });
    }
  };
  return (
    <form className="login-accuracy-input" onSubmit={form.onSubmit(onSubmit)}>
      <PinInput
        variant="unstyled"
        type="number"
        placeholder="○"
        length={6}
        size="md"
        radius={0}
        {...form.getInputProps("pin")}
      />
      <Button
        size="md"
        loading={opened}
        className="login-btn"
        variant="filled"
        color="var(--theme-color)"
        type="submit"
        fullWidth
      >
        Xác thực
      </Button>
    </form>
  );
}
