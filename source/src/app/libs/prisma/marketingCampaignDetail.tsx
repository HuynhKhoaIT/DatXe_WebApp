import prisma from "../prismadb";
export async function createMarketingCampaignDetail(marketingCampaignId: string,json: any) {
    try {
        const marketingCampaignDetail = await prisma.marketingCampaignDetail.create({
            data: {                
                marketingCampaignId: (marketingCampaignId),
                productId: json.productId,
                note: json.note,
                price: json.price,
                priceSale: json.priceSale,
                saleType: json.saleType,
                quantity: json.quantity,
                garageId: json.garageId,
                createdBy: json.createdBy
            }
        });
        return {marketingCampaignDetail};
    } catch (error) {
      return { error };
    }
}