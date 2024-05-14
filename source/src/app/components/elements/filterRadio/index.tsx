"use client";
import { Collapse, Flex, Radio } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { ItemRadio } from "./ItemRadio";
import styles from "./index.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
export function FilterRadio({
  data = [],
  filterName = "Filter",
  keyName,
}: any) {
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  let valueRadio;
  if (params.has(keyName)) {
    valueRadio = params.get(keyName);
  }
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <div className={styles.shopSidebar}>
      <div className={styles.shopWidgets}>
        <Flex justify={"space-between"}>
          <h4 className={styles.shopWidgetTitle}>{filterName}</h4>
          {opened ? (
            <IconChevronDown
              onClick={toggle}
              style={{ cursor: "pointer", rotate: "180deg" }}
            />
          ) : (
            <IconChevronDown onClick={toggle} style={{ cursor: "pointer" }} />
          )}
        </Flex>
        <Radio.Group
          value={String(valueRadio)}
          classNames={{ root: styles.root }}
        >
          <Collapse in={opened}>
            {data?.map((item: any, index: number) => (
              <ItemRadio dataDetail={item} key={index} keyName={keyName} />
            ))}
          </Collapse>
        </Radio.Group>
      </div>
    </div>
  );
}
