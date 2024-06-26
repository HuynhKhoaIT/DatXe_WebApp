"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import Scroll from "@/app/components/common/Scroll";
import BlogItem from "@/app/layout/desktop/chuyen-gia/Blogs/BlogItem";
const Blogs = ({ blogs, garageId }: any) => {
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        stylesProps={{ padding: "10px 0" }}
        title="Chia sẽ kinh nghiệm"
        linkToList={`/danh-sach-bai-viet?garageId=${garageId}`}
        id="blogs-expert-mb"
        hiddenShowMore={blogs?.length < 4}
      >
        <div style={{ marginRight: "-12px" }}>
          <Scroll>
            {blogs?.map((blog: any, index: number) => (
              <BlogItem blog={blog} key={index} />
            ))}
          </Scroll>
        </div>
      </OverviewPanel>
    </div>
  );
};
export default Blogs;
