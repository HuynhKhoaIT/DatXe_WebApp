import { randomString } from "@/utils";
import prisma from "../prismadb";


export async function gets(requestData: any) {
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
    let garageId = {};
    if (requestData.garageId!="2" && requestData.garageId!=null) {
        garageId = requestData.garageId;
    }
    const [dataRs, total] = await prisma.$transaction([
        prisma.bookingttdk.findMany({
          take: take,
          skip: skip,
          orderBy: {
            createdAt: "desc",
          },
          where: {
            AND: [
              {
                garageId,
              },
            ],
          },
          include: {
            garage: true
          },
        }),
        prisma.bookingttdk.count({
          where: {
            AND: [
              {
                garageId
              },
            ],
          },
        }),
      ]);
    const totalPage = Math.ceil(total / limit);
    return {
        data: dataRs,
        total: total,
        currentPage: currentPage,
        limit: limit,
        totalPage: totalPage,
        status: 200,
    };
}

export async function create(json: any) {
    try {
        const dataInput = {
            code: await getCode() as string,
            licensePlates: json.licensePlates,
            phone: json.phone,
            fullname: json.fullname,
            dateSchedule: new Date(json.dateSchedule).toISOString(),
            time: json.time,
            garageId: json.garageId,
            note: json.note,
        }
        return await prisma.bookingttdk.create({
            data: dataInput
        });
    }catch (error) {
        return { error };
    }
}
export async function find(id: string) {
    return await prisma.bookingttdk.findFirst({
        where: {
            id
        }
    })
}

export async function updated(id: string,data:any) {
    const b = await find(id);
    return await prisma.bookingttdk.update({
        where: {
            id,
        },
        data: {
            licensePlates: data.licensePlates ?? b?.licensePlates,
            phone: data.phone ?? b?.phone,
            fullname: data.fullname ?? b?.fullname,
            dateSchedule: new Date(data.dateSchedule).toISOString() ?? b?.dateSchedule,
            time: data.time ?? b?.time,
            garageId: data.garageId ?? b?.garageId,
            note: data.note ?? b?.note,
            isDeleted: data.isDeleted ?? b?.isDeleted
        }
    })
}

export async function deleted(id: string) {
    return await prisma.bookingttdk.update({
        where: {
            id
        },
        data: {
            isDeleted: true
        }
    })
}
export async function getByCode(code:string) {
    return await prisma.bookingttdk.findFirst({
        where: {
            code
        }
    })
}

async function getCode() {
    let str = randomString(9).toLowerCase();
    const c = await getByCode(str);
    if (!c) {
      return str;
    }
    await getCode();
}