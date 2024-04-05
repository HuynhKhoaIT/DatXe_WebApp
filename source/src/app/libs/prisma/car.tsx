import { convertToPlatesNumber, generateUUID } from "@/utils/until";
import prisma from "../prismadb";
import { getCarModelById } from "./carModel";
import { getCustomerByPhone } from "./customer";
import { getGarageByDlbdId } from "./garage";
export async function createCar(json: any) {
  try {
    let platesNumber = convertToPlatesNumber(json.numberPlates);
    const car = await prisma.car.create({
      data: {
        uuId: generateUUID(),
        customerId: Number(json.customerId),
        numberPlates: platesNumber ?? '',
        carBrandId: Number(json.carBrandId),
        carNameId: Number(json.carNameId),
        carYearId: Number(json.carYearId),
        carStyleId: json.carStyleId,
        color: json.color,
        vinNumber: json.vinNumber,
        machineNumber: json.machineNumber,
        description: json.description,
        status: json.status,
        garageId: Number(json.garageId),
        userId: Number(json.userId),
      },
      include: {
        customer: true,
        carStyle: true,
      },
    });
    return { car };
  } catch (error) {
    return { error };
  }
}

export async function getCars(requestData: any) {
  let currentPage = 1;
  let take = 10;
  let limit = 10;
  if (requestData.limit) {
    take = parseInt(requestData.limit);
  }
  let page = requestData.page;
  if (page) {
    currentPage = Number(page);
  }
  const skip = take * (currentPage - 1);
  let titleFilter = "";
  if (requestData.s) {
    titleFilter = requestData.s;
  }
  let garageId = {};
  if (requestData.garageId) {
    garageId = requestData.garageId;
  }
  let customerId = {};
  if (requestData.customerId) {
    customerId = Number(requestData.customerId);
  }
  let status = {
    contains: "PUBLIC",
  };
  if (requestData.status == "NOT_DELETE") {
    let status = {
      not: "DELETE",
    };
  } else if (requestData.status) {
    let status = {
      contains: requestData.status,
    };
  }
  let carBrandId = {};
  if(requestData.carBrandId){
    carBrandId = Number(requestData.carBrandId);
  }
  let carNameId = {};
  if(requestData.carNameId){
    carNameId = Number(requestData.carNameId);
  }
  let carYearId = {};
  if(requestData.carYearId){
    carYearId = Number(requestData.carYearId);
  }
  let carStyleId = {};
  if(requestData.carStyleId){
    carStyleId = Number(requestData.carStyleId);
  }
  let userId = {};
  if(requestData.userId){
    userId= Number(requestData.userId)
  }
  const [cars, total] = await prisma.$transaction([
    prisma.car.findMany({
      take: take,
      skip: skip,
      orderBy: {
        id: "desc",
      },
      where: {
        AND: [
          {
            numberPlates: {
              contains: titleFilter,
            },
            customerId: customerId,
            carBrandId,
            carNameId,
            carYearId,
            carStyleId,
            garageId,
            userId,
            status: "PUBLIC",
          },
        ],
      },
      include: {
        customer: true,
        carStyle: true,
      },
    }),
    prisma.car.count({
      where: {
        AND: [
          {
            numberPlates: {
              contains: titleFilter,
            },
            customerId: customerId,
            carBrandId,
            carNameId,
            carYearId,
            carStyleId,
            garageId: garageId,
            status: "PUBLIC",
            userId
          },
        ],
      }
    }),
  ]);
  let carRs = JSON.parse(JSON.stringify(cars));
  for (const car of carRs) {
    let br = await getCarModelById(car.carBrandId);
    let md = await getCarModelById(car.carNameId);
    let y = await getCarModelById(car.carYearId);
    car.brandName = br;
    car.modelName = md;
    car.yearName = y;
  }
  const totalPage = Math.ceil(total / limit);
  return {
    data: carRs,
    total: total,
    currentPage: currentPage,
    limit: limit,
    totalPage: totalPage,
    status: 200,
  };
}

export async function getCarsByPlates(titleFilter:string,garageId: number) {
  return await prisma.car.findMany({
    take: 10,
    orderBy: {
      id: "desc",
    },
    where: {
      AND: [
        {
          numberPlates: {
            contains: titleFilter,
          },
          garageId: garageId,
          status: "PUBLIC",
        },
      ],
    },
  });
}

export async function getMyCars(requestData: any) {
  const customer = await getCustomerByPhone(
    requestData.phoneNumber,
    Number(process.env.GARAGE_DEFAULT)
  );
  const rs = {
    garageId: Number(process.env.GARAGE_DEFAULT),
    customerId: customer?.id,
    status: "PUBLIC",
  };

  return await getCars(rs);
}

export async function createMyCars(json: any) {
  const customer = await getCustomerByPhone(
    json.phoneNumber,
    Number(process.env.GARAGE_DEFAULT)
  );

  const data = {
    customerId: Number(customer?.id),
    numberPlates: json.numberPlates,
    carBrandId: Number(json.carBrandId),
    carNameId: Number(json.carNameId),
    carYearId: Number(json.carYearId),
    carStyleId: json.carStyleId,
    color: json.color,
    vinNumber: json.vinNumber,
    machineNumber: json.machineNumber,
    description: json.description,
    status: json.status,
    garageId: Number(process.env.GARAGE_DEFAULT),
  };

  const car = await createCar(data);
  let carRs = JSON.parse(JSON.stringify(car.car));
  let br = await getCarModelById(carRs.carBrandId);
  let md = await getCarModelById(carRs.carNameId);
  let y = await getCarModelById(carRs.carYearId);
  carRs.brandName = br;
  carRs.modelName = md;
  carRs.yearName = y;
  return carRs;
}

export async function syncCarFromDLBD(carData: any, customerData: any) {
  try {
    const garage = await getGarageByDlbdId(carData.garage_id);
    if (garage) {
      const customer = await getCustomerByPhone(
        customerData.phone_number,
        Number(garage.id)
      );
      if (customer) {
        const car = await prisma.car.findFirst({
          where: {
            status: "PUBLIC",
            numberPlates: {
              contains: carData.licensePlates,
            },
            garageId: Number(garage.id),
          },
        });
        if (car) {
          return car;
        } else {
          const carNew = await prisma.car.create({
            data: {
              customerId: Number(customer.id),
              numberPlates: carData.licensePlates,
              description: carData.description,
              garageId: Number(garage.id),
            },
          });
          return carNew;
        }
      }
    }
  } catch (error) {
    return { error };
  }
}


