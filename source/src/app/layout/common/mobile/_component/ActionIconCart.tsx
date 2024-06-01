"use client";
import { ActionIcon, Indicator } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import { useGlobalContext } from "@/app/Context/store";
import { useEffect } from "react";
import { getData } from "@/utils/until/localStorage";
import { storageKeys } from "@/constants";
export default function ActionIconCartMobile() {
  const { cart, setCart } = useGlobalContext();

  useEffect(() => {
    const parsedCartData = getData(storageKeys.CART_DATA);

    console.log();
    if (parsedCartData) {
      setCart(parsedCartData?.length);
    }
  }, []);
  return (
    <Link href={"/gio-hang"}>
      {cart > 0 ? (
        <Indicator zIndex={9} inline label={cart} size={16} color="red">
          <IconShoppingCart size={24} color={"var(--title-color)"} />
        </Indicator>
      ) : (
        <IconShoppingCart size={24} color={"var(--title-color)"} />
      )}
    </Link>
  );
}
