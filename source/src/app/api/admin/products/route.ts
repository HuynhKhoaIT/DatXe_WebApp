import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { slugify } from "@/utils/index";
type ResponseBody = { errors: { message: string }[] } | { username: string };
import { getProducts } from "@/app/libs/prisma/product";
import { generateUUID } from "@/utils/until";
import { createSeoMeta } from "@/app/libs/prisma/seoMeta";
import { checkAuthToken } from "@/utils/auth";
import { ROLE_ADMIN, ROLE_EXPERT } from "@/constants";
export async function GET(request: NextRequest) {
  try {
    const getAuth: any = await checkAuthToken(request);
    if (getAuth?.role == ROLE_EXPERT) {
      const { searchParams } = new URL(request.url);
      const categoryId = searchParams.get("categoryId");
      const brandIdFilter = searchParams.get("brand");
      let titleFilter = "";
      const searchText = searchParams.get("s");
      if (searchText) {
        titleFilter = searchText;
      }
      let currentPage = 1;
      let take = 10;
      let limit = Number(searchParams.get("limit"));
      let page = searchParams.get("page");

      if (page) {
        currentPage = Number(page);
      }
      if (limit) {
        take = Number(limit);
      } else {
        limit = 10;
      }
      const skip = take * (currentPage - 1);
      let statusFilter = "PUBLIC";
      if (searchParams.get("status")) {
        statusFilter = searchParams.get("status")!.toUpperCase();
      }
      let garageId = getAuth?.garageId;
      // return NextResponse.json(session.user?.garageId)
      const requestData = {
        category: categoryId,
        brand: brandIdFilter,
        s: titleFilter,
        limit: limit,
        page: page,
        garageId: garageId,
        isProduct: searchParams.get("isProduct"),
      };
      const products = await getProducts(requestData);

      return NextResponse.json(products);
    } else if (getAuth?.role == ROLE_ADMIN) {
      const { searchParams } = new URL(request.url);
      const categoryId = searchParams.get("categoryId");
      const brandIdFilter = searchParams.get("brand");
      let titleFilter = "";
      const searchText = searchParams.get("s");
      if (searchText) {
        titleFilter = searchText;
      }
      let currentPage = 1;
      let take = 10;
      let limit = Number(searchParams.get("limit"));
      let page = searchParams.get("page");

      if (page) {
        currentPage = Number(page);
      }
      if (limit) {
        take = Number(limit);
      } else {
        limit = 10;
      }
      const skip = take * (currentPage - 1);
      let statusFilter = "PUBLIC";
      if (searchParams.get("status")) {
        statusFilter = searchParams.get("status")!.toUpperCase();
      }
      let garageId: any = {};
      if (searchParams.get("garageId")) {
        garageId = searchParams.get("garageId");
      }
      // return NextResponse.json(session.user?.garageId)
      const requestData = {
        category: categoryId,
        brand: brandIdFilter,
        s: titleFilter,
        limit: limit,
        page: page,
        garageId: garageId,
        isProduct: searchParams.get("isProduct"),
      };
      const products = await getProducts(requestData);

      return NextResponse.json(products);
    } else {
      throw new Error(" ");
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const getAuth: any = await checkAuthToken(request);
    if (getAuth?.role == ROLE_EXPERT) {
      let catArr: any = [];
      let brandArr: any = [];
      let createdBy = "0";

      let garageId = getAuth?.garageId;
      let isProduct = true;

      if (!json.categories) {
        return new NextResponse("Missing 'categoryId' parameter");
      } else {
        json.categories.forEach(function (id: number) {
          catArr.push({
            assignedBy: getAuth?.fullName ?? "Admin",
            assignedAt: new Date(),
            category: {
              connect: {
                id: id.toString(),
              },
            },
          });
        });
      }

      if (!json.brands) {
        brandArr = {
          assignedBy: getAuth?.fullName ?? "Admin",
          assignedAt: new Date(),
          carBrandType: "CARBRAND",
          carModel: {
            connect: {
              id: "1",
            },
          },
        };
      } else {
        let brandArrTemp: any = [];
        json.brands.forEach(function (b: any) {
          const assignedAt = new Date();
          const assignedBy = getAuth?.fullName ?? "Admin";
          if (b.yearId) {
            const yearArr = b.yearId.split(",");
            yearArr.forEach(function (y: any) {
              let yO = {
                assignedBy: assignedBy,
                assignedAt: assignedAt,
                carBrandType: "CARYEAR",
                carModel: {
                  connect: {
                    id: y.toString(),
                  },
                },
              };
              if (!brandArrTemp.includes(y)) {
                brandArrTemp.push(y);
                brandArr.push(yO);
              }
            });
          }
          if (b.nameId) {
            let bO = {
              assignedBy: assignedBy,
              assignedAt: assignedAt,
              carBrandType: "CARNAME",
              carModel: {
                connect: {
                  id: b.nameId.toString(),
                },
              },
            };
            if (!brandArrTemp.includes(b.nameId)) {
              brandArrTemp.push(b.nameId);
              brandArr.push(bO);
            }
          }
          if (b.brandId) {
            let cO = {
              assignedBy: assignedBy,
              assignedAt: assignedAt,
              carBrandType: "CARYEAR",
              carModel: {
                connect: {
                  id: b.brandId.toString(),
                },
              },
            };
            if (!brandArrTemp.includes(b.brandId)) {
              brandArrTemp.push(b.brandId);
              brandArr.push(cO);
            }
          }
        });
      }
      if (getAuth?.id) {
        createdBy = getAuth.id;
      }
      if (typeof json.isProduct !== "undefined") {
        isProduct = Number(json.isProduct) == 1 ? true : false;
      }

      const product = await prisma.product.create({
        data: {
          name: json.title,
          uuID: generateUUID(),
          slug: json.title,
          sku: json.sku,
          price: json.price,
          salePrice: json?.salePrice ? json.salePrice : json.price,
          productId: json.productId ?? 0,
          description: json.description ?? "",
          timeSaleStart: json.timeSaleStart ?? null,
          timeSaleEnd: json.timeSaleEnd ?? null,
          quantity: json.quantity ?? 0,
          images: json.images ?? null,
          metaDescription: json.metaDescription ?? null,
          status: json.status,
          createdBy: createdBy.toString(),
          garageId: garageId,
          supplierId: json.supplierId ?? "1",
          productBrandId: json.productBrandId ?? "1",
          isProduct: isProduct,
          keyword: json.keyword,
          categories: {
            create: catArr,
          },
          brands: {
            create: brandArr,
          },
          brandDetail: JSON.stringify(json.brands),
        },
      });

      const updatedPost = await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          slug: slugify(product.name.toString()) + "-" + product.id,
        },
      });
      const seoData = {
        seoTitle: json.seoTitle,
        seoDescription: json.seoDescription,
        seoThumbnail: json.seoThumbnail,
        productId: product.id,
      };
      const seo = await createSeoMeta(seoData);

      return new NextResponse(JSON.stringify(updatedPost), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
