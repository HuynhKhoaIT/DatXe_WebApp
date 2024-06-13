import { createBitlyGarage } from "@/utils/garage";
import prisma from "../prismadb";
import { randomString } from "@/utils";

export async function getGarages(requestData: any) {
  try {
    let currentPage = 1;
    let take = 10;
    let limit = Number(requestData.limit);
    let page = requestData.page;
    let includes: string[] = [""];
    if(requestData.includes){
      includes = requestData.includes.split(",");
    }
    if (page) {
      currentPage = Number(page);
    }
    if (limit) {
      take = Number(limit);
    } else {
      limit = 10;
    }
    let garageId = 0;
    if (requestData.garageId) {
      garageId = requestData.garageId;
    }

    let s = '';
    if(requestData.s){
      s = requestData.s;
    }

    let include:any = {
      amenities: false
    };

    if(includes.includes("amenities")){
      include.amenities =  {
        include: {
          amenities: true,
        },
      }
    }

    let status:any = {
      not: "DELETE",
    }
    if(requestData.status){
      status = requestData.status
    }

    let where: any = {
      OR: [
        {
          status,
          routeId: garageId ? Number(garageId) : {},
          name: {
            contains: s
          }
        },
        {
          status,
          routeId: garageId ? Number(garageId) : {},
          phoneNumber: {
            contains: s
          }
        },
        {
          status,
          routeId: garageId ? Number(garageId) : {},
          code: {
            contains: s
          }
        },
        {
          status,
          routeId: garageId ? Number(garageId) : {},
          shortName: {
            contains: s
          }
        },
      ],
    };
    const skip = take * (currentPage - 1);
    const [data, total] = await prisma.$transaction([
      prisma.garage.findMany({
        take: take,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
        where,
        include: include,
      }),
      prisma.garage.count({
        where,
      }),
    ]);
    return {
      data: data,
      total: total,
      currentPage: currentPage,
      limit: limit,
      totalPage: Math.ceil(total / limit),
      status: 201,
    };
  } catch (error) {
    return { error };
  }
}

export async function autoComplete(requestData: any) {
  let s = '';
  if(requestData.s){
    s = requestData.s;
  }
  return await prisma.garage.findMany({
    select:{
      id: true,
      name: true,
      phoneNumber: true
    },
    take: 15,
    orderBy: {
      createdAt: 'desc'
    },
    where:{
      OR:[
        {
          name: {
            contains: s
          },
          status: {
            not: 'DELETE'
          }
        },
        {
          code: {
            contains: s
          },
          status: {
            not: 'DELETE'
          }
        },
        {
          phoneNumber: {
            contains: s
          },
          status: {
            not: 'DELETE'
          }
        }
      ]
    }
  })
}

export async function getGarageIdByDLBDID(dlbdId: number) {
  const rs = await prisma.garage.findFirst({
    where: {
      routeId: Number(dlbdId),
      status: {
        not: "DELETE",
      },
    },
  });
  if (rs) {
    return rs.id;
  }
  return 0;
}

export async function showGarage(id: string) {
  const garage = await prisma.garage.findFirst({
    where: {
      id: id,
    },
    include: {
      amenities: {
        include: {
          amenities: true,
        },
      },
    },
  });
  return garage;
}

export async function getGarageByDlbdId(garageId: number) {
  return await prisma.garage.findFirst({
    where: {
      routeId: Number(garageId),
      // status: "PUBLIC" || "PENDING",
    },
  });
}

export async function createGarage(data: any) {
  try {
    let amenitiesArr: any = [];
    if (data.amenities) {
      data.amenities.forEach(function (id: number) {
        amenitiesArr.push({
          assignedBy: "Admin",
          assignedAt: new Date(),
          amenities: {
            connect: {
              id: Number(id.toString()),
            },
          },
        });
      });
    }
    const code = await getRandomCodeForGarage();
    const garage = await prisma.garage.create({
      data: {
        routeId: Number(data.routeId),
        code: code ?? "",
        name: data.name,
        shortName: data.shortName,
        logo: data.logo,
        banner: data.banner,
        email: data.email,
        social: data.social,
        photos: data.photos,
        phoneNumber: data.phoneNumber,
        website: data.website,
        address: data.address,
        status: data.status,
        description: data.description,
        amenities: {
          create: amenitiesArr,
        },
        wifiInfo: data.wifiInfo,
        qrCodeBank: data.qrCodeBank,
      },
      include: {
        cars: true,
        amenities: true,
      },
    });
    return garage;
  } catch (error) {
    return { error };
  }
}

export async function updateGarage(id: string, data: any) {
  try {
    let updateData = {
      routeId: Number(data.routeId),
      code: data.code,
      name: data.name,
      shortName: data.shortName,
      logo: data.logo,
      banner: data.banner,
      photos: data.photos,
      social: data.social,
      email: data.email,
      phoneNumber: data.phoneNumber,
      website: data.website,
      address: data.address,
      status: data.status,
      description: data.description,
      provinceId: Number(data.provinceId) ?? 1,
      wardId: Number(data.wardId) ?? 1,
      districtId: Number(data.districtId) ?? 1,
      amenities: {
        deleteMany: {},
        create: data.amenities.map((id: string) => ({
          assignedBy: "Admin",
          assignedAt: new Date(),
          amenities: {
            connect: {
              id: id,
            },
          },
        })),
      },
      wifiInfo: data.wifiInfo,
      qrCodeBank: data.qrCodeBank,
    };
    const updatedPost = await prisma.garage.update({
      where: {
        id: id.toString(),
      },
      data: updateData,
    });
    return { data: updatedPost };
  } catch (error) {
    return { error };
  }
}

export async function deleteGarage(id: string) {
  try {
    const garage = await prisma.garage.delete({
      where: { id: id },
    });
    return { garage };
  } catch (error) {
    return { error };
  }
}

export async function getRandomCodeForGarage() {
  let str = randomString(5).toLocaleUpperCase();
  const c = await getGarageByCode(str);
  if (!c) {
    return str;
  }
  await getRandomCodeForGarage();
}

export async function getGarageByCode(code: string) {
  try {
    const rs = await prisma.garage.findFirst({
      where: {
        code: code,
      },
      include: {
        amenities: {
          include: {
            amenities: true,
          },
        },
      },
    });
    return rs;
  } catch (error) {
    return { error };
  }
}

export async function createQrGarage(garageId: string) {
  const garage = await showGarage(garageId);
  const createBitly = await createBitlyGarage(garage);

  if (createBitly) {
    return await prisma.garage.update({
      where: {
        id: garageId,
      },
      data: {
        bitlyUrl: createBitly.link,
      },
    });
  }
  return {};
}
