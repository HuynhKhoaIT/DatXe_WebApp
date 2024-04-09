import { Skeleton } from "@mantine/core";
import ListCategorySkeleton from "../components/loading/Category/ListCategorySkeleton";
import Container from "../components/common/Container";
import ListProductSkeleton from "../components/loading/Product/ListProductSkeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton h={520} />
      <Container>
        <ListCategorySkeleton />
        <ListProductSkeleton />
        <ListProductSkeleton />
      </Container>
    </div>
  );
}
