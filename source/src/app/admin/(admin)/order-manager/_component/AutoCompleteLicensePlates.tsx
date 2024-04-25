"use client";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  CloseButton,
  Combobox,
  Flex,
  Grid,
  Loader,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { IconCamera } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

export function AutocompleteLicensePlates({
  debounceTime = 600,
  getOptionData,
  form,
  name,
  placeholder,
  isCamera = false,
  w,
  setValueInput,
  isClear = false,
  label,
  handleGetInfo,
  disabled,
}: any) {
  const searchParams = useSearchParams();
  const initialValues: any = searchParams.get(name);
  const values = form?.values;
  const [loading, setLoading] = useState(false);
  const [groceries, setGroceries] = useState([]);
  const [value, setValue] = useState("");
  const [opened, { open: open, close: close }] = useDisclosure(false);

  useEffect(() => {
    if (values?.[name] == null) {
      setValue("");
    } else {
      setValue(values?.[name]);
    }
  }, [values?.[name]]);
  const [debounced] = useDebouncedValue(value, debounceTime);
  const fetchData = async () => {
    const data: any = await getOptionData({ s: debounced });
    setGroceries(data);
    setLoading(false);
    return data;
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  useEffect(() => {
    if (debounced?.length >= 3) {
      setLoading(true);
      fetchData();
    }
  }, [debounced]);

  const combobox = useCombobox();

  const [
    openedModalCamera,
    { open: openModalCamera, close: closeModalCamera },
  ] = useDisclosure(false);

  const options = groceries?.map((item: any, index: number) => (
    <Combobox.Option
      defaultValue={initialValues}
      value={item.label}
      key={index}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "10px 0",
        }}
        onClick={() => {
          form.setFieldValue(name, item.label);
          form.setFieldValue("carId", item.value);
          handleGetInfo(item.label);
          form.setFieldValue("customerId", item.otherData.customerId);
          // form.setFieldValue("fullName", item.otherData.fullName);
          // form.setFieldValue("address", item.otherData.address);

          if (setValueInput) setValueInput(item.label);
          open();
        }}
      >
        {item.label}
      </div>
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={false}
    >
      <Combobox.Target>
        <Grid w={w} justify="space-between" gutter={0}>
          <Grid.Col span={isCamera ? 10 : 12}>
            <TextInput
              size="lg"
              radius={0}
              data-autofocus
              label={label}
              placeholder={placeholder}
              value={value}
              error={value?.length == 0 ? "Vui lòng nhập..." : null}
              onChange={(event) => {
                setValue(event.currentTarget.value);
                form.setFieldValue(name, event.currentTarget.value);
                form.setFieldValue("carId", null);
                form.setFieldValue("carBrandId", "");
                form.setFieldValue("carNameId", "");
                form.setFieldValue("carYearId", "");
                form.setFieldValue("carBrand", "");
                form.setFieldValue("carName", "");
                form.setFieldValue("carYear", "");
                if (setValueInput) setValueInput(event.currentTarget.value);
                combobox.openDropdown();
                combobox.updateSelectedOptionIndex();
              }}
              onClick={() => combobox.openDropdown()}
              onFocus={() => combobox.openDropdown()}
              onBlur={() => {
                combobox.closeDropdown();
                if (!opened && isClear) {
                  setValue("");
                }
              }}
              disabled={disabled}
              rightSection={
                loading ? (
                  <Loader size={18} />
                ) : (
                  value !== "" &&
                  !disabled && (
                    <CloseButton
                      size="sm"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        form.setFieldValue("carId", null);
                        form.setFieldValue("carBrandId", "");
                        form.setFieldValue("carNameId", "");
                        form.setFieldValue("carYearId", "");
                        form.setFieldValue("carBrand", "");
                        form.setFieldValue("carName", "");
                        form.setFieldValue("carYear", "");
                        setValue("");
                      }}
                      aria-label="Clear value"
                    />
                  )
                )
              }
            />
          </Grid.Col>
          {isCamera && (
            <Grid.Col
              style={{ display: "flex", justifyContent: "flex-end" }}
              span={2}
            >
              <ActionIcon
                onClick={openModalCamera}
                w={50}
                h={50}
                mt={24.8}
                variant="filled"
                aria-label="Settings"
              >
                <IconCamera
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Grid.Col>
          )}
        </Grid>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options?.length === 0 ? (
            <Combobox.Empty>Không có kết quả</Combobox.Empty>
          ) : (
            options
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
      <DynamicModalCamera
        openModal={openedModalCamera}
        close={closeModalCamera}
        setNumberPlate={setValue}
        setValueInput={setValueInput}
        openDropdown={() => combobox.openDropdown()}
      />
    </Combobox>
  );
}

const DynamicModalCamera = dynamic(
  () => import("@/app/admin/(admin)/order-manager/_component/ModalCamera"),
  {
    ssr: false,
  }
);
