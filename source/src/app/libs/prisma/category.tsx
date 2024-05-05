import { STATUS } from "@prisma/client";
import prisma from "../prismadb";
import { getGarageIdByDLBDID } from "./garage";
import { capitalizeFirstLetter } from "@/utils/until";

export async function getCategories(requestData: any) {
  try {
    let currentPage = 1;
    let take = 10;
    let limit = 10;
    if (requestData.limit) {
      take = parseInt(requestData.limit);
    }
    let page = Number(requestData.page) > 0 ? Number(requestData.page) : 1;
    if (page) {
      currentPage = Number(page);
    }
    const skip = take * (currentPage - 1);
    let titleFilter = "";
    if (requestData.s) {
      titleFilter = requestData.s;
    }

    let garageId: any = "0";
    if (requestData.garageId) {
      garageId = requestData.garageId;
    }
    if (requestData.session) {
      garageId = await getGarageIdByDLBDID(
        Number(requestData.session.user?.garageId)
      );
    }
    let arrayStatus: STATUS[] = ["PUBLIC"];
    if (requestData.status == "ALL") {
      arrayStatus = ["PUBLIC", "PENDING", "DRAFT"];
    } else if (requestData.status) {
      arrayStatus = [requestData.status];
    }
    const [productCategories, total] = await prisma.$transaction([
      prisma.productCategory.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: take,
        skip: skip,
        where: {
          AND: [
            {
              status: {
                in: arrayStatus,
              },
              garageId: {
                in: [process.env.GARAGE_DEFAULT, garageId],
              },
            },
          ],
        },
      }),
      prisma.productCategory.count({
        where: {
          AND: [
            {
              status: {
                in: arrayStatus,
              },
              garageId: {
                in: [process.env.GARAGE_DEFAULT, garageId],
              },
            },
          ],
        },
      }),
    ]);
    const totalPage = Math.ceil(total / limit);
    return {
      data: productCategories,
      total: total,
      currentPage: currentPage,
      limit: limit,
      totalPage: totalPage,
      status: 200,
    };
  } catch (error) {
    return { error };
  }
}

export async function createCategory(category: any) {
  try {
    const categoryFromDB = await prisma.productCategory.create({
      data: category,
    });
    return { category: categoryFromDB };
  } catch (error) {
    return { error };
  }
}

export async function updateCategory(id: string, category: any) {
  try {
    const categoryFromDB = await prisma.productCategory.update({
      where: { id: id },
      data: category,
    });
    return { product: categoryFromDB };
  } catch (error) {
    return { error };
  }
}

export async function deleteCategory(id: string) {
  try {
    const category = await prisma.productCategory.delete({
      where: { id: id },
    });
    return { category };
  } catch (error) {
    return { error };
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await prisma.productCategory.findUnique({
      where: { id: id },
    });
    return { category };
  } catch (error) {
    return { error };
  }
}

export async function syncCategoryFromDlbd(catData: any, garageId: string) {
  const cat = await prisma.productCategory.findFirst({
    where: {
      title: catData.name,
      garageId: garageId,
      status: {
        not: "DELETE",
      },
    },
  });
  if (cat) {
    return cat;
  }
  const c = await prisma.productCategory.create({
    data: {
      title: catData.name,
      garageId: garageId,
      slug: catData.name,
      image: catData.thumbnail,
    },
  });
  return c;
}
export async function getByNameViaGarageId(productName: string,garageId: string){
  const cat = await prisma.productCategory.findFirst({
    where:{
      title: {
        contains: (productName)
      },
      garageId:{
        in: ["2",garageId.toString()]
      },
      status: 'PUBLIC'
    }
  })
  return cat;
}