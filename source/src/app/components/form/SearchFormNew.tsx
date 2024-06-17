import React, { useCallback, useEffect, useRef } from "react";
import styles from "./SearchForm.module.scss";
import { isObject } from "lodash";
import { FieldTypes } from "@/constants/masterData";
import { Button, Grid } from "@mantine/core";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import AutocompleteField from "./AutoCompleteField";
import InputField from "./InputField";
import SelectField from "./SelectField";

const searchFields = {
  [FieldTypes.SELECT]: SelectField,
  [FieldTypes.AUTOCOMPLETE]: AutocompleteField,
  default: InputField,
};

function SearchFormNew({
  fields = [],
  hiddenAction,
  onSearch,
  className,
  onReset,
  initialValues,
  width = 1100,
  alignSearchField,
  getFormInstance,
  searchParams,
}: any) {
  const form = useForm({
    initialValues: initialValues,
    validate: {},
  });
  const handleSearchSubmit = useCallback(
    (values: any) => {
      console.log("values", values);
      onSearch?.({ ...searchParams, ...values });
    },
    [form, onSearch]
  );

  const handleClearSearch = () => {
    form.reset();
    onReset?.();
  };

  const renderField = useCallback(
    ({
      type,
      submitOnChanged,
      onChange,
      key,
      renderItem,
      style,
      component,
      ...props
    }: any) => {
      const Field = component || searchFields[type] || searchFields.default;
      return (
        <Field
          {...props}
          name={key}
          form={form}
          fieldProps={{
            style: { ...style, width: "100%", height: 32 },
          }}
          style={{ ...style, width: "100%", height: 32 }}
          onChange={(e: any) => {
            if (submitOnChanged) {
              form.onSubmit;
              console.log(e);
            } else {
              onChange?.(e);
            }
          }}
        />
      );
    },
    [handleSearchSubmit]
  );

  useEffect(() => {
    getFormInstance?.(form);
  }, [form]);

  useEffect(() => {
    const normalizeValues = { ...initialValues };

    Object.keys(normalizeValues).forEach((key) => {
      if (!isNaN(normalizeValues[key]) && !isObject(normalizeValues[key])) {
        normalizeValues[key] = Number(normalizeValues[key]);
      }
    });
    form.setValues(normalizeValues);
  }, [initialValues]);

  return (
    <form
      className={className || styles.searchForm}
      onSubmit={handleSearchSubmit}
    >
      <Grid align={alignSearchField} gutter={10} style={{ maxWidth: width }}>
        {fields.map((field: any) => {
          const { key, colSpan, className, ...props } = field;
          return (
            <Grid.Col key={key} span={colSpan || 3} className={className}>
              {renderField({ ...props, key })}
            </Grid.Col>
          );
        })}
        {!hiddenAction && fields.length > 0 && (
          <Grid.Col>
            <Button leftSection={<IconSearch />} type="submit">
              Tìm kiếm
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              leftSection={<IconTrash />}
              onClick={handleClearSearch}
            >
              Xoá
            </Button>
          </Grid.Col>
        )}
      </Grid>
    </form>
  );
}

export default SearchFormNew;
