import RenderContext from "@/app/components/elements/RenderContext";
import OrdersListPage from "@/app/layout/dashboard/danh-sach-don-hang/OrdersListPage";
import OrdersListPageMobile from "@/app/layout/mobile/dashboard/danh-sach-don-hang/OrdersListPageMobile";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib/auth";
export default async function Products({ searchParams }: any) {
  const orders = await callApi(apiConfig.order.getList, {
    params: {
      step: searchParams.step,
      page: searchParams.page,
      limit: searchParams.limit,
    },
  });
  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: OrdersListPage,
        },
        mobile: {
          defaultTheme: OrdersListPageMobile,
        },
      }}
      dataSource={orders}
    />
  );
}
