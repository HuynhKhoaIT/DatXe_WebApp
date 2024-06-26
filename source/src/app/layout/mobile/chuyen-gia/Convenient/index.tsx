"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import Scroll from "@/app/components/common/Scroll";
import CardConvenient from "@/app/layout/desktop/chuyen-gia/Convenient/CardConvenient";
const Convenients = ({ amenities }: any) => {
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        stylesProps={{ padding: "10px 0" }}
        title="Tiện ích lân cận"
        subTitle="Danh mục dịch vụ phổ biến"
        hiddenShowMore={true}
        id="amenities-expert"
      >
        <div style={{ marginRight: "-12px" }}>
          <Scroll>
            {amenities?.map((convenient: any, index: number) => (
              <CardConvenient convenient={convenient?.amenities} key={index} />
            ))}
          </Scroll>
        </div>
      </OverviewPanel>
    </div>
  );
};
export default Convenients;
