import { getProductBySKU } from "@/app/libs/prisma/product";
import { GET_PRODUCTS_DLBD_ENDPOINT } from "./constants/endpoints";

export async function getProductsFromDLBD(session: any, dataInput: any) {
  const urlFetch =
    GET_PRODUCTS_DLBD_ENDPOINT +
    "?garage_id=" +
    session.garageId +
    "&page=" +
    dataInput.page;
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
