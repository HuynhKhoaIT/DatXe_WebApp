import { Skeleton } from "@mantine/core";
import ListCategorySkeleton from "../components/loading/Category/ListCategorySkeleton";
import Container from "../components/common/Container";
import ListProductSkeleton from "../components/loading/Product/ListProductSkeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton h={520} />
      <Container>
        <ListCategorySkeleton
          title="Danh mục dịch vụ"
          subTitle="Danh mục dịch vụ phổ biến"
        />
        <ListProductSkeleton
          title="Dịch vụ khuyến mãi"
          subTitle="Các dịch vụ dành cho xe bạn"
        />
        <ListProductSkeleton title="Sản phẩm ưu đãi" />
      </Container>
    </div>
  );
}
