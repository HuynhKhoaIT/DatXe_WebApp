"use client";
import { Button, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { useForm, hasLength, isNotEmpty } from "@mantine/form";
import { CheckPhone, GenOTP } from "@/utils/user";
import { useDisclosure } from "@mantine/hooks";
export function FormRegisterGara() {
  const [opened, handlers] = useDisclosure(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      garageName: "",
    },

    validate: {
      name: isNotEmpty("Vui lòng nhập tên của bạn"),
      phone: (value) =>
        /^0[1-9][0-9]{8}$/.test(value) ? null : "Số điện thoại sai định dạng",
    },
  });
  const onSubmit = async () => {
    handlers.open();
    const { name, phone, address, garageName } = form.values;
    const res = await CheckPhone(phone);
    if (!res) {
      const genRs = await GenOTP(phone);
      if (genRs.CodeResult == 100) {
        router.push(
          `./dang-ky-chuyen-gia/xac-thuc?name=${name}&phone=${phone}&address=${address}&garageName=${garageName}`
        );
      } else {
        notifications.show({
          title: "Error",
          message: "Hệ thống gửi OTP thất bại, vui lòng thử lại sau!",
        });
      }
      handlers.close();
    } else {
      notifications.show({
        title: "Error",
        message: "Số điện thoại đã được đăng ký!",
      });
      handlers.close();
      form.setErrors({ phone: "Số điện thoại đã được đăng ký!" });
    }
  };
  return (
    <form className="login-form-input" onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        size="md"
        withAsterisk
        style={{ borderBottom: "1px solid #ddd" }}
        variant="unstyled"
        placeholder="Họ và tên"
        // onChange={(e) => setfullName(e.target.value)}
        {...form.getInputProps("name")}
      />
      <br></br>
      <TextInput
        size="md"
        withAsterisk
        style={{ borderBottom: "1px solid #ddd" }}
        variant="unstyled"
        placeholder="Số điện thoại"
        {...form.getInputProps("phone")}
      />
      <br></br>
      <TextInput
        size="md"
        withAsterisk
        style={{ borderBottom: "1px solid #ddd" }}
        variant="unstyled"
        placeholder="Tên chuyên gia"
        {...form.getInputProps("garageName")}
      />
      <br></br>
      <TextInput
        size="md"
        withAsterisk
        style={{ borderBottom: "1px solid #ddd" }}
        variant="unstyled"
        placeholder="Địa chỉ chuyên gia"
        {...form.getInputProps("address")}
      />
      <Button
        size="md"
        className="login-btn"
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
