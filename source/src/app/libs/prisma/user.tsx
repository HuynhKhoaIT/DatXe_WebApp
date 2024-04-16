
import { generateUUID } from "@/utils/until";
import prisma from "../prismadb";

export async function getMyAccount(id: string) {
  return await prisma.user.findFirstOrThrow({
    where:{
      id
    }
  })
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
        cityId: dataInput.cityId ?? user.cityId,
        districtId: dataInput.districtId ?? user.districtId,
        wardId: dataInput.wardId ?? user.wardId,
        address: dataInput.address ?? user.address,
        dob: dataInput.dob ?? user.dob,
        description: dataInput.description ?? user.description,
        sex: dataInput.sex ?? user.sex,
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
        garageId: (json.garageId) ?? 2,
        status: 'PUBLIC',
        role: json.role ?? 'CUSTOMER'
      }
    });
    return { userRs };
  } catch (error) {
    return { error };
  }
}
