import { Fragment, ReactNode } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import { getSession } from "@/lib/auth";
import { FieldTypes } from "@/constants/masterData";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { getOptionsCar } from "../../(orders)/order-manager/until";
interface IProps {
  children: ReactNode;
}

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Đơn hàng TTDK" },
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
    // s: "",
    // customerId: null,
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
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={<>{children}</>}
      />
    </Fragment>
  );
}
