"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SimpleLineChart = ({ dataSource }: any) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{ marginLeft: "-30px" }}
    >
      <LineChart
        width={500}
        height={300}
        data={dataSource}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dateDone" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="total"
          name="Doanh thu"
          stroke="blue"
          activeDot={{ r: 8 }}
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default SimpleLineChart;
