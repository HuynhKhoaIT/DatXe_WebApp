
import { generateUUID } from "@/utils/until";
import prisma from "../prismadb";

export async function getMyAccount(id: string) {
  return await prisma.user.findFirstOrThrow({
    where:{
      id
    }
  })
}

export async function getUsers(requestData: any) {
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
  let phoneNumber = "";
  if (requestData.phoneNumber) {
    phoneNumber = requestData.phoneNumber;
  }
  const [data, total] = await prisma.$transaction([
    prisma.user.findMany({
      take: take,
      skip: skip,
      orderBy: {
        id: "desc",
      },
      where:{
        AND:[
          {
            phoneNumber: {
              contains: phoneNumber,
            },
            status: 'PUBLIC'
          }
        ]
      }
    }),
    prisma.user.count({
      where: {
        status: {
          not: "DELETE",
        },
      },
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
}

export async function updateUser(dataInput:any) {
  const user = await getMyAccount(dataInput.id);
  if(user){
    const userRs = await prisma.user.update({
      where:{
        id: dataInput.id
      },
      data:{
        fullName: dataInput.fullName ?? user.fullName,
        email: dataInput.email ?? user.email,
        avatar: dataInput.avatar ?? user.avatar,
        cityId: Number(dataInput.cityId) ?? user.cityId,
        districtId: Number(dataInput.districtId) ?? user.districtId,
        wardId: Number(dataInput.wardId) ?? user.wardId,
        address: dataInput.address ?? user.address,
        dob: dataInput.dob ?? user.dob,
        description: dataInput.description ?? user.description,
        sex: dataInput.sex ?? user.sex,
        garageId: dataInput.garageId ?? user.garageId,
      }
      
    });
    return userRs;
  }
  return;
}

export async function registerUser(json: any) {
  try {
    const userRs = await prisma.user.create({
      data: {
        id: (json.id),
        uuId: generateUUID(),
        fullName: json.fullName,
        email: json.email ?? '',
        phoneNumber: json.phoneNumber,
        sex: 'FEMALE',
        garageId: (json.garageId).toString() ?? "2",
        status: 'PUBLIC',
        role: json.role ?? 'CUSTOMER'
      }
    });
    return { userRs };
  } catch (error) {
    return { error };
  }
}
