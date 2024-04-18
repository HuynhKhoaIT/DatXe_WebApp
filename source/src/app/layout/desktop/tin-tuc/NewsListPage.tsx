"use client";
import { Grid, Box } from "@mantine/core";
import ItemNews from "./_component/ItemNews";
import Container from "@/app/components/common/Container";
import Banner from "../chuyen-gia/Banner";

export default function NewsListPage({ newsData }: any) {
  return (
    <>
      <Banner />
      <Container>
        <Box w={"100%"}>
          <Grid>
            {newsData?.data?.map((item: any, index: number) => (
              <Grid.Col
                key={index}
                span={{ base: 12, xs: 12, sm: 12, md: 12, lg: 12 }}
              >
                <ItemNews item={item} />
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
