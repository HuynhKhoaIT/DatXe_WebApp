import prisma from "../prismadb";

export async function getOrderCategories(requestData: any) {
  try {
    let titleFilter = "";
    const searchText = requestData.s;
    if (searchText) {
      titleFilter = searchText;
    }
    let garageId = {};
    if (requestData?.garageId) {
      garageId = requestData.garageId;
    }
    let currentPage = 1;
    let take = 10;
    let limit = Number(requestData.limit);
    let page = requestData.page;

    if (page) {
      currentPage = Number(page);
    }
    if (limit) {
      take = Number(limit);
    } else {
      limit = 10;
    }
    const skip = take * (currentPage - 1);
    let createdById = {};
    if (requestData.createdById) {
      createdById = 1;
    }
    const [data, total] = await prisma.$transaction([
      prisma.orderCategory.findMany({
        take: take,
        skip: skip,
        where: {
          title: {
            contains: titleFilter,
          },
          status: {
            not: "DELETE",
          },
          garageId: garageId,
        },
      }),
      prisma.orderCategory.count({
        where: {
          status: {
            not: "DELETE",
          },
          title: {
            contains: titleFilter,
          },
          garageId: garageId,
        },
      }),
    ]);
    return {
      data: data,
      total: total,
      currentPage: currentPage,
      limit: limit,
      totalPage: Math.ceil(total / limit),
      status: 200,
    };
  } catch (error) {
    return { error };
  }
}
