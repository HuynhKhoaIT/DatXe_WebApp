import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";

export default function ButtonDbDLBD({
  isLoading,
  handleDbDLBD,
  dataDetail,
  user,
}: any) {
  if (dataDetail?.orderDLBDId) {
    return;
  }
  const HandleCancelOrder = () => {
    modals.openConfirmModal({
      title: "Xác nhận",
      children: "Bạn có muốn đồng bộ đơn hàng lên DLBD?",
      size: "350px",
      centered: true,
      withCloseButton: false,
      labels: { confirm: "Đồng bộ", cancel: "Huỷ" },
      onConfirm: () => handleDbDLBD(),
    });
  };
  if (!user?.useDLBD) {
    return;
  }
  return (
    <Button
      size="md"
      radius={0}
      h={{ base: 42, md: 50, lg: 50 }}
      color="blue"
      loading={isLoading}
      onClick={HandleCancelOrder}
    >
      Đồng bộ DLBD
    </Button>
  );
}
