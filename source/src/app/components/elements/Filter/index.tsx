"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FillterListGarage from "./_component/FilterGarage";
import FillterListNoGarage from "./_component/FilterList";
export default function FillterList() {
  const searchParams = useSearchParams();
  const garageId = searchParams.get("garageId");

  if (garageId) {
    return <FillterListGarage />;
  } else {
    return <FillterListNoGarage />;
  }
}
