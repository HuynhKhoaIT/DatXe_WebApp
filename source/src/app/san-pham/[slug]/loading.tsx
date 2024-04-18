import Container from "@/app/components/common/Container";
import ListProductSkeleton from "@/app/components/loading/Product/ListProductSkeleton";
import { Card, Flex, Group, Skeleton, Space } from "@mantine/core";

export default function Loading() {
  return (
    <div style={{ background: "var(--background-color-light)" }}>
      <Container>
        <Flex gap={10} pt={15}>
          <Skeleton height={30} width={100} radius={"lg"} />
          <Skeleton height={30} width={100} radius={"lg"} />
          <Skeleton height={30} width={100} radius={"lg"} />
        </Flex>
        <Space h={20} />
        <Flex gap={30}>
          <div>
            <Skeleton height={400} width={400} />
            <Space h={10} />

            <Flex gap={10} pt={10}>
              <Skeleton height={85} width={85} radius={"lg"} />
              <Skeleton height={85} width={85} radius={"lg"} />
              <Skeleton height={85} width={85} radius={"lg"} />
              <Skeleton height={85} width={85} radius={"lg"} />
            </Flex>
          </div>
          <div>
            <Skeleton height={40} width={400} radius={"lg"} />
            <Space h={20} />

            <Skeleton height={20} width={400} radius={"lg"} />
            <Space h={20} />

            <Skeleton height={20} width={400} radius={"lg"} />
            <Space h={20} />

            <Skeleton height={30} width={400} radius={"lg"} />
            <Space h={20} />

            <Skeleton height={30} width={400} radius={"lg"} />
          </div>
        </Flex>
        <Space h={40} />
        <Skeleton height={40} />
        <Space h={40} />
        <Skeleton height={200} />
        <Space h={40} />
        <Card bg={"white"} radius={20} h={252}>
          <Flex gap={20} align={"center"}>
            <Skeleton h={200} w={200} circle style={{ flexShrink: 0 }} />
            <div style={{ width: "calc(100% - 40px)" }}>
              <Skeleton h={30} w={100} />
              <Space h={20} />
              <Skeleton h={20} w={400} radius={"lg"} />
              <Space h={20} />
              <Skeleton h={10} radius={"lg"} />
              <Space h={10} />
              <Skeleton h={10} radius={"lg"} />
              <Space h={10} />
              <Skeleton h={10} radius={"lg"} />
              <Space h={10} />
              <Skeleton h={10} radius={"lg"} />
            </div>
          </Flex>
        </Card>
        <ListProductSkeleton title="Sản phẩm liên quan" />
      </Container>
    </div>
  );
}
