import { Flex, Skeleton } from "@mantine/core";
import Body from "../components/layout/Body";
import ListSearchProductSkeleton from "../components/loading/Product/ListSearchProductSkeleton";

export default function Loading() {
  return (
    <Body>
      <Body.Sider>
        <Flex direction={"column"} gap={8}>
          <Skeleton h={20} radius={10} />

          <Skeleton h={15} radius={10} />
          <Skeleton h={15} radius={10} />
          <Skeleton h={15} radius={10} />
          <Skeleton h={15} radius={10} />
          <Skeleton h={15} radius={10} />
          <Skeleton h={15} radius={10} />
          <Skeleton h={15} radius={10} />
        </Flex>
      </Body.Sider>
      <Body.Content>
        <ListSearchProductSkeleton title="Hiển thị ... sản phẩm" />
      </Body.Content>
    </Body>
  );
}
