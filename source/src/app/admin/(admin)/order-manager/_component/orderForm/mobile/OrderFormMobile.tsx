import AutocompleteField from "@/app/components/form/AutoCompleteField";
import {
  ActionIcon,
  Alert,
  Button,
  Grid,
  ScrollArea,
  Space,
  Table,
  Tabs,
  Textarea,
} from "@mantine/core";
import {
  IconBan,
  IconCamera,
  IconChevronRight,
  IconInfoCircle,
  IconPlus,
} from "@tabler/icons-react";
import InfoCar from "../../InfoCar";
import InfoCustomer from "../../InfoCustomer";
import { ORDER_CANCEL, ORDER_DONE } from "@/constants";
import Typo from "@/app/components/elements/Typo";
import ItemProduct from "../../ItemProduct";
import InfoCustomer2 from "../../InfoCustomer2";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import { useRouter } from "next/navigation";
import ButtonDbDLBD from "../../ButtonDbDLBD";

export default function OrderFormMobile({
  activeTab,
  form,
  handlersPlate,
  setActiveTab,
  styles,
  isEditing,
  numberPlate,
  setNumberPlate,
  errorPlate,
  getOptionsCar,
  openModalCamera,
  loadingButton,
  handleGetInfo,
  openModalUpdateCustomer,
  loading,
  brandOptions,
  car,
  isUser,
  setModelOptions,
  modelOptions,
  yearCarOptions,
  setYearCarOptions,
  openModalUpdate,
  dataDetail,
  openModal,
  selectedProducts,
  setSelectedProducts,
  calculateSubTotal,
  HandleCancelOrder,
  UpdateConfirm,
  isPendingUpdate,
  isPendingAdd,
  handleDbDLBD,
  isPendingDlbd,
}: any) {
  const router = useRouter();
  return (
    <Tabs
      variant="outline"
      // radius={0}
      color="blue"
      value={activeTab}
      onChange={(value) => {
        if (form.values.numberPlates.length === 0) {
          handlersPlate.open();
        } else {
          setActiveTab(value);
        }
      }}
    >
      <Tabs.List classNames={{ list: styles.list }}>
        {!isEditing && (
          <Tabs.Tab classNames={{ tab: styles.tab }} value="numberPlates">
            Xe
          </Tabs.Tab>
        )}
        <Tabs.Tab classNames={{ tab: styles.tab }} value="customer">
          Khách hàng
        </Tabs.Tab>
        <Tabs.Tab classNames={{ tab: styles.tab }} value="detailOrder">
          Chi tiết đơn hàng
        </Tabs.Tab>
      </Tabs.List>
      {!isEditing && (
        <Tabs.Panel value="numberPlates">
          <Grid gutter={12}>
            <Grid.Col span={10}>
              <AutocompleteField
                size="lg"
                radius={0}
                placeholder="Biển số xe"
                value={numberPlate}
                onChange={(value: any) => {
                  setNumberPlate(value);
                  if (value.length > 0) {
                    handlersPlate.close();
                  }
                  form.setFieldValue("numberPlates", value);
                }}
                error={errorPlate ? "Vui lòng nhập..." : false}
                getOptionData={getOptionsCar}
                form={form}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <ActionIcon
                onClick={openModalCamera}
                size="lg"
                h={50}
                w={50}
                variant="filled"
                aria-label="Settings"
              >
                <IconCamera
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Grid.Col>
          </Grid>

          <div className={styles.footer}>
            <Button
              size="lg"
              w={"48%"}
              radius={0}
              h={{ base: 42, md: 50, lg: 50 }}
              variant="outline"
              key="cancel"
              color="red"
              leftSection={<IconBan size={16} />}
              onClick={() => router.back()}
            >
              Huỷ bỏ
            </Button>
            <Button
              size="lg"
              radius={0}
              w={"48%"}
              h={{ base: 42, md: 50, lg: 50 }}
              loading={loadingButton}
              style={{ marginLeft: "12px" }}
              variant="filled"
              onClick={async () => {
                if (form.values.numberPlates.length === 0) {
                  handlersPlate.open();
                } else {
                  await handleGetInfo(numberPlate);
                  setActiveTab("customer");
                }
              }}
              leftSection={<IconChevronRight size={16} />}
            >
              Tiếp tục
            </Button>
          </div>
        </Tabs.Panel>
      )}

      <Tabs.Panel value="customer">
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
        <Space h={30} />
        <InfoCustomer
          openModalUpdateCustomer={openModalUpdateCustomer}
          form={form}
          isUser={isUser}
          loading={loading}
        />
        <div className={styles.footer}>
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
          <Button
            size="lg"
            radius={0}
            w={"48%"}
            h={{ base: 42, md: 50, lg: 50 }}
            style={{ marginLeft: "12px" }}
            variant="filled"
            onClick={() => {
              if (form.values.numberPlates.length === 0) {
                handlersPlate.open();
              } else {
                setActiveTab("detailOrder");
              }
            }}
            leftSection={<IconChevronRight size={16} />}
          >
            Tiếp tục
          </Button>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="detailOrder">
        <ScrollArea>
          <div style={{ marginTop: 20 }} className={styles.cardListProduct}>
            {dataDetail?.step === Number(ORDER_CANCEL) && (
              <Alert
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
                dataDetail?.step !== Number(ORDER_DONE) && (
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

            <Grid className={styles.marketingInfo}>
              <Grid.Col span={12}>
                {form.values.detail?.map((product: any, index: number) => {
                  return (
                    <ItemProduct
                      data={product}
                      key={index}
                      index={index}
                      form={form}
                      setSelectedProducts={setSelectedProducts}
                      selectedProducts={selectedProducts}
                    />
                  );
                })}
              </Grid.Col>
            </Grid>
            <InfoCustomer2 form={form} isUser={isUser} />
          </div>
          <div style={{ marginTop: 20 }} className={styles.card}>
            <Typo
              className={styles.title}
              size="primary"
              type="bold"
              style={{ color: "var(--primary-orange)" }}
            >
              Thông tin thanh toán
            </Typo>

            <Grid gutter={12} mt={24} className={styles.marketingInfo}>
              <Grid.Col span={12}>
                <div className={styles.subTotal}>
                  <span className={styles.titleSubTotal}>Tiền hàng:</span>
                  <span className={styles.valueSubTotal}>
                    {calculateSubTotal()?.toLocaleString()}
                  </span>
                </div>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <Textarea
                  size="lg"
                  rows={2}
                  radius={0}
                  {...form.getInputProps("notePrivate")}
                  label="Ghi chú nội bộ"
                  autosize={true}
                  placeholder="Ghi chú nội bộ"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <Textarea
                  size="lg"
                  rows={2}
                  radius={0}
                  {...form.getInputProps("note")}
                  label="Ghi chú của khách hàng"
                  autosize={true}
                  placeholder="Ghi chú của khách hàng"
                />
              </Grid.Col>
            </Grid>
            {isEditing &&
            dataDetail?.step !== Number(ORDER_DONE) &&
            dataDetail?.step !== Number(ORDER_CANCEL) ? (
              <FooterSavePage okText="Cập nhật" isCancel={false}>
                <ButtonDbDLBD
                  isPendingDlbd={isPendingDlbd}
                  handleDbDLBD={handleDbDLBD}
                  dataDetail={dataDetail}
                />
                <Button
                  size="md"
                  w={"33%"}
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
                  size="md"
                  radius={0}
                  w={"33%"}
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
                >
                  {dataDetail?.step == "0"
                    ? "Tiếp nhận"
                    : dataDetail?.step == "1" && "Hoàn thành"}
                </Button>
              </FooterSavePage>
            ) : dataDetail?.step !== Number(ORDER_DONE) &&
              dataDetail?.step !== Number(ORDER_CANCEL) ? (
              <FooterSavePage okText={isEditing ? "Cập nhật" : "Tạo đơn"}>
                <ButtonDbDLBD
                  isPendingDlbd={isPendingDlbd}
                  handleDbDLBD={handleDbDLBD}
                  dataDetail={dataDetail}
                />
              </FooterSavePage>
            ) : (
              // <div className={styles.footer}>
              //   <Button
              //     size="lg"
              //     w={"48%"}
              //     radius={0}
              //     h={{ base: 42, md: 50, lg: 50 }}
              //     variant="outline"
              //     key="cancel"
              //     color="red"
              //     leftSection={<IconBan size={16} />}
              //     onClick={() => setActiveTab("customer")}
              //   >
              //     Quay lại
              //   </Button>
              //   <Button
              //     size="lg"
              //     radius={0}
              //     w={"48%"}
              //     h={{ base: 42, md: 50, lg: 50 }}
              //     loading={isPendingAdd || isPendingUpdate}
              //     style={{ marginLeft: "12px" }}
              //     variant="filled"
              //     type="submit"
              //     leftSection={<IconChevronRight size={16} />}
              //   >

              //   </Button>
              // </div>
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
          </div>
        </ScrollArea>
      </Tabs.Panel>
    </Tabs>
  );
}
