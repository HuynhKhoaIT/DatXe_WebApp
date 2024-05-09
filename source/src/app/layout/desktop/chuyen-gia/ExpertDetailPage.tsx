import Container from "@/app/components/common/Container";
import Banner from "./Banner";
import styles from "./ExpertDetailPage.module.scss";
import Info from "./Info";
import ImagesShowRoom from "./ImagesShowRoom";
import Category from "./Category";
import Service from "./Service";
import Products from "./Products";
import TabsComponent from "./tabs";
import Blogs from "./Blogs";
import SharePage from "./SharePage";
import Convenients from "./Convenient";
const ExpertDetailPageDesktop = ({
  expertDetail,
  categories,
  services,
  products,
  blogs,
  socials,
  convenients,
  reviews,
  expertId,
}: any) => {
  return (
    <div className={styles.wrapper}>
      <Banner detailData={expertDetail} />
      <Container>
        <Info detailData={expertDetail} />
        <ImagesShowRoom
          photos={expertDetail?.photos}
          className={styles.imagesShowRoom}
        />
      </Container>
      <div style={{ backgroundColor: "var(--background-color-light)" }}>
        <Category categories={categories} garageId={expertDetail?.id} />
        <Service data={services?.data} garageId={expertDetail?.id} />
      </div>
      <Products data={products?.data} garageId={expertDetail?.id} />
      <Convenients amenities={expertDetail?.amenities || convenients} />
      <div style={{ backgroundColor: "var(--background-color-light)" }}>
        <Container>
          <TabsComponent
            data={expertDetail}
            expertId={expertId}
            reviews={reviews}
          />
        </Container>
        <Blogs blogs={blogs} garageId={expertDetail?.id} />
        <SharePage bitlyUrl={expertDetail?.bitlyUrl} />
      </div>
    </div>
  );
};
export default ExpertDetailPageDesktop;
