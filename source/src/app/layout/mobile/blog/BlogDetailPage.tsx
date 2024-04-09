"use client";

import Container from "@/app/components/common/Container";
import { Box, Center, Text } from "@mantine/core";
import Banner from "../../desktop/tin-tuc/_component/Banner";

const BlogDetailPageMobile = ({ newsData, newsDataList }: any) => {
  return (
    <Container>
      <Banner data={newsData?.data} />
      <div
        dangerouslySetInnerHTML={{ __html: newsData?.data?.description }}
      ></div>
    </Container>
  );
};
export default BlogDetailPageMobile;
