"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import CardBlog from "./CardBlog";
import { Grid } from "@mantine/core";

export default function Blogs({ blogs, isLoading }: any) {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Chia sẽ kinh nghiệm"
      linkToList={"/news"}
      id="products"
      hiddenShowMore={blogs?.length < 4}
    >
      <Grid>
        <Grid.Col h={533} span={6}>
          <CardBlog isLoading={isLoading} data={blogs?.[0]} />
        </Grid.Col>
        <Grid.Col h={533} span={6}>
          <Grid h={265}>
            <Grid.Col span={6} h={265}>
              <CardBlog isLoading={isLoading} data={blogs?.[1]} />
            </Grid.Col>
            <Grid.Col span={6} h={265}>
              <CardBlog isLoading={isLoading} data={blogs?.[2]} />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={12} h={265}>
              <CardBlog isLoading={isLoading} data={blogs?.[3]} />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </OverviewPanel>
  );
}
