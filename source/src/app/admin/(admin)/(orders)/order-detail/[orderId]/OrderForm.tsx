"use client";
import { Box, Button, Grid, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPrinter, IconTrash } from "@tabler/icons-react";
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
import { ORDER_ACCEPT, ORDER_CANCEL, ORDER_DONE } from "@/constants";
import { toast } from "react-toastify";
import AlertOrderCancel from "./_componentDesktop/AlertOrderCancel";
import InfoCart from "./_componentDesktop/InfoCart";
import FooterOrder from "./_componentDesktop/FooterOrder";
import OrderFormMobile from "../../order-manager/_component/orderForm/mobile/OrderFormMobile";
import { getOptionsCar } from "../../order-manager/until";
import InfoCar from "../../order-manager/_component/InfoCar";
import InfoCustomer from "../../order-manager/_component/InfoCustomer";
import InfoCustomer2 from "../../order-manager/_component/InfoCustomer2";
import CartListProduct from "./_componentDesktop/CartListProduct";
import { useOrderDLBD } from "../../../hooks/order/useOrder";

export default function OrderForm({
  isEditing = false,
  dataDetail,
  createItem,
  updateItem,
  updateStep,
  brandOptions,
  dbDLBD,
  session,
  updateCustomer,
}: any) {
  const router = useRouter();
  var {
    data: orderDlbd,
    isLoading: isLoadingOrderDLBD,
    isPending: isPendingOrderDLBD,
  } = useOrderDLBD({
    token: session?.user?.token,
    id: dataDetail?.orderDLBDId,
  });

  const searchParams = useSearchParams();
  const licenseNumber = searchParams.get("numberPlate");
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

  // const {
  //   addItem,
  //   updateItem,
  //   updateStep,
  //   brandOptions,
  //   isPendingUpdate,
  //   isPendingAdd,
  //   isPendingUpdateStep,
  //   dbDLBD,
  //   isPendingDlbd,
  // } = useAddOrder({ isBack: true });

  const [activeTab, setActiveTab] = useState<string | null>(
    !isEditing ? "numberPlates" : "customer"
  );
  const [numberPlate, setNumberPlate] = useState("");
  const [isUser, handlersIsUser] = useDisclosure();
  const [errorPlate, handlersPlate] = useDisclosure();
  const [loading, handlers] = useDisclosure();
  const [loadingButton, handlersButton] = useDisclosure();
  const [loadingSave, handlersSave] = useDisclosure();
  const [loadingUpdate, handlersUpdate] = useDisclosure();
  const [isLoadingAccess, handlersAccess] = useDisclosure();
  const [isLoadingDone, handlersDone] = useDisclosure();
  const [isLoadingCancel, handlersCancel] = useDisclosure();
  const [isLoadingDb, handlersDb] = useDisclosure();
  const [isLoadingCreate, handlersCreate] = useDisclosure();

  const [selectedProducts, setSelectedProducts] = useState<any>(
    dataDetail
      ? dataDetail?.orderDetails?.map((item: any) => ({
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
    openedModalPrint,
    { open: openModalPrint, close: closeModalPrint },
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
          dataDetail?.orderDetails?.map((item: any) => ({
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
    if (orderDlbd?.data) {
      return orderDlbd?.data?.total;
    }
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
    handlersCreate.open();
    if (isEditing) {
      await updateItem(values);
      toast.success("Cập nhật thành công");
    } else {
      await createItem(values);
      toast.success("Thêm thành công");
    }
    handlersCreate.close();
    router.back();
    router.refresh();
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

  const UpdateConfirm = (step: any) => {
    var subTitle = "";
    if (step == ORDER_CANCEL) {
      handlersCancel.open();
      subTitle = "huỷ đơn hàng";
    } else if (step == ORDER_ACCEPT) {
      handlersAccess.open();
      subTitle = "tiếp nhận đơn hàng";
    } else if (step == ORDER_DONE) {
      subTitle = "hoàn thành đơn hàng";
    }
    modals.openConfirmModal({
      title: "Xác nhận",
      children: (
        <Typo size="sub" style={{ color: "gray" }}>
          Bạn có muốn {subTitle} này không?
        </Typo>
      ),
      size: "350px",
      centered: true,
      zIndex: 999,
      confirmProps: { color: "blue" },
      withCloseButton: false,
      labels: { confirm: "Có", cancel: "Không" },
      onConfirm: async () => {
        if (step == ORDER_CANCEL) {
          handlersCancel.open();
        } else if (step == ORDER_ACCEPT) {
          handlersAccess.open();
        } else if (step == ORDER_DONE) {
          handlersDone.open();
        }
        await updateStep({ step: step, id: dataDetail?.id });
        toast.success("Cập nhật thành công");
        handlersAccess.close();
        handlersCancel.close();
        handlersDone.close();
        router.back();
        router.refresh();
      },
    });
  };

  const HandleCancelOrder = (step: any) => {
    handlersCancel.open();
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
      onConfirm: async () => {
        await updateStep({
          step: step,
          id: dataDetail?.id,
          cancelReason: cancelReason,
        }),
          handlersCancel.close();
      },
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

  const handleDbDLBD = async () => {
    handlersDb.open();
    await dbDLBD({
      id: dataDetail?.id,
    });
    handlersDb.close();
    router.back();
    router.refresh();
  };
  return (
    <Box pos="relative">
      <Group justify="end" mr={10}>
        <Button
          variant="outline"
          color="blue"
          leftSection={<IconPrinter />}
          onClick={openModalPrint}
        >
          In
        </Button>
      </Group>
      <form onSubmit={form.onSubmit(handleSubmit)} onKeyPress={handleKeyPress}>
        {isMobile ? (
          <OrderFormMobile
            user={session.user}
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
            handleDbDLBD={handleDbDLBD}
            isLoadingDb={isLoadingDb}
            isLoadingAccess={isLoadingAccess}
            isLoadingDone={isLoadingDone}
            isLoadingCancel={isLoadingCancel}
            isLoadingCreate={isLoadingCreate}
          />
        ) : (
          <div className="printable">
            {dataDetail?.step === Number(ORDER_CANCEL) && (
              <AlertOrderCancel cancelReason={dataDetail.cancelReason} />
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
            <CartListProduct
              dataDetail={dataDetail}
              openModal={openModal}
              form={form}
              setSelectedProducts={setSelectedProducts}
              selectedProducts={selectedProducts}
            />
            <InfoCart
              calculateSubTotal={calculateSubTotal}
              form={form}
              isEditing={isEditing}
            />
            <FooterOrder
              dataDetail={dataDetail}
              isEditing={isEditing}
              handleDbDLBD={handleDbDLBD}
              HandleCancelOrder={HandleCancelOrder}
              UpdateConfirm={UpdateConfirm}
              user={session?.user}
              isLoadingDb={isLoadingDb}
              isLoadingAccess={isLoadingAccess}
              isLoadingDone={isLoadingDone}
              isLoadingCancel={isLoadingCancel}
              isLoadingCreate={isLoadingCreate}
            />
          </div>
        )}
      </form>

      {openedModalUpdateCustomer && (
        <DynamicModalUpdateCustomer
          dataDetail={customer}
          openModal={openedModalUpdateCustomer}
          close={closeModalUpdateCustomer}
          formOrder={form}
          updateCustomer={updateCustomer}
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
      {openedModalPrint && (
        <DynamicModalPrint
          openModal={openedModalPrint}
          close={closeModalPrint}
          dataDetail={dataDetail}
        />
      )}
    </Box>
  );
}

const DynamicModalCamera = dynamic(
  () => import("../../order-manager/_component/ModalCamera"),
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
  () => import("../../order-manager/_component/ModalNumberPlates"),
  {
    ssr: false,
  }
);
const DynamicModalUpdateCar = dynamic(
  () => import("../../order-manager/_component/ModalUpdateCar"),
  {
    ssr: false,
  }
);

const DynamicModalUpdateCustomer = dynamic(
  () => import("../../order-manager/_component/ModalUpdateCustomer"),
  {
    ssr: false,
  }
);

const DynamicModalPrint = dynamic(
  () => import("../../order-manager/_component/ModalPrint"),
  {
    ssr: false,
  }
);
