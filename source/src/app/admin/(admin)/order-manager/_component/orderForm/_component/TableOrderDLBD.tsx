import { useOrderDLBDDetail } from "@/app/admin/(admin)/hooks/order/useOrder";
import TableBasic from "@/app/components/table/Tablebasic";
import { Box, Grid } from "@mantine/core";
import { useSession } from "next-auth/react";

export default function TableOrderDLBD({ styles, columns, dataDetail }: any) {
  const { data } = useSession();
  const {
    data: orderDlbdDetail,
    isLoading: isLoadingDLBD,
    isPending: isPendingDLBDDetail,
  } = useOrderDLBDDetail({
    token: data?.user?.token,
    id: dataDetail?.orderDLBDId,
  });
  return (
    <Box>
      <Grid className={styles.marketingInfo}>
        <Grid.Col span={12}>
          <TableBasic data={orderDlbdDetail?.data} columns={columns} />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
