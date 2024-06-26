"use client";
import { Button, PinInput } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useForm, hasLength } from "@mantine/form";
import { CheckOtp, registerGarage } from "@/utils/user";
import { useDisclosure } from "@mantine/hooks";
import useFcmToken from "@/app/hooks/useFCMToken";
import { sendNotificationGarageNew } from "@/utils/notification";
import { toast } from "react-toastify";

export function FormAccuracy({ login }: any) {
  const [opened, handlers] = useDisclosure(false);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const garageName = searchParams.get("garageName");
  const address = searchParams.get("address");
  const { fcmToken } = useFcmToken();
  const form = useForm({
    initialValues: {
      name: name || "",
      phone: phone || "",
      address: address || "",
      garageName: garageName || "",
      pin: "",
    },

    validate: {
      pin: hasLength({ min: 6, max: 6 }, "Mã xác thực phải đủ 6 ký tự"),
    },
  });
  const onSubmit = async () => {
    handlers.open();
    const { name, phone, garageName, address, pin } = form.values;

    try {
      const checkRs = await CheckOtp(phone, pin, "register");
      if (checkRs.CodeResult == 100) {
        toast.success("Xác thực thành công");
        try {
          const garage = await registerGarage(
            name,
            phone,
            pin,
            address,
            garageName,
            fcmToken
          );

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
        size="lg"
        radius={0}
        {...form.getInputProps("pin")}
      />
      <Button
        size="lg"
        radius={0}
        loading={opened}
        className="login-btn"
        variant="filled"
        color="var(--theme-color)"
        type="submit"
        fullWidth
      >
        Đăng ký
      </Button>
    </form>
  );
}
