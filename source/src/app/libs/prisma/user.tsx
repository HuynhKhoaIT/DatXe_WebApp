
import { generateUUID } from "@/utils/until";
import prisma from "../prismadb";
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
