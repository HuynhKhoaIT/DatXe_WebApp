"use server";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib/auth";
import axios from "axios";

export async function getOrders(searchParams: any, page: number) {
  try {
    const res = await axios.get(`/api/orders?${searchParams}&page=${page}`);
    return res.data;
  } catch (error) {
    console.error("error:", error);
  }
}

export async function getOptionsCar({ s }: any) {
  try {
    const res = await callApi(apiConfig.admin.car.autoComplete, {
      params: {
        s,
      },
    });
    if (!res.data) {
      throw new Error("Failed to fetch data");
    }
    console.log("dataOption", res);
    const dataOption = res?.data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.numberPlates,
      otherData: item,
    }));
    return dataOption;
  } catch (error) {
    console.error("error: ", error);
  }
}

export async function deleteOrder(id: string) {
  try {
    const res = await axios.delete(`/api/orders/${id}`);
    return res?.data;
  } catch (error) {
    console.error("error:", error);
  }
}

export async function getOptionsPhone({ s }: any) {
  try {
    const res = await callApi(apiConfig.admin.customer.autoComplete, {
      params: { s },
    });

    console.log("autocompleteS", res);
    // const res = await axios.get(`/api/admin/customer/autocomplete?s=${s}`);
    if (!res) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = res?.map((item: any) => ({
      value: item.id.toString(),
      label: item.phoneNumber,
      otherData: item,
    }));
    return dataOption;
  } catch (error) {
    console.error("error: ", error);
  }
}

export async function getOptionsCustomer({ s }: any) {
  try {
    const res = await callApi(apiConfig.admin.customer.autoComplete, {
      params: { s },
    });
    if (!res) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = res?.map((item: any) => ({
      value: item.id.toString(),
      label: item.phoneNumber + "-" + item.fullName,
      otherData: item,
    }));
    return dataOption;
  } catch (error) {
    console.error("error: ", error);
  }
}
