import { Card, Flex, Skeleton, Space } from "@mantine/core";
import Typo from "../../elements/Typo";
export default function ListCategorySkeleton({ title, subTitle }: any) {
  return (
    <div>
      <Typo size="small" type="bold" style={{ color: "var(--title-color)" }}>
        {title}
      </Typo>
      <div style={{ fontSize: "14px" }}>{subTitle}</div>
      <Space h={10} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "10px",
        }}
      >
        <div style={{ background: "#ffffff", padding: 20, borderRadius: 12 }}>
          <Skeleton h={{ base: 100, md: 140, lg: 140 }} radius={"lg"} />
          <Space h={20} />
          <Skeleton h={{ base: 10, md: 20, lg: 20 }} radius={"lg"} />
        </div>
        <div style={{ background: "#ffffff", padding: 20, borderRadius: 12 }}>
          <Skeleton h={{ base: 100, md: 140, lg: 140 }} radius={"lg"} />
          <Space h={20} />
          <Skeleton h={{ base: 10, md: 20, lg: 20 }} radius={"lg"} />
        </div>
        <div style={{ background: "#ffffff", padding: 20, borderRadius: 12 }}>
          <Skeleton h={{ base: 100, md: 140, lg: 140 }} radius={"lg"} />
          <Space h={20} />
          <Skeleton h={{ base: 10, md: 20, lg: 20 }} radius={"lg"} />
        </div>
        <div style={{ background: "#ffffff", padding: 20, borderRadius: 12 }}>
          <Skeleton h={{ base: 100, md: 140, lg: 140 }} radius={"lg"} />
          <Space h={20} />
          <Skeleton h={{ base: 10, md: 20, lg: 20 }} radius={"lg"} />
        </div>
      </div>
    </div>
  );
}
