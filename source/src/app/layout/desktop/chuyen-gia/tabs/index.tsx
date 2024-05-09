"use client";
import React from "react";
import styles from "./index.module.scss";
import { Tabs, rem } from "@mantine/core";
import Address from "./Address";
import Reviews from "./Review";

const TabsComponent = ({ data, reviews, expertId }: any) => {
  return (
    <div>
      <Tabs
        defaultValue="introduce"
        classNames={{ list: styles.list, tabLabel: styles.tabLabel }}
      >
        <Tabs.List>
          <Tabs.Tab value="introduce">Giới thiệu</Tabs.Tab>
          <Tabs.Tab value="evaluate">Đánh giá</Tabs.Tab>
          <Tabs.Tab value="address">Vị trí</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="introduce">{data?.description}</Tabs.Panel>

        <Tabs.Panel value="evaluate">
          <Reviews reviews={reviews} garageDetail={data} expertId={expertId} />
        </Tabs.Panel>

        <Tabs.Panel value="address">
          <Address />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
export default TabsComponent;
