"use client";
import { Button, TextInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, hasLength } from "@mantine/form";
import { CheckPhone, GenOTP } from "@/utils/user";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { IconPhone } from "@tabler/icons-react";
export default function FormLogin() {
  const [opened, handlers] = useDisclosure(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const form = useForm({
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
      const { phone } = form.values;
      const res = await CheckPhone(phone);

      if (res) {
        const genRs = await GenOTP(phone);

        if (genRs.CodeResult == "100") {
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
