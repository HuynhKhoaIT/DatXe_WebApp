"use client";
import {
  Box,
  Button,
  LoadingOverlay,
  NumberInput,
  Select,
  Table,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { OptionsCancelOrder, stepOrderOptions } from "@/constants/masterData";
import dynamic from "next/dynamic";
import Typo from "@/app/components/elements/Typo";
import { modals } from "@mantine/modals";
import {
  getOptionsModels,
  getOptionsYearCar,
  handleKeyPress,
} from "@/utils/until";
import { notifications } from "@mantine/notifications";
import { useAddOrder } from "../../../hooks/order/useAddOrder";
import OrderFormDesktop from "../../_component/orderForm/OrderForm";
import OrderFormMobile from "../../_component/orderForm/mobile/OrderFormMobile";
import { getOptionsCar } from "../../until";

export default function OrderForm({
  isEditing = false,
  dataDetail,
  isLoading,
}: any) {
  const searchParams = useSearchParams();
  const licenseNumber = searchParams.get("numberPlate");
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  const router = useRouter();
  const {
    addItem,
    updateItem,
    updateStep,
    brandOptions,
    isPendingUpdate,
    isPendingAdd,
    isPendingUpdateStep,
    dbDLBD,
    isPendingDlbd,
  } = useAddOrder();
  const [activeTab, setActiveTab] = useState<string | null>(
    !isEditing ? "numberPlates" : "customer"
  );
  const [numberPlate, setNumberPlate] = useState("");
  const [isUser, handlersIsUser] = useDisclosure();
  const [errorPlate, handlersPlate] = useDisclosure();
  const [loading, handlers] = useDisclosure();
  const [loadingButton, handlersButton] = useDisclosure();
  const [selectedProducts, setSelectedProducts] = useState<any>(
    dataDetail
      ? dataDetail?.orderDetails.map((item: any) => ({
          ...item,
          id: item.productId,
        }))
      : []
  );

  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);

  const [
    openModalChoose,
    { open: openModal, close: closeModal },
  ] = useDisclosure(false);

  const [
    openModalNubmberPlates,
    { open: openModalNumberPlates, close: closeModalNumberPlates },
  ] = useDisclosure(false);

  const [
    openedModalCamera,
    { open: openModalCamera, close: closeModalCamera },
  ] = useDisclosure(false);

  const [
    openedModalUpdate,
    { open: openModalUpdate, close: closeModalUpdate },
  ] = useDisclosure(false);
  const [
    openedModalUpdateCustomer,
    { open: openModalUpdateCustomer, close: closeModalUpdateCustomer },
  ] = useDisclosure(false);
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      detail: selectedProducts,
      numberPlates: "",
      phoneNumber: "",
    },
    validate: {
      // phoneNumber: (value) =>
      //   /^0[1-9][0-9]{8}$/.test(value) ? null : "Số điện thoại sai định dạng",
      numberPlates: (value) => (value?.length > 0 ? null : "Vui lòng nhập..."),
    },
  });

  useEffect(() => {
    if (!isEditing && !licenseNumber) {
      if (form.values.numberPlates.length == 0) {
        openModalNumberPlates();
      }
    }
    if (licenseNumber) {
      if (isMobile) setActiveTab("customer");
      handleGetInfo(licenseNumber);
    }
  }, []);
  useEffect(() => {
    if (!isEditing) {
      let updatedProducts = selectedProducts.map((detail: any) => ({
        images: detail.images,
        name: detail.name,
        price: detail.price,
        productId: detail.id,
        quantity: 1,
        priceSale: detail.salePrice,
        subTotal: detail?.salePrice,
        status: "PUBLIC",
        saleType: "FIXED",
        saleValue: 0,
      }));
      form.setFieldValue("detail", updatedProducts);
    } else {
      let updatedProducts = selectedProducts.map((detail: any) => ({
        images: detail?.product?.images || detail?.images,
        name: detail?.product?.name || detail?.name,
        price: detail.price,
        productId: detail.productId !== 0 ? detail.productId : detail.id,
        quantity: detail.quantity,
        priceSale: detail?.priceSale || detail?.salePrice,
        subTotal: detail?.subTotal,
        status: detail?.status,
        saleType: detail?.saleType || "FIXED",
        saleValue: detail?.saleValue || 0,
      }));
      form.setFieldValue("detail", updatedProducts);
    }
  }, [selectedProducts]);

  useEffect(() => {
    const fetchData = async () => {
      handlers.open();
      if (isEditing && dataDetail) {
        setCustomer(dataDetail?.customer);
        setCar(dataDetail?.car);
        setSelectedProducts(
          dataDetail?.orderDetails.map((item: any) => ({
            ...item,
            images: item?.product?.images,
            id: item.productId,
          }))
        );
        // Khách hàng
        form.setFieldValue("customerId", dataDetail?.customerId?.toString());
        form.setFieldValue("fullName", dataDetail?.customer?.fullName);
        form.setFieldValue("phoneNumber", dataDetail?.customer?.phoneNumber);
        form.setFieldValue("address", dataDetail?.customer?.address);
        form.setFieldValue("step", dataDetail?.step?.toString());
        // xe
        form.setFieldValue("carBrand", dataDetail?.car?.brandName?.title);
        form.setFieldValue("carName", dataDetail?.car?.modelName?.title);
        form.setFieldValue("carYear", dataDetail?.car?.yearName?.title);
        try {
          const [models, yearCars] = await Promise.all([
            getOptionsModels(dataDetail?.car?.carBrandId),
            getOptionsYearCar(dataDetail?.car?.carNameId),
          ]);

          setModelOptions(models);
          setYearCarOptions(yearCars);

          form.setInitialValues(dataDetail);
          form.setValues(dataDetail);

          // thông tin xe
          form.setFieldValue(
            "numberPlates",
            dataDetail?.car?.numberPlates?.toString()
          );

          form.setFieldValue(
            "carBrandId",
            dataDetail?.car?.carBrandId?.toString()
          );
          form.setFieldValue(
            "carNameId",
            dataDetail?.car?.carNameId?.toString()
          );
          form.setFieldValue(
            "carYearId",
            dataDetail?.car?.carYearId?.toString()
          );

          form.setFieldValue(
            "billingCustomerName",
            dataDetail?.billingCustomerName
          );
          form.setFieldValue("billingPhone", dataDetail?.billingPhone);
          form.setFieldValue("billingAdress", dataDetail?.billingAdress);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          handlers.close();
        }
      }
    };

    if (isEditing) {
      fetchData();

      handlersIsUser.open();
    }
  }, [dataDetail]);

  // Tính tổng tiền
  const calculateSubTotal = () => {
    let subTotal = 0;
    form.values?.detail?.forEach((item: any) => {
      subTotal += item?.priceSale * item.quantity;
    });
    return subTotal;
  };

  // submit form
  const handleSubmit = async (values: any) => {
    values.subTotal = calculateSubTotal();
    values.total = calculateSubTotal();
    values.dateTime = new Date();
    handlersButton.open();

    if (values.detail?.length == 0) {
      notifications.show({
        title: "Cảnh báo",
        message: "Vui lòng thêm sản phẩm hoặc dịch vụ",
      });
      handlersButton.close();
    } else {
      if (isEditing) {
        updateItem(values);
      } else {
        addItem(values);
      }
    }

    //
  };

  const [customer, setCustomer] = useState({});
  const [car, setCar] = useState({});

  // lấy thông tin theo biển số xe
  const handleGetInfo = async (numberPlate: string) => {
    form.setFieldValue("numberPlates", numberPlate);

    if (licenseNumber) {
      form.setFieldValue("numberPlates", licenseNumber);
    }
    handlers.open();
    try {
      const res = await fetch(
        `/api/admin/car/number-plates/${licenseNumber || numberPlate}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data?.data) {
        handlersIsUser.open();
        const [models, yearCars] = await Promise.all([
          getOptionsModels(data?.data?.carBrandId),
          getOptionsYearCar(data?.data?.carNameId),
        ]);
        form.setFieldValue("fullName", data?.data?.customer.fullName);
        form.setFieldValue("phoneNumber", data?.data?.customer.phoneNumber);
        form.setFieldValue("address", data?.data?.customer.address);
        setModelOptions(models);
        setYearCarOptions(yearCars);
        setCustomer(data?.data?.customer);
        setCar(data?.data);
        form.setFieldValue("customerId", data?.data?.customer.id);
        form.setFieldValue("carId", data?.data?.id);
        form.setFieldValue("carBrandId", data?.data?.carBrandId);
        form.setFieldValue("carNameId", data?.data?.carNameId);
        form.setFieldValue("carYearId", data?.data?.carYearId);
        form.setFieldValue("carBrand", data?.data?.brandName.title);
        form.setFieldValue("carName", data?.data?.modelName.title);
        form.setFieldValue("carYear", data?.data?.yearName.title);
      }
    } catch (error) {
    } finally {
      handlers.close();
      closeModalNumberPlates();
    }
  };

  const rows = form.values.detail.map((selectedRow: any, index: number) => {
    // const images = JSON.parse(selectedRow.images);
    return (
      <Table.Tr key={index}>
        <Table.Td miw={200} style={{ fontSize: "18px" }}>
          {selectedRow.name || selectedRow?.product?.name || ""}
        </Table.Td>
        <Table.Td w={200}>
          <NumberInput
            size="lg"
            radius={0}
            w={200}
            {...form.getInputProps(`detail.${index}.priceSale`)}
            min={0}
            placeholder="Giá sale"
            suffix="đ"
            thousandSeparator=","
            onChange={(value: any) => {
              form.setFieldValue(
                `detail.${index}.subTotal`,
                form.values.detail[index].quantity * Number(value)
              );
              form.setFieldValue(`detail.${index}.priceSale`, value);
            }}
          />
        </Table.Td>
        <Table.Td w={150}>
          <NumberInput
            size="lg"
            radius={0}
            w={150}
            {...form.getInputProps(`detail.${index}.quantity`)}
            min={0}
            placeholder="Số lượng"
            thousandSeparator=","
            onChange={(value: any) => {
              form.setFieldValue(`detail.${index}.quantity`, value);
              form.setFieldValue(
                `detail.${index}.subTotal`,
                form.values.detail[index].priceSale * Number(value)
              );
            }}
          />
        </Table.Td>
        <Table.Td w={150}>
          <NumberInput
            size="lg"
            radius={0}
            w={150}
            {...form.getInputProps(`detail.${index}.subTotal`)}
            min={0}
            readOnly
            thousandSeparator=","
            suffix="đ"
          />
        </Table.Td>
        <Table.Td
          className="no-print"
          style={{ width: "120px", textAlign: "center" }}
        >
          <>
            <Tooltip label="Xoá" withArrow position="bottom">
              <Button
                size="lg"
                radius={0}
                p={5}
                variant="transparent"
                color="red"
                onClick={(e) => {
                  setSelectedProducts(
                    selectedProducts.filter(
                      (selectedItem: any) =>
                        selectedItem.id !== selectedRow.id &&
                        selectedItem.id !== selectedRow.productId
                    )
                  );
                }}
              >
                <IconTrash size={16} color="red" />
              </Button>
            </Tooltip>
          </>
        </Table.Td>
      </Table.Tr>
    );
  });

  const UpdateConfirm = (step: any) => {
    var subTitle = "";
    if (step == "-1") {
      subTitle = "huỷ đơn hàng";
    } else if (step == "1") {
      subTitle = "tiếp nhận đơn hàng";
    } else if (step == "4") {
      subTitle = "hoàn thành đơn hàng";
    }
    modals.openConfirmModal({
      title: (
        <Typo type="semi-bold" style={{ color: "red", fontSize: 20 }}>
          Xác nhận
        </Typo>
      ),
      children: <Typo size="sub">Bạn có muốn {subTitle} này không?</Typo>,
      size: "350px",
      centered: true,
      zIndex: 999,
      withCloseButton: false,
      labels: { confirm: "Có", cancel: "Không" },
      onConfirm: () => updateStep({ step: step, id: dataDetail?.id }),
    });
  };

  const HandleCancelOrder = (step: any) => {
    var cancelReason = "";
    modals.openConfirmModal({
      title: (
        <Typo
          // size="small"
          type="semi-bold"
          style={{ color: "red", fontSize: 20 }}
        >
          Huỷ đơn hàng
        </Typo>
      ),
      children: (
        <Box mb={30}>
          <Select
            size="lg"
            radius={0}
            label={"Lí do huỷ đơn"}
            placeholder="Chọn lí do"
            data={OptionsCancelOrder}
            onChange={(value) => {
              if (value !== null) {
                cancelReason = value;
              }
            }}
          />
        </Box>
      ),
      // h: 400,
      size: "350px",
      centered: true,
      // zIndex: 99,
      withCloseButton: false,
      labels: { confirm: "Xác nhận", cancel: "Huỷ" },
      onConfirm: () =>
        updateStep({
          step: step,
          id: dataDetail?.id,
          cancelReason: cancelReason,
        }),
    });
  };

  useEffect(() => {
    const fetchInfo = async () => {
      await handleGetInfo(numberPlate);
      setActiveTab("customer");
    };
    if (licenseNumber) {
      setNumberPlate(licenseNumber);
      fetchInfo();
    }
  }, [licenseNumber]);

  const handleDbDLBD = () => {
    dbDLBD({
      id: dataDetail?.id,
    });
  };
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)} onKeyPress={handleKeyPress}>
        {isMobile ? (
          <OrderFormMobile
            activeTab={activeTab}
            form={form}
            handlersPlate={handlersPlate}
            setActiveTab={setActiveTab}
            styles={styles}
            isEditing={isEditing}
            numberPlate={numberPlate}
            setNumberPlate={setNumberPlate}
            errorPlate={errorPlate}
            getOptionsCar={getOptionsCar}
            openModalCamera={openModalCamera}
            loadingButton={loadingButton}
            handleGetInfo={handleGetInfo}
            openModalUpdateCustomer={openModalUpdateCustomer}
            loading={loading}
            brandOptions={brandOptions}
            car={car}
            isUser={isUser}
            setModelOptions={setModelOptions}
            modelOptions={modelOptions}
            yearCarOptions={yearCarOptions}
            setYearCarOptions={setYearCarOptions}
            openModalUpdate={openModalUpdate}
            dataDetail={dataDetail}
            openModal={openModal}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            calculateSubTotal={calculateSubTotal}
            HandleCancelOrder={HandleCancelOrder}
            UpdateConfirm={UpdateConfirm}
            isPendingUpdate={isPendingUpdate}
            isPendingAdd={isPendingAdd}
            handleDbDLBD={handleDbDLBD}
          />
        ) : (
          <OrderFormDesktop
            dataDetail={dataDetail}
            form={form}
            car={car}
            loading={loading}
            brandOptions={brandOptions}
            isUser={isUser}
            setModelOptions={setModelOptions}
            modelOptions={modelOptions}
            yearCarOptions={yearCarOptions}
            setYearCarOptions={setYearCarOptions}
            openModalUpdate={openModalUpdate}
            handleGetInfo={handleGetInfo}
            openModalUpdateCustomer={openModalUpdateCustomer}
            styles={styles}
            openModal={openModal}
            rows={rows}
            isEditing={isEditing}
            stepOrderOptions={stepOrderOptions}
            calculateSubTotal={calculateSubTotal}
            setActiveTab={setActiveTab}
            HandleCancelOrder={HandleCancelOrder}
            UpdateConfirm={UpdateConfirm}
            isPendingUpdate={isPendingUpdate}
            isPendingAdd={isPendingAdd}
            loadingButton={loadingButton}
            handleDbDLBD={handleDbDLBD}
          />
        )}
      </form>

      {openedModalUpdateCustomer && (
        <DynamicModalUpdateCustomer
          dataDetail={customer}
          openModal={openedModalUpdateCustomer}
          close={closeModalUpdateCustomer}
          formOrder={form}
        />
      )}
      {openedModalUpdate && (
        <DynamicModalUpdateCar
          dataDetail={car}
          openModal={openedModalUpdate}
          close={closeModalUpdate}
          brandOptions={brandOptions}
          yearCarOptions={yearCarOptions}
          modelOptions={modelOptions}
          setModelOptions={setModelOptions}
          setYearCarOptions={setYearCarOptions}
          formOrder={form}
        />
      )}

      {openModalChoose && (
        <DynamicModalChooseProducts
          openModal={openModalChoose}
          close={closeModal}
          setSelectedProducts={setSelectedProducts}
          selectedProducts={selectedProducts}
        />
      )}

      {!isMobile && (
        <DynamicModalNumberPlates
          openModal={openModalNubmberPlates}
          close={closeModalNumberPlates}
          formOrder={form}
          handleGetInfo={handleGetInfo}
          numberPlate={numberPlate}
          setNumberPlate={setNumberPlate}
        />
      )}
      {openedModalCamera && (
        <DynamicModalCamera
          openModal={openedModalCamera}
          close={closeModalCamera}
          formOrder={form}
          setNumberPlate={setNumberPlate}
          handleGetInfo={handleGetInfo}
        />
      )}
    </Box>
  );
}

const DynamicModalCamera = dynamic(
  () => import("../../_component/ModalCamera"),
  {
    ssr: false,
  }
);
const DynamicModalChooseProducts = dynamic(
  () =>
    import("../../../marketing-campaign/choose-products/ModalChooseProducts"),
  {
    ssr: false,
  }
);
const DynamicModalNumberPlates = dynamic(
  () => import("../../_component/ModalNumberPlates"),
  {
    ssr: false,
  }
);
const DynamicModalUpdateCar = dynamic(
  () => import("../../_component/ModalUpdateCar"),
  {
    ssr: false,
  }
);

const DynamicModalUpdateCustomer = dynamic(
  () => import("../../_component/ModalUpdateCustomer"),
  {
    ssr: false,
  }
);
