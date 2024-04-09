"use client";
import Container from "@/app/components/common/Container";
import ItemNews from "./_component/ItemNews";

const NewsListPageMobile = ({ newsData }: any) => {
  return (
    <Container>
      {newsData?.data?.map((item: any, index: number) => {
        return <ItemNews item={item} key={index} />;
      })}
    </Container>
  );
};
export default NewsListPageMobile;
