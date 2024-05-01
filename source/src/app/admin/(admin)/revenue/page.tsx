"use client";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
import TableBasic from "@/app/components/table/Tablebasic";
import { statusOptions } from "@/constants/masterData";
import { Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import ImageDefult from "../../../../../public/assets/images/logoDatxe.png";
import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import { QueryClient } from "@tanstack/react-query";
import { useRevenueList } from "../hooks/revenue/useRevenue";
const queryClient = new QueryClient();

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Doanh thu" },
];

const Revenue = () => {
  const { revenue, isLoading, isFetching, page, setPage } = useRevenueList();

  console.log(revenue);
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên bài viết
        </span>
      ),
      name: "name",
      dataIndex: ["title"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Trạng thái
        </span>
      ),
      name: "status",
      dataIndex: ["status"],
      width: "100px",
      render: (record: any) => {
        const matchedStatus = statusOptions.find(
          (item) => item.value === record
        );
        if (matchedStatus) {
          return (
            <Badge
              variant="light"
              radius={0}
              size="lg"
              color={matchedStatus.color}
              key={record}
            >
              {matchedStatus.label}
            </Badge>
          );
        }
      },
    },
  ];

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <ListPage
        // searchForm={
        //   <SearchForm
        //     searchData={searchData}
        //     brandFilter={false}
        //     initialValues={initialValuesSearch}
        //   />
        // }

        style={{ height: "100%" }}
        titleTable={true}
        baseTable={
          <TableBasic
            data={revenue?.data}
            columns={columns}
            loading={isLoading}
            totalPage={revenue?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />
    </Fragment>
  );
};
export default Revenue;
