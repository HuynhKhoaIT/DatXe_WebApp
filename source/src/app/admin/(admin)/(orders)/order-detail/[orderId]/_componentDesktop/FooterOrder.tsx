import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import {
  ORDER_ACCEPT,
  ORDER_CANCEL,
  ORDER_DONE,
  ORDER_PENDING,
} from "@/constants";
import { Button } from "@mantine/core";
import { IconBan } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ButtonDbDLBD from "../../../order-manager/_component/ButtonDbDLBD";

const FooterOrder = ({
  dataDetail,
  isEditing,
  handleDbDLBD,
  HandleCancelOrder,
  UpdateConfirm,
  user,
  isLoadingDb,
  isLoadingAccess,
  isLoadingDone,
  isLoadingCancel,
  isLoadingCreate,
}: any) => {
  const router = useRouter();
  if (dataDetail?.orderDLBDId) {
    return (
      <FooterSavePage
        saveLoading={isLoadingCreate}
        cancelText="Quay lại"
        isOk={false}
      ></FooterSavePage>
    );
  }
  if (dataDetail?.step === Number(ORDER_PENDING)) {
    return (
      <FooterSavePage
        saveLoading={isLoadingCreate}
        isOk={false}
        isCancel={false}
      >
        <Button
          size="md"
          radius={0}
          h={{ base: 42, md: 50, lg: 50 }}
          variant="outline"
          key="cancel"
          color="red"
          leftSection={<IconBan size={16} />}
          onClick={() => router.back()}
        >
          Quay lại
        </Button>
        <Button
          size="md"
          radius={0}
          h={{ base: 42, md: 50, lg: 50 }}
          loading={isLoadingAccess}
          style={{ marginLeft: "12px" }}
          variant="filled"
          color="blue"
          onClick={() => {
            UpdateConfirm(ORDER_ACCEPT);
          }}
          // leftSection={<IconPlus size={16} />}
        >
          Tiếp nhận
        </Button>
      </FooterSavePage>
    );
  }
  return (
    <>
      {dataDetail?.step !== Number(ORDER_CANCEL) &&
      dataDetail?.step !== Number(ORDER_DONE) ? (
        <>
          {isEditing ? (
            <>
              {dataDetail?.step === ORDER_CANCEL ||
              dataDetail?.step === ORDER_DONE ? (
                <FooterSavePage
                  saveLoading={isLoadingCreate}
                  isOk={false}
                  cancelText={"Quay lại"}
                >
                  <ButtonDbDLBD
                    user={user}
                    isLoading={isLoadingDb}
                    handleDbDLBD={handleDbDLBD}
                    dataDetail={dataDetail}
                  />
                </FooterSavePage>
              ) : (
                <FooterSavePage
                  saveLoading={isLoadingCreate}
                  okText={"Cập nhật"}
                  isCancel={false}
                >
                  <ButtonDbDLBD
                    user={user}
                    isLoading={isLoadingDb}
                    handleDbDLBD={handleDbDLBD}
                    dataDetail={dataDetail}
                  />
                  <Button
                    size="md"
                    radius={0}
                    h={{ base: 42, md: 50, lg: 50 }}
                    // variant="outline"
                    key="cancel"
                    color="red"
                    loading={isLoadingCancel}
                    // leftSection={<IconBan size={16} />}
                    onClick={() => HandleCancelOrder("-1")}
                  >
                    Huỷ đơn
                  </Button>
                  <Button
                    size="md"
                    radius={0}
                    h={{ base: 42, md: 50, lg: 50 }}
                    loading={isLoadingDone}
                    color="green"
                    variant="filled"
                    onClick={() => {
                      if (dataDetail?.step == "0") {
                        UpdateConfirm("1");
                      } else {
                        UpdateConfirm("4");
                      }
                    }}
                    // leftSection={<IconPlus size={16} />}
                  >
                    Hoàn thành
                  </Button>
                </FooterSavePage>
              )}
            </>
          ) : (
            <FooterSavePage saveLoading={isLoadingCreate} okText="Tạo đơn" />
          )}
        </>
      ) : (
        <FooterSavePage
          saveLoading={isLoadingCreate}
          cancelText="Quay lại"
          isOk={false}
        >
          <ButtonDbDLBD
            user={user}
            isLoading={isLoadingDb}
            handleDbDLBD={handleDbDLBD}
            dataDetail={dataDetail}
          />
        </FooterSavePage>
      )}
    </>
  );
};

export default FooterOrder;
