import prisma from "../prismadb";

export async function getSlideBanners(requestData: any) {
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
    let kind = {}
    if(requestData.kind){
      kind = requestData.kind
    }
    const [data, total] = await prisma.$transaction([
      prisma.slideBanner.findMany({
        take: take,
        skip: skip,
        orderBy: {
          id: "desc",
        },
        where: {
          title: {
            contains: titleFilter,
          },
          status: {
            not: "DELETE",
          },
          garageId: garageId,
          kind
        },
      }),
      prisma.slideBanner.count({
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

export async function findSlideBanner(id: string) {
    return await prisma.slideBanner.findFirst({
        where: {
            id
        }
    })
}
export async function updateSlideBanner(id: string, json: any) {
    const slide = await findSlideBanner(id);
    return await prisma.slideBanner.updateMany({
        where: {
            id
        },
        data:{
            title: json.title ?? slide?.title,
            description: json.description ?? slide?.description,
            shortDescription: json.shortDescription ?? slide?.shortDescription,
            createdBy: json.createdBy ?? slide?.createdBy,
            url: json.url ?? slide?.url,
            banners: json.banner ?? slide?.banners,
            status: json.status ?? slide?.status,
            kind: json.kind ?? slide?.kind,
        }
    })
}
export async function createSlideBanner(json: any) {
    return await prisma.slideBanner.create({
        data:{
            title: json.title,
            description: json.description,
            shortDescription: json.shortDescription,
            createdBy: json.createdBy,
            url: json.url,
            status: json.status,
            banners:json.banners,
            garageId: json.garageId ?? "2",
            kind: json.kind ?? "1"
        }
    })
}

export async function deleteSlideBanner(id:string) {
    return await prisma.slideBanner.update({
        where: {
            id
        },
        data:{
            status: 'DELETE'
        }
    })
}