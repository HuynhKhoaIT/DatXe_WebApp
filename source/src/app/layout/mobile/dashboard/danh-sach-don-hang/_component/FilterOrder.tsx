import { stepOrderOptions } from "@/constants/masterData";
import styles from "./index.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";
export default function FilterOrders() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStep = searchParams.get("step");
  return (
    <div className={styles.filterOrder}>
      <div
        className={classNames(
          activeStep ? styles.itemFilter : styles.itemFitlerActive
        )}
        onClick={() =>
          router.push(`${pathname}`, {
            scroll: false,
          })
        }
      >
        Tất cả
      </div>
      {stepOrderOptions?.map((item: any, index: number) => {
        return (
          <div
            className={classNames(
              activeStep === item.value
                ? styles.itemFitlerActive
                : styles.itemFilter
            )}
            key={index}
            onClick={() =>
              router.push(`${pathname}?step=${item.value}`, {
                scroll: false,
              })
            }
          >
            {item?.label}
          </div>
        );
      })}
    </div>
  );
}
