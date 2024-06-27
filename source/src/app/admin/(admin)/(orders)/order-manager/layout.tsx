import { Fragment, ReactNode } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import { getSession } from "@/lib/auth";
import {
  FieldTypes,
  statusOptions,
  stepOrderOptions,
} from "@/constants/masterData";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Button, Flex } from "@mantine/core";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import FilterTable from "@/app/components/common/FilterTable";
import { getOptionsCar } from "./until";
interface IProps {
  children: ReactNode;
}
const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Quản lý đơn hàng" },
];
export default async function Layout({ children }: IProps) {
  const session = await getSession();
  const searchData = [
    {
      name: "carId",
      placeholder: "Biển số xe",
      type: FieldTypes?.AUTOCOMPLETE,
      getOptionsData: getOptionsCar,
      isCamera: true,
    },
  ];

  const initialValuesSearch = {
    carId: null,
  };
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <ListPage
        searchForm={
          <SearchForm
            searchData={searchData}
            brandFilter={false}
            initialValues={initialValuesSearch}
          />
        }
        actionBar={
          <Flex justify={"end"} align={"center"}>
            <Link
              href={{
                pathname: `/admin/order-detail/create`,
              }}
            >
              <Button
                size="lg"
                h={{ base: 42, md: 50, lg: 50 }}
                radius={0}
                leftSection={<IconPlus size={18} />}
              >
                Tạo đơn
              </Button>
            </Link>
          </Flex>
        }
        filterCategory={
          <FilterTable stepOptions={stepOrderOptions} keyQuery="step" />
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={<>{children}</>}
      />
    </Fragment>
  );
}
