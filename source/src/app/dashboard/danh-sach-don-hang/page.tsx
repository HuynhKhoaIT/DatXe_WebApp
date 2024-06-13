import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RenderContext from "@/app/components/elements/RenderContext";
import OrdersListPage from "@/app/layout/dashboard/danh-sach-don-hang/OrdersListPage";
import OrdersListPageMobile from "@/app/layout/mobile/dashboard/danh-sach-don-hang/OrdersListPageMobile";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib";
import { getServerSession } from "next-auth";
export default async function Products({ searchParams }: any) {
  // const session =  await getServerSession(authOptions);
  const orders = await callApi(apiConfig.order.getList, {
    params: {
      step: searchParams.step,
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
