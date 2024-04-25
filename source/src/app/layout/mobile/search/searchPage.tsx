import Container from "@/app/components/common/Container";
import Filter from "../danh-muc/Filter";
import Products from "../danh-muc/Products";
import styles from "./index.module.scss";
import ButtonShowMore from "@/app/components/form/ButtonShowMore";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
const SearchPageMobile = ({ kindProduct, products, searchParams }: any) => {
  return (
    <div className={styles.wrapper}>
      <Filter kindProduct={kindProduct.data} />
      <Container>
        <Products products={products?.data} />
        {products?.currentPage < products.totalPage && (
          <ButtonShowMore
            limitCurrent={searchParams?.limit || DEFAULT_SIZE_LIMIT}
            defaultValue={DEFAULT_SIZE_LIMIT}
          />
        )}
      </Container>
    </div>
  );
};
export default SearchPageMobile;
