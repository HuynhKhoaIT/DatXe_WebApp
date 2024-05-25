import React, { useEffect, useState } from "react";
import styles from "./FilterBox.module.scss";
import { Collapse, Divider, Flex, Radio } from "@mantine/core";
import arrow from "@/assets/icons/arrow-right-br.svg";
import { useDisclosure } from "@mantine/hooks";
import Typo from "@/app/components/elements/Typo";
import { useSearchParams } from "next/navigation";
const FilterBox = ({ options, queryName, queryKey, form }: any) => {
  const [opened, { toggle }] = useDisclosure(true);
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);

  let valueRadio;
  if (params.has(queryKey)) {
    valueRadio = params.get(queryKey);
  }
  return (
    <div className={styles.filter}>
      <div className={styles.itemFilter} onClick={toggle}>
        <Flex justify="space-between" align="center" className={styles.section}>
          <Typo size="sub" type="semi-bold" className={styles.name}>
            {queryName}
          </Typo>
          <img
            src={arrow.src}
            className={styles.arrow}
            style={opened ? { transform: "rotate(90deg)" } : {}}
          />
        </Flex>
      </div>
      <Collapse in={opened} className={styles.lessonWrapper} mb={12}>
        <Radio.Group
          {...form.getInputProps(queryKey)}
          value={String(valueRadio)}
        >
          <Flex direction={"column"} gap={10} mt="xs">
            {options?.map((data: any, index: number) => {
              return (
                <Radio
                  key={index}
                  value={data?.value}
                  label={data?.name || data?.label}
                  classNames={{ label: styles.label }}
                />
              );
            })}
          </Flex>
        </Radio.Group>
      </Collapse>
      <Divider></Divider>
    </div>
  );
};
export default FilterBox;
