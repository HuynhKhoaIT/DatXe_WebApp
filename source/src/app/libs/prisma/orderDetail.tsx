import prisma from "../prismadb";

export async function createOrderDetail(orderId: string,data: any) {
    try {
        const orderDetail = await prisma.orderDetail.create({
            data: {                
                orderId: (orderId),
                productId: data.productId,
                note: data.note,
                price: Number(data.price),
                priceSale: Number(data.priceSale),
                saleType: data.saleType,
                quantity: Number(data.quantity),
                subTotal: Number(data.subTotal ?? 0),
                garageId: (data.garageId),
                createdBy: data.createdBy,
                status: data.status
            }
        });
        return orderDetail;
    } catch (error) {
      return { error };
    }
}