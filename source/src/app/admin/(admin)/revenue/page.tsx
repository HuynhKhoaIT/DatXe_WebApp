import Breadcrumb from "@/app/components/form/Breadcrumb";
import ListPage from "@/app/components/layout/ListPage";
import { Box } from "@mantine/core";
import { Fragment } from "react";
import dayjs from "dayjs";
import SimpleBarChart from "./_component/SimpleBarChart";
import TableListPage from "./_component/TableListPage";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
import FilterDate from "./_component/FilterDate";

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Doanh thu" },
];

const Revenue = async () => {
  const revenue = await callApi(apiConfig.admin.finance.getList, {});
  console.log("revenue", revenue);
  const groupedByDate = revenue?.allData?.reduce(
    (accumulator: any, currentValue: any) => {
      const date = currentValue.dateDone.split("T")[0]; // Lấy ngày (YYYY-MM-DD)
      if (!accumulator[date]) {
        accumulator[date] = {
          dateDone: date,
          total: 0,
        };
      }
      accumulator[date].total += currentValue.total;
      return accumulator;
    },
    {}
  );

  const groupedArray = groupedByDate
    ? Object.keys(groupedByDate).map((date) => {
        return {
          dateDone: dayjs(groupedByDate[date].dateDone).format("DD/MM"),
          total: groupedByDate[date].total,
        };
      })
    : [];
  const totalSum = groupedArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.total;
  }, 0);
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <FilterDate groupedArray={groupedArray} totalSum={totalSum} />
      <Box h={500} bg={"#fff"} p={30} mb={30}>
        <SimpleBarChart dataSource={groupedArray.reverse()} />
      </Box>
      <ListPage
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={<TableListPage dataSource={revenue} />}
      />
    </Fragment>
  );
};
export default Revenue;
