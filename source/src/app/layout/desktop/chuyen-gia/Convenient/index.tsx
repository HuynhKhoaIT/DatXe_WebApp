"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import SlickCarousel from "@/app/components/common/SlickCarousell";
import CardConvenient from "./CardConvenient";
const Convenients = ({ amenities }: any) => {
  console.log(amenities);
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        stylesProps={{ padding: "30px 0" }}
        title="Tiện ích lân cận"
        subTitle="Danh mục dịch vụ phổ biến"
        hiddenShowMore={true}
        id="convenients-expert"
      >
        <SlickCarousel column={4} gap={8} dots={true}>
          {amenities?.map((convenient: any, index: number) => (
            <CardConvenient convenient={convenient?.amenities} key={index} />
          ))}
        </SlickCarousel>
      </OverviewPanel>
    </div>
  );
};
export default Convenients;
