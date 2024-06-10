import RenderContext from "@/app/components/elements/RenderContext";
import OrdersListPage from "@/app/layout/dashboard/danh-sach-don-hang/OrdersListPage";
import OrdersListPageMobile from "@/app/layout/mobile/dashboard/danh-sach-don-hang/OrdersListPageMobile";
import { getMyOrders } from "@/app/libs/prisma/order";
import { getMyAccount } from "@/utils/user";
export default async function Products({ searchParams }: any) {
  const profile = await getMyAccount();
  const orders = await getMyOrders({
    phoneNumber: profile?.phone,
    step: searchParams.step,
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
