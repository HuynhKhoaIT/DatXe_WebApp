"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import ProductItem from "@/app/components/elements/product/ProductItem1";
import BlogItem from "./BlogItem";
import SlickCarousel from "@/app/components/common/SlickCarousell";
import { useMediaQuery } from "@mantine/hooks";
const Blogs = ({ blogs, garageId }: any) => {
  const isTablet = useMediaQuery(`(max-width: ${"780px"})`);

  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        stylesProps={{ padding: "30px 0" }}
        title="Chia sẽ kinh nghiệm"
        linkToList={`/danh-sach-bai-viet?garageId=${garageId}`}
        hiddenShowMore={true}
        id="blogs-expert"
      >
        <SlickCarousel column={isTablet ? 3 : 4} gap={8} dots={true}>
          {blogs?.map((blog: any, index: number) => (
            <BlogItem blog={blog} key={index} />
          ))}
        </SlickCarousel>
      </OverviewPanel>{" "}
    </div>
  );
};
export default Blogs;
