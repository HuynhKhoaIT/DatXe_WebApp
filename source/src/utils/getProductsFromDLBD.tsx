import { getProductBySKU } from "@/app/libs/prisma/product";
import { GET_PRODUCTS_DLBD_ENDPOINT } from "./constants/endpoints";
import { showGarage } from "@/app/libs/prisma/garage";

export async function getProductsFromDLBD(session: any, dataInput: any) {
  const garage = await showGarage(session.garageId);
  const urlFetch = GET_PRODUCTS_DLBD_ENDPOINT + '?garage_id=' + garage?.routeId + '&page=' + dataInput.page;
  const res = await fetch(urlFetch, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.token,
    },
  });

  const data = await res.json();
  for (const i of data.data) {
    const p = await getProductBySKU(i.productCode, dataInput.garageId);
    i.isAsync = p ? 1 : 0;
  }
  return data;
}
