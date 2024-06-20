import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RenderContext from "@/app/components/elements/RenderContext";
import OrderDetailPageMobile from "@/app/layout/mobile/gio-hang/OrderDetailPageMobile";
import { getOrderBySlug } from "@/app/libs/prisma/order";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib";
import { getServerSession } from "next-auth";

export default async function Products({
  params,
}: {
  params: { orderId: string };
}) {
  const session = await getServerSession(authOptions);
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
