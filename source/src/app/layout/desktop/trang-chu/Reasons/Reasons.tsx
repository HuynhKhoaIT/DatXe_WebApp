"use client";
import styles from "./index.module.scss";
import CardReassons from "./CardReasons";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import SlickCarousel from "@/app/components/common/SlickCarousell";
import { useMediaQuery } from "@mantine/hooks";
export default function Reassons({ data }: any) {
  const isDesktop = useMediaQuery(`(min-width: ${"1024px"})`);
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Lí do bạn nên chọn DatXe"
      hiddenShowMore={true}
      id="reassons"
    >
      <SlickCarousel column={isDesktop ? 3 : 2} gap={8}>
        {data?.map((data: any, index: number) => (
          <CardReassons data={data} key={index} />
        ))}
      </SlickCarousel>
    </OverviewPanel>
  );
}
