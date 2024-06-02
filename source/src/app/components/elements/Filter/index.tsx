"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FillterListNoLocation from "./_component/FilterGarage";
import FillterList from "./_component/FilterList";
export default function FillterCompoent({ isFilterLocation }: any) {
  const searchParams = useSearchParams();
  const garageId = searchParams.get("garageId");

  if (garageId) {
    return <FillterListNoLocation />;
  } else {
    return <FillterList isFilterLocation={isFilterLocation} />;
  }
}
