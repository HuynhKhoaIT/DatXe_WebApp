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
import {
  useDebouncedValue,
  useDisclosure,
  useValidatedState,
} from "@mantine/hooks";
import { IconCamera } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

export function AutocompletePhone({
  debounceTime = 600,
  getOptionData,
  form,
  name,
  placeholder,
  w,
  isClear = true,
  label,
  handlersLoadingCustomer,
  isUser,
}: any) {
  const [errorText, setErrorText] = useState<any>();
  const searchParams = useSearchParams();
  const initialValues: any = searchParams.get(name);
  const values = form?.values;
  const [loading, setLoading] = useState(false);
  const [groceries, setGroceries] = useState<any>([]);
  const [opened, { open: open, close: close }] = useDisclosure(false);

  useEffect(() => {
    if (values?.[name] == null) {
      form.setFieldValue(name, "");
    }
  }, [values?.[name]]);
  const [debounced] = useDebouncedValue(values?.[name], debounceTime);
  const fetchData = async () => {
    const data: any = await getOptionData({ s: debounced });
    setGroceries(data);
    setLoading(false);
    return data;
  };
  useEffect(() => {
    if (debounced?.length >= 3) {
      setLoading(true);
      fetchData();
    }
  }, [debounced]);

  const combobox = useCombobox();
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
          setErrorText(null);
          form.setFieldValue(name, item.label);
          form.setFieldValue("customerId", item.value);
          form.setFieldValue("fullName", item.otherData.fullName);
          form.setFieldValue("address", item.otherData.address);
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
        form.setFieldValue(name, optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={false}
    >
      <Combobox.Target>
        <Grid w={w} justify="space-between" gutter={0}>
          <Grid.Col span={12}>
            <TextInput
              size="lg"
              radius={0}
              error={errorText}
              data-autofocus
              label={label}
              placeholder={placeholder}
              value={form.values.phoneNumber}
              onChange={(event) => {
                setErrorText(null);
                form.setFieldValue(name, event.target.value);
                if (!isUser) {
                  form.setFieldValue("customerId", null);
                }
                form.setFieldValue("fullName", "");
                form.setFieldValue("address", "");
                combobox.openDropdown();
                combobox.updateSelectedOptionIndex();
              }}
              onClick={() => combobox.openDropdown()}
              onFocus={() => combobox.openDropdown()}
              onBlur={async (event) => {
                const is = event.target.value
                  ? /^0[1-9][0-9]{8}$/.test(event.target.value)
                    ? null
                    : "Số điện thoại sai định dạng"
                  : "Vui lòng nhập số điện thoại";
                setErrorText(is);

                if (is == null && form.values.customerId == null) {
                  handlersLoadingCustomer.open();
                  const infoCustomer = await fetchData();

                  form.setFieldValue("customerId", infoCustomer[0]?.value);
                  form.setFieldValue(
                    "fullName",
                    infoCustomer[0]?.otherData?.fullName
                  );
                  form.setFieldValue(
                    "address",
                    infoCustomer[0]?.otherData?.address
                  );
                }

                if (!opened && isClear) {
                  form.setFieldValue(name, "");
                }
                handlersLoadingCustomer.close();
              }}
              rightSection={
                loading ? (
                  <Loader size={18} />
                ) : (
                  values[name] !== "" && (
                    <CloseButton
                      size="sm"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        if (!isUser) {
                          form.setFieldValue("customerId", null);
                        }
                        form.setFieldValue("fullName", "");
                        form.setFieldValue("address", "");
                        form.setFieldValue(name, "");
                      }}
                      aria-label="Clear value"
                    />
                  )
                )
              }
            />
          </Grid.Col>
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
    </Combobox>
  );
}

const DynamicModalCamera = dynamic(
  () => import("@/app/admin/order-manager/_component/ModalCamera"),
  {
    ssr: false,
  }
);
