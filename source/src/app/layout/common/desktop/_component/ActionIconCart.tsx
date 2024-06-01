"use client";
import { ActionIcon, Indicator } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import { useGlobalContext } from "@/app/Context/store";
import { useEffect } from "react";
import { getData } from "@/utils/until/localStorage";
import { storageKeys } from "@/constants";
export default function ActionIconCart() {
  const { cart, setCart } = useGlobalContext();

  useEffect(() => {
    const existingCartData = getData(storageKeys.CART_DATA);

    if (existingCartData) {
      setCart(existingCartData?.length);
    }
  }, []);
  return (
    <Link href={"/gio-hang"}>
      <ActionIcon color="#EEF1F9" size={56}>
        {cart > 0 ? (
          <Indicator zIndex={9} inline label={cart} size={16} color="red">
            <IconShoppingCart size={28} color="#3450E7" />
          </Indicator>
        ) : (
          <IconShoppingCart size={28} color="#3450E7" />
        )}
      </ActionIcon>
    </Link>
  );
}
