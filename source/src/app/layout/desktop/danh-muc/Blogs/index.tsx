"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import ProductItem from "@/app/components/elements/product/ProductItem1";
import BlogItem from "./BlogItem";
import SlickCarousel from "@/app/components/common/SlickCarousell";
const Blogs = ({ blogs }: any) => {
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        stylesProps={{ padding: "30px 0" }}
        title="Bài viết danh mục"
        linkToList={"/danh-sach-bai-viet"}
        id="blogs-expert"
        fullWidth={true}
        hiddenShowMore={blogs?.length < 8}
      >
        <SlickCarousel column={4} gap={8} dots={false}>
          {blogs?.map((blog: any, index: number) => (
            <BlogItem blog={blog} key={index} />
          ))}
        </SlickCarousel>
      </OverviewPanel>
    </div>
  );
};
export default Blogs;
