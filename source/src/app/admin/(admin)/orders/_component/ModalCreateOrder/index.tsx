"use client";
import BasicModal from "@/app/components/common/BasicModal";
import { ModalEventCalendar } from "./ModalEventCalendar";
import { useAddOrder } from "../../../hooks/order/useAddOrder";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { getOptionsModels, getOptionsYearCar } from "@/utils/until";
export default function ModalCalendar({
  opened,
  onClose,
  eventInfos,
  categoryOptions,
  fetchDataOrders,
  typeView,
}: any) {
  const { addItem, brandOptions, isPendingAdd } = useAddOrder();
  const newDate = new Date(eventInfos?.start);
  newDate.setHours(newDate.getHours() + 9);
  const form = useForm<any>({
    initialValues: {
      customerRequest: "",
      numberPlates: "",
      priorityLevel: "2",
      dateTime: typeView === "dayGridMonth" ? newDate : eventInfos?.start,
    },

    validate: {
      phoneNumber: (value) =>
        value.length < 1 ? "Vui lòng nhập số điện thoại" : null,
      numberPlates: (value) =>
        value.length < 1 ? "Vui lòng nhập biển số xe" : null,
      customerRequest: (value) =>
        value.length < 1 ? "Vui lòng nhập yêu cầu" : null,
    },
  });

  useEffect(() => {
    form.setFieldValue("dateTime", eventInfos?.start);
  }, [eventInfos, opened]);
  const [loading, handlers] = useDisclosure();
  const [isUser, handlersIsUser] = useDisclosure();
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const [loadingCustomer, handlersLoadingCustomer] = useDisclosure();

  // lấy thông tin theo biển số xe
  const handleGetInfo = async (numberPlate: string) => {
    form.setFieldValue("numberPlates", numberPlate);
    handlers.open();
    try {
      const res = await fetch(`/api/admin/car/number-plates/${numberPlate}`, {
        method: "GET",
      });
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
    }
  };
  const handleSubmit = async (values: any) => {
    addItem(values);
  };
  return (
    <BasicModal
      size={700}
      isOpen={opened}
      onCloseModal={() => {
        onClose();
        form.reset();
      }}
      footer={false}
      title="Đặt lịch"
      style={{ position: "relative" }}
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <ModalEventCalendar
          brandOptions={brandOptions}
          categoryOptions={categoryOptions}
          addItem={addItem}
          eventInfos={eventInfos}
          form={form}
          isPendingAdd={isPendingAdd}
          handleGetInfo={handleGetInfo}
          modelOptions={modelOptions}
          setModelOptions={setModelOptions}
          setYearCarOptions={setYearCarOptions}
          yearCarOptions={yearCarOptions}
          loadingCustomer={loadingCustomer}
          loading={loading}
          isUser={isUser}
          handlersLoadingCustomer={handlersLoadingCustomer}
        />
      </form>
    </BasicModal>
  );
}
