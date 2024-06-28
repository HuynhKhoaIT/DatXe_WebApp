import TableListPage from "./TableListPage";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
import ActionBar from "@/app/components/common/ActionBar";

export default async function ProductsHot({ searchParams }: any) {
  const products = await callApi(apiConfig.admin.products.productHot, {
    params: {
      ...searchParams,
      isProduct: 1,
    },
  });
  async function deleteItem(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.products.homePagedeleteItem, {
        pathParams: {
          id: formData,
        },
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        {products?.length < 10 && (
          <ActionBar linkTo="/admin/product-hot/create" />
        )}
      </div>
      <TableListPage dataSource={products} deleteItem={deleteItem} />
    </>
  );
}
