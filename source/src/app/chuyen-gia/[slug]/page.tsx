import RenderContext from "@/app/components/elements/RenderContext";
import ExpertDetailPageDesktop from "@/app/layout/desktop/chuyen-gia/ExpertDetailPage";
import ExpertDetailPageMobile from "@/app/layout/mobile/chuyen-gia/ExpertDetailPage";
import { getProducts } from "@/app/libs/prisma/product";
import { apiUrl } from "@/constants";
import BlogImage1 from "@/assets/images/blog/blog1.png";
import BlogImage2 from "@/assets/images/blog/blog2.png";
import BlogImage3 from "@/assets/images/blog/blog3.png";
import BlogImage4 from "@/assets/images/blog/blog4.png";
import IconFaceBook from "@/assets/icons/faceBook.svg";
import IconZalo from "@/assets/icons/zalo.svg";
import IconIg from "@/assets/icons/instagram.svg";
import { getCategories } from "@/app/libs/prisma/category";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
import type { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const expertData: any = await callApi(apiConfig.expert.getById, {
    pathParams: {
      id: params?.slug,
    },
  });
  return {
    title: expertData?.shortName,
    description: expertData?.description,
    openGraph: {
      images: expertData?.logo,
    },
  };
}

const blogs = [
  {
    id: "1",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    thumbnail: BlogImage1.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "2",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    thumbnail: BlogImage2.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "3",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    thumbnail: BlogImage3.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "4",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    thumbnail: BlogImage4.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
  {
    id: "5",
    title: "Mách bạn cách sửa động cơ Mitsubishi Grandis....",
    thumbnail: BlogImage1.src,
    expert: {
      id: "1",
      name: "Đặt lịch bảo dưỡng",
    },
    createdDate: "20/11/2023",
    description:
      "Mitsubishi Grandis chính hãng khi gặp hiện tượng động cơ bị ngừng hoạt động, xe chết máy giữa đường",
  },
];
const socials = [
  { id: "1", name: "SHARE ON FACEBOOK", image: IconFaceBook.src },
  { id: "2", name: "SHARE ON ZALO", image: IconZalo.src },
  { id: "3", name: "SHARE ON INSTAGRAM", image: IconIg.src },
];

const convenients = [
  { id: "1", name: "Cà phê", image: BlogImage1.src, properties: 129768 },
  { id: "2", name: "Điều hoà", image: BlogImage2.src, properties: 129768 },
  { id: "3", name: "Máy sấy", image: BlogImage3.src, properties: 129768 },
  { id: "4", name: "Giặc giũ", image: BlogImage4.src, properties: 129768 },
  { id: "5", name: "Bi-a", image: BlogImage4.src, properties: 129768 },
];
export default async function DetailGarage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);
  const expertData: any = await callApi(apiConfig.expert.getById, {
    pathParams: {
      id: params?.slug,
    },
  });

  if (session?.user) {
    var review: any = await callApi(apiConfig.garage.getReviews, {
      pathParams: {
        id: params?.slug,
      },
      params: {
        userId: session?.user?.id,
      },
    });
  }

  const reviews: any = await callApi(apiConfig.garage.getReviews, {
    pathParams: {
      id: params?.slug,
    },
    params,
  });

  const categories = await getCategories({ garageId: params?.slug });
  const services = await getProducts({
    isProduct: "0",
    garageId: params?.slug,
  });
  // const products = await getProducts({
  //   isProduct: "1",
  //   garageId: expertDetail.id,
  // });
  const products = await callApi(apiConfig.products.getList, {
    params: {
      isProduct: "1",
      garageId: params?.slug,
    },
  });

  const newsList = await callApi(apiConfig.posts.getList, {
    params: {
      garageId: params?.slug,
    },
  });

  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: ExpertDetailPageDesktop,
        },
        mobile: {
          defaultTheme: ExpertDetailPageMobile,
        },
      }}
      expertDetail={expertData || {}}
      categories={categories}
      services={services}
      products={products}
      blogs={newsList?.data?.length > 0 ? newsList?.data : blogs}
      socials={socials}
      reviews={reviews}
      review={review}
      convenients={convenients}
      expertId={params?.slug}
    />
  );
}
