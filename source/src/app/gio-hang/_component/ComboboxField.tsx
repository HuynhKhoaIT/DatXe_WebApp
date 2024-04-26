"use client";
import {
  InputBase,
  Combobox,
  useCombobox,
  Button,
  Input,
  Group,
  CheckIcon,
} from "@mantine/core";

export default function ComboboxField({
  label,
  form,
  carsData,
  openModal,
  value,
  setValue,
}: any) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === "keyboard") {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex("active");
      }
    },
  });

  const handleSetValueCar = (data: any) => {
    form.setFieldValue("carId", data?.id);
    form.setFieldValue("carBrandId", data?.carBrandId);
    form.setFieldValue("carNameId", data?.carNameId);
    form.setFieldValue("carYearId", data?.carYearId);
    form.setFieldValue("carBrandName", data?.brandName?.title);
    form.setFieldValue("carModelName", data?.modelName?.title);
    form.setFieldValue("carYear", data?.yearName?.title);
  };

  const options = carsData?.map((item: any) => (
    <Combobox.Option
      value={item.numberPlates}
      key={item?.id}
      active={item.isDefault === true}
      // active={item.isDefault === true}
      onClick={() => {
        handleSetValueCar(item);
      }}
    >
      <Group h={40} gap="xs">
        {item.numberPlates === value && <CheckIcon size={12} />}
        <span>{item.numberPlates}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      resetSelectionOnOptionHover
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
        combobox.updateSelectedOptionIndex("active");
      }}
    >
      <Combobox.Target targetType="button">
        <InputBase
          size="lg"
          label={label}
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {value || <Input.Placeholder>Chọn xe</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options?.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Dữ liệu trống</Combobox.Empty>
          )}
          <Button
            variant="transparent"
            fullWidth
            radius="0"
            bg="#ddd"
            onClick={() => {
              combobox.toggleDropdown();
              openModal();
            }}
          >
            <span style={{ color: "#545454" }}>Thêm xe</span>
          </Button>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
