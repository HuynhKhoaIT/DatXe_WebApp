import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Fragment } from "react";
import SearchForm from "@/app/components/form/SearchForm";
import { FieldTypes } from "@/constants/masterData";
import { Button, Flex } from "@mantine/core";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import TableListPage from "./TableListPage";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Quản lý khách hàng" },
];

export default async function Customers({ searchParams }: any) {
  const customers = await callApi(apiConfig.admin.customer.getList, {
    params: searchParams,
  });

  async function handleDelete(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.customer.delete, {
      pathParams: { id: formData },
    });
    return res;
  }

  const customersDlbd = await callApi(apiConfig.admin.customer.getListDlbd, {
    params: searchParams,
  });
  const searchData = [
    {
      name: "s",
      placeholder: "Tên",
      type: FieldTypes.STRING,
    },
    {
      name: "phoneNumber",
      placeholder: "Số điện thoại",
      type: FieldTypes.STRING,
    },
  ];
  const initialValuesSearch = {
    s: "",
    phoneNumber: "",
  };

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <SearchForm searchData={searchData} initialValues={initialValuesSearch} />
      <div style={{ marginBottom: 20 }}>
        <Flex justify={"end"} align={"center"} gap={20}>
          <Link
            href={{
              pathname: `/admin/customers/create`,
            }}
          >
            <Button
              size="lg"
              h={{ base: 42, md: 50, lg: 50 }}
              radius={0}
              leftSection={<IconPlus size={18} />}
            >
              Thêm mới
            </Button>
          </Link>
        </Flex>
      </div>
      <TableListPage
        customers={customers}
        customersDlbd={customersDlbd}
        deleteItem={handleDelete}
      />
    </Fragment>
  );
}
