import Container from "@/app/components/common/Container";

import styles from "./ExpertDetailPage.module.scss";
import Service from "./Service";
import Products from "./Products";
import Blogs from "./Blogs";
import Convenients from "./Convenient";
import Banner from "../../desktop/chuyen-gia/Banner";
import Info from "../../desktop/chuyen-gia/Info";
import CategoryCarouselList from "@/app/components/common/CategoryCarouselList";
import ImagesShowRoom from "../../desktop/chuyen-gia/ImagesShowRoom";
import TabsComponent from "../../desktop/chuyen-gia/tabs";
import SharePage from "../../desktop/chuyen-gia/SharePage";
const ExpertDetailPageMobile = ({
  expertDetail,
  categories,
  services,
  products,
  blogs,
  socials,
  convenients,
}: any) => {
  return (
    <div className={styles.wrapper}>
      <Banner heigth={174} detailData={expertDetail} />
      <Info detailData={expertDetail} />
      <Container className={styles.containerImages}>
        <ImagesShowRoom
          photos={expertDetail?.photos}
          className={styles.imagesShowRoom}
        />
      </Container>
      <div
        style={{
          padding: "20px 0 20px 0",
          backgroundColor: "var(--background-color-light)",
        }}
      >
        <CategoryCarouselList categories={categories?.data} />
      </div>
      <div style={{ backgroundColor: "var(--background-color-light)" }}>
        <Service data={services.data} garageId={expertDetail?.id} />
      </div>
      <Products data={products.data} garageId={expertDetail?.id} />
      <Convenients amenities={expertDetail?.amenities || convenients} />
      <div style={{ backgroundColor: "var(--background-color-light)" }}>
        <Container>
          <TabsComponent data={expertDetail} />
        </Container>
        <Blogs blogs={blogs} />
        <SharePage bitlyUrl={expertDetail?.bitlyUrl} />
      </div>
    </div>
  );
};
export default ExpertDetailPageMobile;
