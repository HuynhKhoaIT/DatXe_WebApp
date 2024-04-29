import {
  ORDER_ACCEPT,
  ORDER_CANCEL,
  ORDER_DONE,
  ORDER_PENDING,
} from "@/constants";
import {
  Alert,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Image,
  NumberInput,
  Overlay,
  Select,
  Table,
  Textarea,
} from "@mantine/core";
import { IconBan, IconInfoCircle, IconPlus } from "@tabler/icons-react";
import InfoCar from "../InfoCar";
import InfoCustomer from "../InfoCustomer";
import InfoCustomer2 from "../InfoCustomer2";
import Typo from "@/app/components/elements/Typo";
import ListPage from "@/app/components/layout/ListPage";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import ReactPrint from "@/app/components/common/ReactToPrint";
import ButtonDbDLBD from "../ButtonDbDLBD";
import TableBasic from "@/app/components/table/Tablebasic";
import { useRouter } from "next/navigation";
import TableOrderDLBD from "./_component/TableOrderDLBD";
export default function OrderFormDesktop({
  dataDetail,
  form,
  car,
  loading,
  brandOptions,
  isUser,
  setModelOptions,
  modelOptions,
  yearCarOptions,
  setYearCarOptions,
  openModalUpdate,
  handleGetInfo,
  openModalUpdateCustomer,
  styles,
  openModal,
  rows,
  isEditing,
  stepOrderOptions,
  calculateSubTotal,
  setActiveTab,
  HandleCancelOrder,
  UpdateConfirm,
  isPendingUpdate,
  isPendingAdd,
  loadingButton,
  handleDbDLBD,
  isPendingDlbd,
  columns,
}: any) {
  return (
    <div className="printable">
      {dataDetail?.step === Number(ORDER_CANCEL) && (
        <Alert
          m={10}
          variant="light"
          color="red"
          title="Đơn hàng đã huỷ"
          icon={<IconInfoCircle />}
        >
          <span style={{ fontSize: "1rem" }}>
            Lí do: {dataDetail?.cancelReason || "Không rõ"}
          </span>
        </Alert>
      )}
      <Grid gutter={12}>
        <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <InfoCar
            loading={loading}
            brandOptions={brandOptions}
            car={car}
            isUser={isUser}
            setModelOptions={setModelOptions}
            modelOptions={modelOptions}
            yearCarOptions={yearCarOptions}
            setYearCarOptions={setYearCarOptions}
            form={form}
            openModalUpdate={openModalUpdate}
            handleGetInfo={handleGetInfo}
            handlersIsUser
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <InfoCustomer
            openModalUpdateCustomer={openModalUpdateCustomer}
            form={form}
            isUser={isUser}
            loading={loading}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <InfoCustomer2 form={form} isUser={isUser} />
        </Grid.Col>
      </Grid>
      <div style={{ marginTop: 20 }} className={styles.cardListProduct}>
        <div className={styles.top}>
          <Typo
            className={styles.title}
            size="primary"
            type="bold"
            style={{ color: "var(--primary-orange)" }}
          >
            Hàng hoá & Dịch vụ
          </Typo>
          {dataDetail?.step !== Number(ORDER_CANCEL) &&
            dataDetail?.step !== Number(ORDER_DONE) &&
            !dataDetail?.orderDLBDId && (
              <Button
                size="lg"
                radius={0}
                h={{ base: 42, md: 50, lg: 50 }}
                onClick={(e) => {
                  openModal();
                }}
                leftSection={<IconPlus size={18} />}
              >
                Thêm
              </Button>
            )}
        </div>
        {dataDetail?.orderDLBDId ? (
          <TableOrderDLBD
            styles={styles}
            columns={columns}
            dataDetail={dataDetail}
          />
        ) : (
          <Box pos={"relative"}>
            {dataDetail?.step === Number(ORDER_PENDING) && (
              <Overlay color="#000" backgroundOpacity={0.35} blur={15}>
                <Center h={"100%"}>
                  <Typo
                    size="small"
                    style={{ color: "#fff", textAlign: "center" }}
                  >
                    Vui lòng tiếp nhận đơn hàng để được xem chi tiết đơn hàng.
                  </Typo>
                </Center>
              </Overlay>
            )}
            <Grid className={styles.marketingInfo}>
              <Grid.Col span={12}>
                <ListPage
                  style={{ height: "100%" }}
                  baseTable={
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Tên sản phẩm</Table.Th>
                          <Table.Th>Giá</Table.Th>
                          <Table.Th>Số lượng</Table.Th>
                          <Table.Th>Tổng tiền</Table.Th>
                          <Table.Th className="no-print">Hành động</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                  }
                />
              </Grid.Col>
            </Grid>
          </Box>
        )}
      </div>
      <div style={{ marginTop: 20 }} className={styles.card}>
        <Typo
          className={styles.title}
          size="primary"
          type="bold"
          style={{ color: "var(--primary-orange)" }}
        >
          Thông tin đơn hàng
        </Typo>

        <Grid gutter={12} mt={24} className={styles.marketingInfo}>
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <NumberInput
              classNames={{ input: styles.input }}
              size="lg"
              radius={0}
              label="Tổng đơn hàng"
              placeholder="Tổng đơn hàng"
              suffix="đ"
              readOnly
              thousandSeparator=","
              value={calculateSubTotal()}
            />
          </Grid.Col>
          {isEditing ? (
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
              <Select
                classNames={{ input: styles.input }}
                size="lg"
                radius={0}
                label="Tình trạng đơn hàng"
                placeholder="Tình trạng đơn hàng"
                {...form.getInputProps("step")}
                disabled
                data={stepOrderOptions}
              />
            </Grid.Col>
          ) : (
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}></Grid.Col>
          )}
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <Textarea
              size="lg"
              classNames={{ input: styles.input }}
              radius={0}
              {...form.getInputProps("note")}
              label="Ghi chú của khách hàng"
              minRows={2}
              autosize={true}
              placeholder="Ghi chú của khách hàng"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <Textarea
              size="lg"
              classNames={{ input: styles.input }}
              radius={0}
              {...form.getInputProps("notePrivate")}
              label="Ghi chú nội bộ"
              minRows={2}
              autosize={true}
              placeholder="Ghi chú nội bộ"
            />
          </Grid.Col>
        </Grid>
      </div>

      <Footer
        dataDetail={dataDetail}
        isEditing={isEditing}
        isPendingDlbd={isPendingDlbd}
        handleDbDLBD={handleDbDLBD}
        HandleCancelOrder={HandleCancelOrder}
        UpdateConfirm={UpdateConfirm}
        isPendingAdd={isPendingAdd}
        loadingButton={loadingButton}
        isPendingUpdate={isPendingUpdate}
      />
    </div>
  );
}

