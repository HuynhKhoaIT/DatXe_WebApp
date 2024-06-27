import CardFormSekeleton from "@/app/components/loading/CardForm";
export default function Loading() {
  return (
    <>
      <CardFormSekeleton title="Thông tin chương trình" height={300} mb={30} />
      <CardFormSekeleton title="Danh sách sản phẩm khuyến mãi" height={500} />
    </>
  );
}
