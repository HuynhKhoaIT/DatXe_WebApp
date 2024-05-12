import { Fragment, ReactNode, Suspense } from "react";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import Header from "../layout/common/desktop/HeaderDesktop";
import { MyFooter } from "../layout/common/desktop/Footer/FooterDesktop";
import HeaderMobile from "../layout/common/mobile/HeaderMobile";
import FooterMobile from "../layout/common/mobile/Footer/FooterMobile";
import Body from "../components/layout/Body";
import { FilterRadio } from "../components/elements/filterRadio";
import { getCategories } from "../libs/prisma/category";
import { kindProduct } from "@/constants/masterData";
import { Button } from "@mantine/core";
import { ButtonDeleteFilter } from "../components/elements/ButtonDeleteFilter";
export const dynamic = "force-dynamic";

interface IProps {
  children: ReactNode;
}
export default async function Layout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  const categories = await getCategories({ garageId: "2" });

  const categoryOption = categories?.data?.map((item: any) => ({
    value: item.id.toString(),
    name: item.title,
  }));
  return (
    <Fragment>
      {isMobile ? (
        <main>
          <HeaderMobile />
          <div style={{ minHeight: "calc(100vh - 67px)", marginTop: "67px" }}>
            {children}
          </div>
          <FooterMobile />
        </main>
      ) : (
        <main>
          <Header />
          <div style={{ minHeight: "calc(100vh - 195px)" }}>
            <Body>
              <Body.Sider>
                <FilterRadio
                  data={categoryOption}
                  filterName="Danh mục"
                  keyName="categoryId"
                />
                <FilterRadio
                  data={kindProduct}
                  filterName="Loại"
                  keyName="isProduct"
                />
                <ButtonDeleteFilter />
              </Body.Sider>
              <Body.Content>{children}</Body.Content>
            </Body>
          </div>
          <MyFooter />
        </main>
      )}
    </Fragment>
  );
}
