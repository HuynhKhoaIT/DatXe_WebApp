import { NextResponse } from "next/server";
import prisma from "../prismadb";

export async function getProducts(requestData: any) {
  try {
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

    let categories = {};
    let titleFilter = "";
    let brands = {};
    let garageId = {};
    let isProduct = {};
    let statusFilter = "PUBLIC";

    if (requestData.limit) {
      limit = Number(requestData.limit);
    }

    // filter by categoryId
    const categoryId = requestData.category;
    if (categoryId) {
      categories = {
        some: {
          category: {
            id: categoryId!,
          },
        },
      };
    }

    // fiter by brandId
    const brandIdFilter = requestData.brand;
    if (brandIdFilter) {
      brands = {
        some: {
          carModel: {
            id: brandIdFilter,
          },
        },
      };
    }

    // fiter by text
    const searchText = requestData.s;
    if (searchText) {
      titleFilter = searchText;
    }
    if (requestData.garageId) {
      garageId = requestData.garageId;
    }

    if (requestData.status) {
      statusFilter = requestData.status.toUpperCase();
    }

    if (requestData.isProduct) {
      if (
        requestData.isProduct == "true" ||
        Number(requestData.isProduct) == 1
      ) {
        isProduct = true;
      } else {
        isProduct = false;
      }
    }

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        take: take,
        skip: skip,
        orderBy: { createdAt: "desc" },
        where: {
          AND: [
            {
              categories,
              name: {
                contains: titleFilter!,
              },
              brands,
              status: {
                not: "DELETE",
              },
              garageId,
              isProduct,
            },
          ],
        },
        include: {
          reviews: true,
          categories: true,
          garage: true,
        },
      }),
      prisma.product.count({
        where: {
          AND: [
            {
              categories,
              name: {
                contains: titleFilter!,
              },
              brands,
              status: {
                not: "DELETE",
              },
              garageId,
              isProduct,
            },
          ],
        },
      }),
    ]);

    const totalPage = Math.ceil(total / limit);

    return {
      data: products,
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
export async function getProductsClient(requestData: any) {
  try {
    let currentPage = 1;
    let take = 10;
    if (requestData.limit) {
      take = parseInt(requestData.limit);
    }
    const skip = take * (currentPage - 1);
    let categories = {};
    let titleFilter = "";
    let brands = {};
    let garageId = {};
    let isProduct = {};
    let limit = 10;
    let statusFilter = "PUBLIC";

    if (requestData.limit) {
      limit = Number(requestData.limit);
    }

    // filter by categoryId
    const categoryId = requestData.category;
    if (categoryId) {
      categories = {
        some: {
          category: {
            id: categoryId!,
          },
        },
      };
    }

    // fiter by brandId
    const brandIdFilter = requestData.brand;
    if (brandIdFilter) {
      brands = {
        some: {
          carModel: {
            id: brandIdFilter,
          },
        },
      };
    }

    // fiter by text
    const searchText = requestData.s;
    if (searchText) {
      titleFilter = searchText;
    }
    if (requestData.garageId) {
      garageId = requestData.garageId;
    }

    if (requestData.status) {
      statusFilter = requestData.status.toUpperCase();
    }

    if (requestData.isProduct) {
      if (
        requestData.isProduct == "true" ||
        Number(requestData.isProduct) == 1
      ) {
        isProduct = true;
      } else {
        isProduct = false;
      }
    }

    let page = requestData.page;
    if (page) {
      currentPage = Number(page);
    }

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        take: take,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          AND: [
            {
              categories,
              name: {
                contains: titleFilter!,
              },
              brands,
              status: "PUBLIC",
              garageId,
              isProduct,
              garage: {
                status: "PUBLIC",
              },
            },
          ],
        },
        include: {
          reviews: true,
          categories: true,
          marketingCampaignDetail: {
            take: 1,
            where: {
              marketingCampaign: {
                AND: [
                  {
                    status: "PUBLIC",
                    dateTimeStart: {
                      lte: new Date(),
                    },
                    dateTimeEnd: {
                      gte: new Date(),
                    },
                    garage:{
                      status: 'PUBLIC'
                    }
                  },
                ],
              },
            },
            include: {
              marketingCampaign: true,
            },
          },
        },
      }),
      prisma.product.count({
        where: {
          AND: [
            {
              categories,
              name: {
                contains: titleFilter!,
              },
              brands,
              status: "PUBLIC",
              garageId,
              isProduct,
            },
          ],
        },
      }),
    ]);

    products.map((p) => {
      if (p.marketingCampaignDetail.length) {
        p.salePrice = p.marketingCampaignDetail[0]?.priceSale;
      }
    });

    const totalPage = Math.ceil(total / limit);

    return {
      data: products,
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

export async function createProduct(product: any) {
  try {
    const productFromDB = await prisma.product.create({ data: product });
    return { product: productFromDB };
  } catch (error) {
    return { error };
  }
}

export async function updateProduct(id: string, product: any) {
  try {
    const productFromDB = await prisma.product.update({
      where: { id: id },
      data: product,
    });
    return { product: productFromDB };
  } catch (error) {
    return { error };
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.delete({ where: { id: id } });
    return { product };
  } catch (error) {
    return { error };
  }
}

export async function getProductById(id: any) {
  try {
    const [product, avgReview] = await prisma.$transaction([
      prisma.product.findFirst({
        where: {
          id: id.toString(),
        },
        include: {
          categories: {
            include: {
              category: {
                select: {
                  title: true,
                },
              },
            },
          },

          garage: true,
          marketingCampaignDetail: {
            take: 1,
            where: {
              marketingCampaign: {
                AND: [
                  {
                    status: "PUBLIC",
                    dateTimeStart: {
                      lte: new Date(),
                    },
                    dateTimeEnd: {
                      gte: new Date(),
                    },
                  },
                ],
              },
            },
            include: {
              marketingCampaign: true,
            },
          },
        },
      }),
      prisma.reviewsProduct.aggregate({
        _avg: {
          star: true,
        },
        _count: true,
        where: {
          productId: id,
        },
      }),
    ]);
    if (product?.marketingCampaignDetail.length) {
      product.salePrice = product.marketingCampaignDetail[0]?.priceSale;
    }
    return { product, avgReview };
  } catch (error) {
    return { error };
  }
}

export async function getProductByUuID(uuID: string) {
  return await prisma.product.findFirst({
    where: {
      uuID: uuID.toString(),
    },
    include: {
      categories: true,
      garage: true,
      marketingCampaignDetail: {
        take: 1,
        where: {
          marketingCampaign: {
            AND: [
              {
                status: "PUBLIC",
                dateTimeStart: {
                  lte: new Date(),
                },
                dateTimeEnd: {
                  gte: new Date(),
                },
              },
            ],
          },
        },
        include: {
          marketingCampaign: true,
        },
      },
    },
  });
}
export async function getProductSimpleByID(id: string) {
  return await prisma.product.findFirst({
    where: {
      id: id.toString(),
    },
  });
}

export async function getProductsBestSeller(token: String, json: any) {
  try {
    let titleFilter = "";
    const searchText = json.s;
    if (searchText) {
      titleFilter = searchText;
    }
    let currentPage = 1;
    let take = 10;
    let limit = Number(json.limit);
    let page = json.page;

    if (page) {
      currentPage = Number(page);
    }
    if (limit) {
      take = Number(limit);
    } else {
      limit = 10;
    }
    const skip = take * (currentPage - 1);
    let garageId = {};
    if (json.garage) {
      garageId = Number(json.garage);
    }
    let isProduct = {};
    if (json.isProduct?.length) {
      isProduct = json.isProduct == "1" ? true : false;
    }
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        take: take,
        skip: skip,
        orderBy: {
          orderDetail: {
            _count: "desc",
          },
        },
        where: {
          AND: [
            {
              name: {
                contains: titleFilter!,
              },
              status: {
                not: "DELETE",
              },
              garageId,
              isProduct,
            },
          ],
        },
        include: {
          categories: true,
          garage: Number(json.includeGarage ?? 0) > 0,
          orderDetail: true,
        },
      }),
      prisma.product.count(),
    ]);

    const totalPage = Math.ceil(total / limit);

    return new NextResponse(
      JSON.stringify({
        data: products,
        total: total,
        currentPage: currentPage,
        limit: limit,
        totalPage: totalPage,
        status: 200,
      })
    );
  } catch (error) {
    return { error };
  }
}

export async function relatedProducts(productId: string) {
  let relatedProducts = null;
  const product = await getProductById(productId);

  if (product.product?.categories.length) {
    let cats: any = [];
    product.product?.categories.forEach((c) => {
      cats.push(c.categoryId);
    });
    relatedProducts = await prisma.product.findMany({
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        categories: {
          some: {
            categoryId: {
              in: cats,
            },
          },
        },
        status: "PUBLIC",
      },
    });
  }
  return relatedProducts;
}
