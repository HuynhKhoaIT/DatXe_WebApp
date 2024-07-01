import { callApi } from "@/lib/auth";
import FormDlbd from "./FormDlbd";
import apiConfig from "@/constants/apiConfig";

export default async function DlbdPage({ searchParams }: any) {
  async function handleCreate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.ttdk.create, {
        data: formData,
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  async function getOptionsGarage(formData: FormData) {
    "use server";
    try {
      const garages = await callApi(apiConfig.garage.getList, {
        params: { provinceId: formData },
      });
      const dataOption = garages.data?.map((item: any) => ({
        value: item.id,
        label: `${item.name} - ${item.address}`,
      }));
      return dataOption;
    } catch (error) {
      return null;
    }
  }
  const provinces = await callApi(apiConfig.nation.provinceList, {});
  const provinceOptions = provinces?.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  return (
    <FormDlbd
      create={handleCreate}
      searchParams={searchParams}
      provinceOptions={provinceOptions}
      getOptionsGarage={getOptionsGarage}
    />
  );
}
