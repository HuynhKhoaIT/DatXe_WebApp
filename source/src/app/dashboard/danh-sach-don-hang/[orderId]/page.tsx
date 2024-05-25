import RenderContext from "@/app/components/elements/RenderContext";
import OrderDetailPageMobile from "@/app/layout/mobile/gio-hang/OrderDetailPageMobile";
import { getOrderBySlug } from "@/app/libs/prisma/order";

export default async function Products({
  params,
}: {
  params: { orderId: string };
}) {
  const orderDetail: any = await getOrderBySlug(params.orderId);

  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: OrderDetailPageMobile,
        },
        mobile: {
          defaultTheme: OrderDetailPageMobile,
        },
      }}
      dataSource={orderDetail}
    />
  );
}
