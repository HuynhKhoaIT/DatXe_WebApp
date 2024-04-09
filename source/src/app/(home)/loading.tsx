import { Skeleton } from "@mantine/core";
import ListCategorySkeleton from "../components/loading/Category/ListCategorySkeleton";
import Container from "../components/common/Container";

export default function Loading() {
  return (
    <div>
      <Skeleton h={520} />
      <Container>
        <ListCategorySkeleton />
      </Container>
    </div>
  );
}
