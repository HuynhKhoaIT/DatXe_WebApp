import RenderContext from "@/app/components/elements/RenderContext";
import OrderDetailPageMobile from "@/app/layout/mobile/gio-hang/OrderDetailPageMobile";
import apiConfig from "@/constants/apiConfig";
import { callApi, getSession } from "@/lib/auth";

export default async function Products({
  params,
}: {
  params: { orderId: string };
}) {
  const session = await getSession();
  const orderDetail: any = await callApi(apiConfig.order.getById, {
    pathParams: {
      id: params.orderId,
    },
  });

  var review: any = await callApi(apiConfig.garage.getReviews, {
    pathParams: {
      id: orderDetail?.garageId,
    },
    params: {
      userId: session?.user?.id,
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
