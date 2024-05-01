"use client";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
import TableBasic from "@/app/components/table/Tablebasic";
import { statusOptions } from "@/constants/masterData";
import { Badge, Box, Button, Flex, Grid, Image, Tooltip } from "@mantine/core";
import ImageDefult from "../../../../../public/assets/images/logoDatxe.png";
import { Fragment, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { QueryClient } from "@tanstack/react-query";
import { useRevenueList } from "../hooks/revenue/useRevenue";
import { DatePickerInput } from "@mantine/dates";
import styles from "./index.module.scss";
import { addMonths } from "date-fns";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { IconEye } from "@tabler/icons-react";
import SimpleLineChart from "./_component/SimpleLineChart";
const queryClient = new QueryClient();

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Doanh thu" },
];

const Revenue = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { revenue, isLoading, isFetching, page, setPage } = useRevenueList();
  const [selectedDate, setSelectedDate] = useState<any>();
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 7
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  var maxDate = selectedDate?.[0] ? addMonths(selectedDate?.[0], 1) : null;
  var minDate = selectedDate?.[0];
  if (selectedDate?.[1]) {
    maxDate = null;
    minDate = null;
  }
  console.log(revenue);
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Mã đơn hàng
        </span>
      ),
      name: "code",
      dataIndex: ["code"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Khách hàng
        </span>
      ),
      name: "customer",
      dataIndex: ["customer"],
      render: (dataRow: any) => {
        return (
          <span>
            {dataRow.fullName} - {dataRow.phoneNumber}
          </span>
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Ngày hoàn thành
        </span>
      ),
      name: "dateDone",
      dataIndex: ["dateDone"],
      render: (dataRow: Date) => {
        return <span>{dayjs(dataRow).format("DD/MM/YYYY HH:mm")}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Doanh thu
        </span>
      ),
      name: "total",
      dataIndex: ["total"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "100px",
      textAlign: "center",
      render: (record: any) => {
        return (
          <>
            <Link
              href={{
                pathname: `/admin/order-manager/${record.id}`,
              }}
            >
              <Tooltip label="Chi tiết" withArrow position="bottom">
                <Button
                  size="lg"
                  radius={0}
                  style={{ margin: "0 5px" }}
                  variant="transparent"
                  color="gray"
                  p={5}
                  onClick={() => {}}
                >
                  <IconEye size={16} color="blue" />
                </Button>
              </Tooltip>
            </Link>
          </>
        );
      },
    },
  ];
  const handleSubmit = async (formattedDates: any) => {
    router.push(
      `${pathname}?dateStart=${formattedDates?.[0]}&dateEnd=${formattedDates?.[1]}`,
      { scroll: false }
    );
  };

  useEffect(() => {
    if (selectedDate?.[1]) {
      const formattedDates = selectedDate.map((dateString: any) => {
        return dayjs(dateString).format("YYYY-MM-DD");
      });
      handleSubmit(formattedDates);
    }
  }, selectedDate);

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <Box mb={30} className={styles.wrapper_filter}>
        <Grid gutter={12}>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <DatePickerInput
              label="Thời gian"
              size="lg"
              radius={0}
              placeholder="Vui lòng chọn"
              type="range"
              valueFormat="DD/MM/YYYY"
              locale="vi"
              clearable={true}
              value={selectedDate}
              defaultValue={[firstDayOfMonth, lastDayOfMonth]}
              onChange={setSelectedDate}
              minDate={minDate}
              maxDate={maxDate}
            />
          </Grid.Col>
        </Grid>
      </Box>
      <Box h={500}>
        <SimpleLineChart dataSource={revenue?.allData} />
      </Box>
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
