import ListCategorySkeleton from "@/app/components/loading/Category/ListCategorySkeleton";
import ListProductSkeleton from "@/app/components/loading/Product/ListProductSkeleton";
import { Container, Skeleton } from "@mantine/core";

export default function Loading() {
  return (
    <div>
      <Skeleton h={520} />
      <Container>
        <div style={{ display: "flex", gap: 6, width: "100%", paddingTop: 50 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              width: "60%",
            }}
          >
            <Skeleton h={506} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              width: "40%",
            }}
          >
            <Skeleton h={300} />
            <div style={{ display: "flex", gap: 6 }}>
              <Skeleton h={200} />
              <Skeleton h={200} />
            </div>
          </div>
        </div>
        <ListCategorySkeleton
          title="Danh mục dịch vụ"
          subTitle="Danh mục dịch vụ phổ biến"
        />
        <ListProductSkeleton
          title="Dịch vụ của chuyên gia"
          subTitle="Các dịch vụ dành cho xe bạn"
        />
        <ListProductSkeleton title="Sản phẩm của chuyên gia" />
        <ListProductSkeleton title="Sản phẩm ưu đãi" />
      </Container>
    </div>
  );
}
