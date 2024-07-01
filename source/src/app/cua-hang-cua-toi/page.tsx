import RenderContext from "../components/elements/RenderContext";
import StoreListPage from "../layout/desktop/cua-hang-cua-toi/StoreListPage";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

export default async function MyGarage() {
  const experts = await callApi(apiConfig.admin.garage.getList, {});
  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: StoreListPage,
        },
        mobile: {
          defaultTheme: StoreListPage,
        },
      }}
      experts={experts}
    />
  );
}