const Footer = ({
  dataDetail,
  isEditing,
  isPendingDlbd,
  handleDbDLBD,
  HandleCancelOrder,
  UpdateConfirm,
  isPendingAdd,
  loadingButton,
  isPendingUpdate,
}: any) => {
  const router = useRouter();
  if (dataDetail?.orderDLBDId) {
    return (
      <FooterSavePage
        saveLoading={loadingButton}
        cancelText="Quay lại"
        isOk={false}
      ></FooterSavePage>
    );
  }
  if (dataDetail?.step === Number(ORDER_PENDING)) {
    return (
      <FooterSavePage saveLoading={loadingButton} isOk={false} isCancel={false}>
        <Button
          size="lg"
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
          size="lg"
          radius={0}
          h={{ base: 42, md: 50, lg: 50 }}
          // loading={saveLoading}
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
                <FooterSavePage isOk={false} cancelText={"Quay lại"}>
                  <ButtonDbDLBD
                    isPendingDlbd={isPendingDlbd}
                    handleDbDLBD={handleDbDLBD}
                    dataDetail={dataDetail}
                  />
                </FooterSavePage>
              ) : (
                <FooterSavePage okText={"Cập nhật"} isCancel={false}>
                  <ButtonDbDLBD
                    isPendingDlbd={isPendingDlbd}
                    handleDbDLBD={handleDbDLBD}
                    dataDetail={dataDetail}
                  />
                  <Button
                    size="lg"
                    radius={0}
                    h={{ base: 42, md: 50, lg: 50 }}
                    // variant="outline"
                    key="cancel"
                    color="red"
                    // leftSection={<IconBan size={16} />}
                    onClick={() => HandleCancelOrder("-1")}
                  >
                    Huỷ đơn
                  </Button>
                  <Button
                    size="lg"
                    radius={0}
                    h={{ base: 42, md: 50, lg: 50 }}
                    // loading={saveLoading}
                    color="green"
                    style={{ marginLeft: "12px" }}
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
            <FooterSavePage
              loading={isPendingAdd || isPendingUpdate}
              okText="Tạo đơn"
            />
          )}
        </>
      ) : (
        <FooterSavePage
          saveLoading={loadingButton}
          cancelText="Quay lại"
          isOk={false}
        >
          <ButtonDbDLBD
            isPendingDlbd={isPendingDlbd}
            handleDbDLBD={handleDbDLBD}
            dataDetail={dataDetail}
          />
        </FooterSavePage>
      )}
    </>
  );
};
