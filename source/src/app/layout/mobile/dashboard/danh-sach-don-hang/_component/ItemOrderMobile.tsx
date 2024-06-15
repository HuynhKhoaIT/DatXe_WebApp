"use client";

import ImageField from "@/app/components/form/ImageField";
import styles from "./index.module.scss";
import { AppConstants } from "@/constants";
import { stepOrderOptions } from "@/constants/masterData";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
export default function ItemOrderMobile({ data }: any) {
  const router = useRouter();
  const images =
    data?.orderDetails[0]?.product?.images &&
    JSON.parse(data?.orderDetails[0]?.product?.images);
  const matchedStatus: any = stepOrderOptions.find(
    (item) => item.value === data.step.toString()
  );

  return (
    <div className={styles.itemOrder}>
      <div className={styles.row_1}>
        <p>
          Biển số:{" "}
          <span className={styles.numberPlates}>{data?.car?.numberPlates}</span>
        </p>
        <p className={styles.step}>{matchedStatus.label}</p>
      </div>
      {data?.orderDetails?.length > 0 ? (
        <div className={styles.itemProduct}>
          <ImageField
            width={52}
            height={52}
            src={images?.[0] && `${AppConstants.contentRootUrl}${images?.[0]}`}
          />
          <div className={styles.infoProduct}>
            <p>{data?.orderDetails[0]?.product?.name}</p>
            <p className={styles.quantity}>
              x{data?.orderDetails[0]?.quantity}
            </p>

            <div className={styles.infoPrice}>
              <del className={styles.price}>
                {data?.orderDetails[0]?.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </del>
              <span className={styles.priceSale}>
                {data?.orderDetails[0]?.priceSale.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {data?.orderDetails?.length > 1 && (
        <div
          className={styles.buttonDetail}
          onClick={() => {
            router.push(`/dashboard/danh-sach-don-hang/${data.slug}`);
          }}
        >
          <p>Xem thêm sản phẩm</p>
        </div>
      )}

      <div className={styles.row_3}>
        <p>{data?.orderDetails?.length} sản phẩm</p>
        <p>
          Thành tiền:{" "}
          <span className={styles.totalPrice}>
            {data?.total?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </p>
      </div>
      <div className={styles.btnReview}>
        <p className={styles.code}>
          Mã đơn hàng: <span>{data?.code}</span>
        </p>
        <Button
          onClick={() => {
            router.push(`/dashboard/danh-sach-don-hang/${data.slug}`);
          }}
        >
          Chi tiết
        </Button>
      </div>
    </div>
  );
}
