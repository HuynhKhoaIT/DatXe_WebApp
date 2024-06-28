import { callApi } from "@/lib/auth";
import { Fragment } from "react";
import apiConfig from "@/constants/apiConfig";
import TableListPage from "./TableListPage";

export default async function Customers({ searchParams }: any) {
  const customers = await callApi(apiConfig.admin.customer.getList, {
    params: searchParams,
  });
  return (
    <Fragment>
      <TableListPage dataSource={customers} />
    </Fragment>
  );
}
