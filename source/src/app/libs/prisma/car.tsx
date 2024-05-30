import { convertToPlatesNumber, generateUUID } from "@/utils/until";
import prisma from "../prismadb";
import { getCarModelById } from "./carModel";
import {createCustomer, getCustomerByPhone } from "./customer";
import { getGarageByDlbdId } from "./garage";
export async function createCar(json: any) {
  try {
    let platesNumber = (json.numberPlates);
    // check biển số tồn tại
    const checkIsset = await getCarsByPlates(platesNumber ?? "",json.garageId)
    
    if( json.garageId != '2' && checkIsset.length > 0){
      return {
        status: "error",
        message: "Đã tồn tại biển số"
      }
    }
    // end check biển số
    const car = await prisma.car.create({
      data: {
        uuId: generateUUID(),
        customerId: json.customerId,
        numberPlates: platesNumber ?? "",
        carBrandId: json.carBrandId,
        carNameId: json.carNameId,
        carYearId: json.carYearId,
        carStyleId: json.carStyleId,
        color: json.color,
        vinNumber: json.vinNumber,
        machineNumber: json.machineNumber,
        description: json.description,
        maintenanceDeadline: json.maintenanceDeadline,
        registrationDeadline: json.registrationDeadline,
        materialInsuranceDeadline: json.materialInsuranceDeadline,
        civilInsuranceDeadline: json.civilInsuranceDeadline,
        status: json.status,
        garageId: json.garageId,
        userId: json.userId,
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
  if (requestData.garageId!="2") {
    garageId = requestData.garageId;
  }
  let customerId = {};
  if (requestData.customerId) {
    customerId = requestData.customerId;
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
  if (requestData.carBrandId) {
    carBrandId = requestData.carBrandId;
  }
  let carNameId = {};
  if (requestData.carNameId) {
    carNameId = requestData.carNameId;
  }
  let carYearId = {};
  if (requestData.carYearId) {
    carYearId = requestData.carYearId;
  }
  let carStyleId = {};
  if (requestData.carStyleId) {
    carStyleId = requestData.carStyleId;
  }
  let userId = {};
  if (requestData.userId) {
    userId = requestData.userId;
  }
  const [cars, total] = await prisma.$transaction([
    prisma.car.findMany({
      take: take,
      skip: skip,
      orderBy: {
        createdAt: "desc",
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
            garageId,
            userId,
            status: "PUBLIC",
          },
        ],
      },
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

export async function updateCar(carId: string,dataInput:any) {
  const car = await showCar(carId);
  const rs = await prisma.car.update({
    where:{
      id: carId
    },
    data:{
      customerId: dataInput.customerId,
      numberPlates: dataInput.numberPlates ?? car.numberPlates,
      carBrandId: dataInput.carBrandId ?? car.carBrandId,
      carNameId: dataInput.carNameId ?? car.carNameId,
      carYearId: dataInput.carYearId ?? car.carYearId,
      carStyleId: dataInput.carStyleId ?? car.carStyleId,
      color: dataInput.color ?? car.color,
      vinNumber: dataInput.vinNumber ?? car.vinNumber,
      machineNumber: dataInput.machineNumber ?? car.machineNumber,
      description: dataInput.description ?? car.description,
      maintenanceDeadline: dataInput.maintenanceDeadline ?? car.maintenanceDeadline,
      registrationDeadline: dataInput.registrationDeadline ?? car.registrationDeadline,
      materialInsuranceDeadline: dataInput.materialInsuranceDeadline ?? car.materialInsuranceDeadline,
      civilInsuranceDeadline: dataInput.civilInsuranceDeadline ?? car.civilInsuranceDeadline,
      status: dataInput.status ?? car.status,
      garageId: dataInput.garageId ?? car.garageId,
      userId: dataInput.userId ?? car.userId,
    }
  })
  let carRs = JSON.parse(JSON.stringify(rs));
  let br = await getCarModelById(carRs.carBrandId);
  let md = await getCarModelById(carRs.carNameId);
  let y = await getCarModelById(carRs.carYearId);
  carRs.brandName = br;
  carRs.modelName = md;
  carRs.yearName = y;
  return carRs;
}

export async function getCarsByPlates(titleFilter: string, garageId: string) {
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
  const rs = {
    garageId: process.env.GARAGE_DEFAULT,
    status: "PUBLIC",
    userId: requestData?.userId.toString(),
  };

  return await getCars(rs);
}

export async function createMyCars(json: any) {
  const customer = await getCustomerByPhone(
    json.phoneNumber,
    process.env.GARAGE_DEFAULT?.toString() ?? ""
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
    maintenanceDeadline: json.maintenanceDeadline,
    registrationDeadline: json.registrationDeadline,
    materialInsuranceDeadline: json.materialInsuranceDeadline,
    civilInsuranceDeadline: json.civilInsuranceDeadline,
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
        garage.id
      );
      if (customer) {
        const car = await prisma.car.findFirst({
          where: {
            status: "PUBLIC",
            numberPlates: {
              contains: carData.licensePlates,
            },
            garageId: garage.id,
          },
        });
        if (car) {
          return car;
        } else {
          const carNew = await prisma.car.create({
            data: {
              customerId: customer.id,
              numberPlates: carData.licensePlates,
              description: carData.description,
              garageId: garage.id,
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

export async function setCarDefault(uuId: string) {
  const carDefault = await prisma.car.findFirst({
    where: {
      garageId: "2",
      uuId: uuId,
    },
  });

  await prisma.car.updateMany({
    where: {
      garageId: "2",
      userId: carDefault?.userId,
    },
    data: {
      isDefault: false,
    },
  });
  const car = await prisma.car.updateMany({
    where: {
      garageId: "2",
      uuId: uuId,
    },
    data: {
      isDefault: true,
    },
  });
  return car;
}

export async function showCar(id:string) {
  return await prisma.car.findFirstOrThrow({
    where: {
      id
    }
  })
}

export async function updateCustomerAndCar(dataInput:any) {
  const customer = await getCustomerByPhone(dataInput.phoneNumber,dataInput.garageId);
  if(customer){
    dataInput.customerId = customer.id
  }else{
    const newCustomer = await createCustomer(dataInput);
    dataInput.customerId = newCustomer.customer?.id;
  }
  return await updateCar(dataInput.carId,dataInput);
}