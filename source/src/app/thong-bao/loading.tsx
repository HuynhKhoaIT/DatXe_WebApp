import { Skeleton } from "@mantine/core";
import ListCategorySkeleton from "../components/loading/Category/ListCategorySkeleton";
import Container from "../components/common/Container";
import ListProductSkeleton from "../components/loading/Product/ListProductSkeleton";
import ListnewsSkeleton from "../components/loading/news/ListNewsSkeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton h={320} />
      {/* <Container>
        <ListnewsSkeleton />
      </Container> */}
    </div>
  );
}
