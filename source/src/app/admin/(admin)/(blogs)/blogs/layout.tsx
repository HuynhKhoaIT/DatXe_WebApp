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
import ActionBar from "@/app/components/common/ActionBar";
interface IProps {
  children: ReactNode;
}

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Bài viết" },
];
export default async function Layout({ children }: IProps) {
  const session = await getSession();
  const searchData = [
    {
      name: "s",
      placeholder: "Tên bài viết",
      type: FieldTypes.STRING,
    },
  ];
  const initialValuesSearch = {
    s: "",
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
        actionBar={<ActionBar linkTo="/admin/blog/create" />}
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={<>{children}</>}
      />
    </Fragment>
  );
}
