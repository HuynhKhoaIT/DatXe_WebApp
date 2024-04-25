import { ORDER_CANCEL, ORDER_DONE } from "@/constants";
import {
  Alert,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Table,
  Textarea,
} from "@mantine/core";
import { IconBan, IconInfoCircle, IconPlus } from "@tabler/icons-react";
import InfoCart from "../InfoCar";
import InfoCustomer from "../InfoCustomer";
import InfoCustomer2 from "../InfoCustomer2";
import Typo from "@/app/components/elements/Typo";
import ListPage from "@/app/components/layout/ListPage";
import ItemProduct from "../ItemProduct";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import ReactPrint from "@/app/components/common/ReactToPrint";
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
}: any) {
  return (
    <ReactPrint>
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
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <InfoCart
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
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
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
          </div>
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
                  size="lg"
                  radius={0}
                  label="Tình trạng đơn hàng"
                  placeholder="Tình trạng đơn hàng"
                  {...form.getInputProps("step")}
                  data={stepOrderOptions}
                />
              </Grid.Col>
            ) : (
              <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}></Grid.Col>
            )}
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
              <Textarea
                size="lg"
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

        {dataDetail?.step !== Number(ORDER_CANCEL) &&
        dataDetail?.step !== Number(ORDER_DONE) ? (
          <>
            {isEditing ? (
              <>
                {dataDetail?.step === ORDER_CANCEL ||
                dataDetail?.step === ORDER_DONE ? (
                  <Button
                    size="lg"
                    w={"48%"}
                    radius={0}
                    h={{ base: 42, md: 50, lg: 50 }}
                    variant="outline"
                    key="cancel"
                    color="red"
                    leftSection={<IconBan size={16} />}
                    onClick={() => setActiveTab("numberPlates")}
                  >
                    Quay lại
                  </Button>
                ) : (
                  <Group justify="end">
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
                    <Button
                      size="lg"
                      radius={0}
                      h={{ base: 42, md: 50, lg: 50 }}
                      loading={isPendingUpdate}
                      style={{ marginLeft: "12px" }}
                      key="submit"
                      type="submit"
                      variant="filled"
                      // leftSection={<IconPlus size={16} />}
                    >
                      Cập nhật
                    </Button>
                  </Group>
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
          />
        )}
      </div>
    </ReactPrint>
  );
}
