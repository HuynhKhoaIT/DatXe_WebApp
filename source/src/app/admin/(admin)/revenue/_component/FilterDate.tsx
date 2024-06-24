"use client";
import { Box, Grid, NumberInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { addMonths } from "date-fns";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterDate({ totalSum }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedDate, setSelectedDate] = useState<any>();
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 15
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
  const handleSubmit = async (formattedDates: any) => {
    router.push(
      `${pathname}?startDate=${formattedDates?.[0]}&endDate=${formattedDates?.[1]}`,
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
    <Box mb={30}>
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
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <NumberInput
            readOnly
            label="Tổng doanh thu"
            value={totalSum}
            size="lg"
            radius={0}
            thousandSeparator=","
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
