import { callApi } from "@/lib/auth";
import ProductSavePage from "./ProductSavePage";
import apiConfig from "@/constants/apiConfig";

export default async function ChooseProducts({ searchParams }: any) {
  const products = await callApi(apiConfig.products.getList, {
    params: {
      isProduct: true,
      ...searchParams,
    },
  });
  const categories = await callApi(apiConfig.admin.productCategory.getList, {});
  const categoryOptions = categories?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  async function handleCreate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.products.productHot, {
        data: formData,
      });
      return res;
    } catch (error) {
      return null;
    }
  }

  return (
    <ProductSavePage
      dataSource={products}
      categoryOptions={categoryOptions}
      createItem={handleCreate}
    />
  );
}
