import Breadcrumb from "@/app/components/form/Breadcrumb";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
import { FieldTypes } from "@/constants/masterData";
import { Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { Fragment } from "react";
import TableListPage from "./_component/TableListPage";
import { callApi, getSession } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Bài viết" },
];

export default async function Blogs({ searchParams }: any) {
  const posts = await callApi(apiConfig.admin.posts.getList, {
    params: searchParams,
  });
  const session = await getSession();

  async function handleDelete(formData: FormData) {
    "use server";
    const result = await callApi(apiConfig.admin.posts.delete, {
      pathParams: {
        id: formData,
      },
    });
    return { data: result };
  }

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
      <Breadcrumb breadcrumbs={Breadcrumbs} />
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
                pathname: `/admin/blogs/create`,
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
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={
          <TableListPage dataSource={posts} deleteItem={handleDelete} />
        }
      />
    </Fragment>
  );
}
