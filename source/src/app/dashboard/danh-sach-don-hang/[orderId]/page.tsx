import RenderContext from "@/app/components/elements/RenderContext";
import OrderDetailPageMobile from "@/app/layout/mobile/gio-hang/OrderDetailPageMobile";
import { getOrderBySlug } from "@/app/libs/prisma/order";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib";

export default async function Products({
  params,
}: {
  params: { orderId: string };
}) {
  const orderDetail: any = await getOrderBySlug(params.orderId);
  var review: any = await callApi(apiConfig.garage.getReviews, {
    pathParams: {
      id: orderDetail?.garageId,
    },
    params: {
      userId: orderDetail?.customerId,
    },
  });
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
      review={review}
    />
  );
}
