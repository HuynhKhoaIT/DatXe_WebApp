import { Loader, Select } from "@mantine/core";
function SelectField({
  label,
  name,
  placeholder,
  rules,
  required,
  options,
  allowClear = true,
  fieldProps,
  apiConfig,
  mappingOptions,
  searchParams,
  optionsParams = {},
  maxOptions = 100,
  debounceTime = 1000,
  onChange,
  onSelect,
  form,
  fetching,
  ...props
}: any) {
  return (
    <Select
      label={label}
      searchable={true}
      clearable={allowClear}
      data={options?.slice(0, maxOptions) || []}
      nothingFound={fetching ? <Loader size="xs" /> : "Nothing found..."}
      placeholder={placeholder}
      required={required}
      {...props}
      {...form.getInputProps(name)}
      onChange={onChange}
    />
  );
}

export default SelectField;
