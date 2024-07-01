"use client";
import { useCars } from "@/app/admin/(admin)/hooks/car/useCar";
import CarsListPage from "./CarsListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách khách hàng", href: "/admin/system-customers" },

  { title: "Danh sách xe" },
];

export default function Cars() {
  const {
    cars,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    deleteItem,
    carsDlbd,
    activeTab,
    setActiveTab,
  } = useCars();

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CarsListPage
        cars={cars}
        carsDlbd={carsDlbd}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        page={page}
        setPage={setPage}
        loading={isLoading}
        deleteItem={deleteItem}
      />
    </Fragment>
  );
}