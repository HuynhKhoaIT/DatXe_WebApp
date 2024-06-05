import ImageField from "@/app/components/form/ImageField";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import styles from "./ItemCartMobile.module.scss";
import { ActionIcon } from "@mantine/core";
import { AppConstants } from "@/constants";
export default function ItemCartMobile({
  data,
  handleOpenModalDelete,
  incrementQuantity,
  decrementQuantity,
}: any) {
  let images = JSON.parse(data.images);
  return (
    <div className={styles.item}>
      <ImageField
        radius="md"
        width={82}
        height={82}
        src={images?.[0] && `${AppConstants.contentRootUrl}${images[0]}`}
      />
      <div className={styles.infoItem}>
        <div className={styles.infoName}>
          <p className={styles.name}>{data?.name}</p>
          <IconX size={18} onClick={() => handleOpenModalDelete(data)} />
        </div>
        <div className={styles.infoPrice}>
          <div className={styles.price}>
            <p className={styles.priceSale}>
              {data?.priceSale?.toLocaleString()} đ
            </p>
            <del className={styles.priceProduct}>
              {data?.price?.toLocaleString()} đ
            </del>
          </div>
          <div className={styles.infoQuantity}>
            <p className={styles.minus}>
              <IconMinus
                size={16}
                onClick={() => decrementQuantity(data?.productId)}
              />
            </p>
            <span className={styles.quantity}>{data?.quantity}</span>
            <p className={styles.plus}>
              <IconPlus
                size={16}
                onClick={() => incrementQuantity(data?.productId)}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
