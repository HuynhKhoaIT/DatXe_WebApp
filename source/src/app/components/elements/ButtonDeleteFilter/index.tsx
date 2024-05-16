"use client";
import { Button, Checkbox, Radio } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export function ButtonDeleteFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const s = searchParams.get("s");
  let params = new URLSearchParams(searchParams);
  function handleClick() {
    var path = pathname;
    if (s) {
      path += `?s=${s}`;
    }
    router.push(path);
  }

  return (
    <Button
      onClick={() => {
        handleClick();
      }}
      fullWidth
      variant="outline"
      color="gray"
    >
      Xoá bộ lọc
    </Button>
  );
}
