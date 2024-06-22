import RenderContext from "../components/elements/RenderContext";
import LandingPageDesktop from "../layout/desktop/trang-chu";
import LandingPageMobile from "../layout/mobile/trang-chu";
import Reasons1 from "@/assets/images/reasson1.png";
import Reasons2 from "@/assets/images/reasson2.png";
import Reasons3 from "@/assets/images/reasson3.png";
import { getCategories } from "../libs/prisma/category";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
import { getProductsHome } from "../libs/prisma/homepage";

const reassons = [
  {
    image: Reasons2.src,
    title: "Đáp ứng mọi nhu cầu của bạn",
    content:
      "Từ dịch vụ rửa xe, mâm & lốp, chăm sóc toàn diện, ắc quy, phụ tùng và cả việc bảo dưỡng định kỳ nữa. Ban có thể so sánh và tìm kiếm hệ thống Chuyên gia trên cả nước.",
  },
  {
    image: Reasons3.src,
    title: "Tùy chọn đặt lịch linh hoạt",
    content:
      "Chuyên gia trải dài trên 63 tỉnh thành, sẵn sàng hỗ trợ mõi khi bạn cần. Đổi lịch hoàn tiền dễ dàng.",
  },
  {
    image: Reasons1.src,
    title: "Thanh toán an toàn và thuận tiện",
    content: "Thanh toán một chạm, an toàn khi giao dịch.",
  },
  {
    image: Reasons2.src,
    title: "Đáp ứng mọi nhu cầu của bạn",
    content:
      "Từ dịch vụ rửa xe, mâm & lốp, chăm sóc toàn diện, ắc quy, phụ tùng và cả việc bảo dưỡng định kỳ nữa. Ban có thể so sánh và tìm kiếm hệ thống Chuyên gia trên cả nước.",
  },
];
export default async function Home({ searchParams }: any) {
  const categories = await getCategories({ garageId: "2" });
  const productsHome = await getProductsHome(1);
  const servicesHome = await getProductsHome(0);

  const productsRelate = await callApi(apiConfig.products.getRelate, {
    params: {
      isProduct: 1,
    },
  });

  const slideData = await callApi(apiConfig.banner.getList, {
    params: {
      kind: 1,
    },
  });

  const advertisement = await callApi(apiConfig.banner.getList, {
    params: {
      kind: 2,
    },
  });

  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: LandingPageDesktop,
        },
        mobile: {
          defaultTheme: LandingPageMobile,
        },
      }}
      slideData={slideData}
      categories={categories.data}
      reassons={reassons}
      productsRelate={productsRelate}
      servicesHot={servicesHome}
      productsHot={productsHome}
      advertisement={advertisement}
    />
  );
}
