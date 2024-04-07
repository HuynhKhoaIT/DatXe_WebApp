import { NextRequest, NextResponse } from "next/server";
import prisma from "../prismadb";
import { createCar } from "./car";
import { createCustomer, getMyCustomers } from "./customer";
import { randomString } from "@/utils";

export async function getOrders(garage: string, requestData: any) {
  try {
    let titleFilter = "";
    const searchText = requestData.s;
    if (searchText) {
      titleFilter = searchText;
    }
    let garageId = {};
    if (garage) {
      garageId = garage;
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
    let step = {};
    if (requestData.step) {
      step = Number(requestData.step);
    }
    let method = {};
    if (requestData.method) {
      method = requestData.method;
    }

    let customerId = {};
    if (Number(requestData.customerId)) {
      customerId = Number(requestData.customerId);
    }
    let carId = {};
    if (Number(requestData.carId)) {
      carId = Number(requestData.carId);
    }

    const [data, total] = await prisma.$transaction([
      prisma.order.findMany({
        take: take,
        skip: skip,
        orderBy: {
          id: "desc",
        },
        where: {
          status: {
            not: "DELETE",
          },
          createdById,
          step,
          customerId,
          carId,
          // method,
          garageId: garageId,
        },
        include: {
          serviceAdvisor: true,
          car: true,
          customer: true,
          orderDetails: {
            select: {
              productId: true,
              note: true,
              priceSale: true,
              price: true,
              subTotal: true,
              saleType: true,
              quantity: true,
              product: {
                select: {
                  name: true,
                  sku: true,
                  images: true,
                },
              },
            },
          },
        },
      }),
      prisma.order.count({
        where: {
          status: {
            not: "DELETE",
          },
          createdById,
          step,
          // method,
          customerId,
          carId,
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
export async function getMyOrders(requestData: any) {
  console.log(requestData.phoneNumber);
  try {
    const customers = await getMyCustomers(requestData.phoneNumber);
    let customerIdArray: [string] = ["0"];
    customers.forEach((c) => {
      customerIdArray.push(c.id);
    });
    if (customers) {
      let titleFilter = "";
      const searchText = requestData.s;
      if (searchText) {
        titleFilter = searchText;
      }
      let garageId = {};
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
      let step = {};
      if (requestData.step) {
        step = requestData.step;
      }
      let method = {};
      if (requestData.method) {
        method = requestData.method;
      }
      const [data, total] = await prisma.$transaction([
        prisma.order.findMany({
          take: take,
          skip: skip,
          orderBy: {
            id: "desc",
          },
          where: {
            status: {
              not: "DELETE",
            },
            createdById,
            step,
            method,
            customerId: {
              in: customerIdArray,
            },
          },
          include: {
            serviceAdvisor: true,
            car: true,
            customer: true,
            orderDetails: {
              select: {
                productId: true,
                note: true,
                priceSale: true,
                price: true,
                subTotal: true,
                saleType: true,
                quantity: true,
                product: {
                  select: {
                    name: true,
                    sku: true,
                    images: true,
                  },
                },
              },
            },
          },
        }),
        prisma.order.count({
          where: {
            status: {
              not: "DELETE",
            },
            createdById,
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
    }
  } catch (error) {
    return { error };
  }
}
export async function findOrder(id: string, request: any) {
  try {
    const rs = await prisma.order.findFirst({
      where: {
        slug: id,
      },
      include: {
        serviceAdvisor: true,
        car: true,
        customer: true,
        garage: true,
        orderDetails: {
          select: {
            productId: true,
            note: true,
            priceSale: true,
            price: true,
            subTotal: true,
            saleType: true,
            saleValue: true,
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    return rs;
  } catch (error) {
    return { error };
  }
}
export async function getOrderBySlug(slug: string) {
  try {
    const rs = await prisma.order.findFirst({
      where: {
        slug: slug,
      },
      include: {
        serviceAdvisor: true,
        car: true,
        customer: true,
        orderDetails: {
          select: {
            productId: true,
            note: true,
            priceSale: true,
            price: true,
            subTotal: true,
            saleType: true,
            saleValue: true,
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                images: true,
              },
            },
          },
        },
        garage: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return rs;
  } catch (error) {
    return { error };
  }
}
export async function getOrderByCode(code: string) {
  try {
    const rs = await prisma.order.findFirst({
      where: {
        code: code,
      },
      include: {
        serviceAdvisor: true,
        car: true,
        customer: true,
        orderDetails: {
          select: {
            productId: true,
            note: true,
            priceSale: true,
            price: true,
            subTotal: true,
            saleType: true,
            saleValue: true,
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                images: true,
              },
            },
          },
        },
        garage: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return rs;
  } catch (error) {
    return { error };
  }
}

export async function reportTrafictDashboard(
  dateStart: string,
  dateEnd: string,
  garageId: string
) {
  const order = await prisma.order.findMany({
    where: {
      OR: [
        {
          dateTime: {
            gte: new Date(dateStart),
          },
          garageId,
          status: {
            not: "DELETE",
          },
        },
        {
          dateTime: {
            gte: new Date(dateStart),
          },
          dateDone: {
            lte: new Date(dateEnd),
          },
          garageId,
          status: {
            not: "DELETE",
          },
        },
      ],
    },
  });
  return order;
}

export async function createOrder(json: any) {
  try {
    let customerId = "1";
    let garageId = "2";
    if (json.garageId) {
      garageId = json.garageId.toString();
    }
    if (json.detail[0].garageId) {
      garageId = json.detail[0].garageId.toString();
    }

    if (Number(json.customerId) == 0 && json.phoneNumber) {
      // check and create customer
      // check customer via phone number
      let phoneNumber = json.phoneNumber;
      if (phoneNumber) {
        const customerFind = await prisma.customer.findFirst({
          where: {
            phoneNumber: phoneNumber,
            status: "PUBLIC",
            garageId: garageId,
          },
        });
        if (customerFind) {
          customerId = customerFind.id;
        } else {
          let customerJson = {
            fullName: json.fullName,
            phoneNumber: json.phoneNumber,
            address: json.address,
            garageId: garageId,
            status: "PUBLIC",
            userId: json.userId,
          };
          let cusNew = await createCustomer(customerJson);
          if (cusNew) {
            customerId = cusNew.customer?.id.toString() ?? "0";
          }
        }
      }
      // end check customer
    } else {
      customerId = json.customerId;
    }
    //get carID
    let carId = json.carId;
    if (carId) {
      let carOrder = await prisma.car.findFirst({
        where: {
          id: carId,
          status: "PUBLIC",
        },
      });

      if (carOrder?.garageId != garageId) {
        const carNewData = JSON.parse(JSON.stringify(carOrder));
        carNewData.garageId = garageId;
        carNewData.customerId = customerId;
        delete carNewData.id;
        let carNew = await createCar(carNewData);
        carId = carNew?.car?.id;
      }
    } else {
      console.log("carAdmin");
      const carAdmin = await createCar({
        customerId: customerId,
        numberPlates: json.numberPlates,
        carBrandId: json.carBrandId,
        carNameId: json.carNameId,
        carYearId: json.carYearId,
        status: "PUBLIC",
        garageId: process.env.GARAGE_DEFAULT,
        userId: json.userId,
      });
      console.log("carNew2");
      const carNew = await createCar({
        customerId: customerId,
        numberPlates: json.numberPlates,
        carBrandId: json.carBrandId,
        carNameId: json.carNameId,
        carYearId: json.carYearId,
        status: "PUBLIC",
        garageId: garageId,
        userId: json.userId,
      });
      if (carNew) {
        carId = carNew.car?.id;
      }
    }
    let orderDetails: any = [];
    if (json.detail) {
      json.detail.forEach(function (data: any) {
        orderDetails.push({
          productId: data.productId,
          note: data.note,
          price: Number(data.price ?? 0),
          priceSale: Number(data.priceSale ?? 0),
          saleType: data.saleType,
          saleValue: data.saleValue.toString(),
          quantity: Number(data.quantity ?? 1),
          subTotal: Number(data.subTotal ?? 0),
          garageId: garageId ?? "1",
          createdBy: json.createdById ?? "1",
        });
      });
    }
    let orderCode = (await getCodeForOrder()) ?? "";
    let data = {
      code: orderCode,
      slug: orderCode.toLowerCase(),
      customerId: customerId,
      carId: carId,
      dateTime: json.dateTime ?? new Date(),
      customerRequest: json.customerRequest ?? "",
      customerNote: json.customerNote ?? "",
      note: json.note ?? "",
      priorityLevel: Number(json.priorityLevel ?? 1),
      orderCategoryId: json.orderCategoryId ?? "1",
      brandId: json.carBrandId,
      modelId: json.carNameId,
      yearId: json.carYearId,
      subTotal: Number(json.subTotal),
      total: Number(json.total),
      garageId: garageId,
      serviceAdvisorId: json.serviceAdvisorId ?? "1",
      createdById: json.createdById ?? "1",
      orderDetails: {
        createMany: {
          data: orderDetails,
        },
      },
    };
    const order = await prisma.order.create({
      data: data,
      include: {
        serviceAdvisor: true,
        car: true,
        customer: true,
        orderDetails: {
          select: {
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                images: true,
              },
            },
          },
        },
      },
    });
    return { order };
  } catch (error) {
    return { error };
  }
}
export async function createOrderClient(json: any) {
  try {
    let garageId = "2";
    if (json.garageId) {
      garageId = json.garageId;
    }
    if (json.detail[0].garageId) {
      garageId = json.detail[0].garageId;
    }
    let customerId = json.customerId;
    // check customer
    const customerInGarage = await prisma.customer.findFirst({
      where: {
        phoneNumber: json.phoneNumber,
        garageId,
        status: 'PUBLIC'
      }
    })
    if(!customerInGarage){
      const userNewGarage = await prisma.customer.create({
        data:{
          phoneNumber: json.phoneNumber,
          fullName: json.fullName,
          garageId: garageId
        }
      })
      if(userNewGarage){
        customerId = userNewGarage.id;
      }
    }else{
      customerId = customerInGarage.id
    }
    //get carID
    let carId = json.carId;
    const carInAdmin = await prisma.car.findFirst({
      where: {
        id: carId
      }
    })
    const carInGarage = await prisma.car.findFirst({
      where:{
        numberPlates: carInAdmin?.numberPlates,
        status: {
          not: 'DELETE'
        },
        garageId
      }
    });
    if(!carInGarage){
      const carNewGarage = await prisma.car.create({
        data:{
          numberPlates: carInAdmin?.numberPlates ?? '',
          carBrandId: carInAdmin?.carBrandId,
          carNameId: carInAdmin?.carNameId,
          carYearId: carInAdmin?.carYearId,
          garageId: garageId
        }
      });
      carId = carNewGarage.id;
    }

    let orderDetails: any = [];
    if (json.detail) {
      json.detail.forEach(function (data: any) {
        orderDetails.push({
          productId: data.productId,
          note: data.note,
          price: Number(data.price ?? 0),
          priceSale: Number(data.priceSale ?? 0),
          saleType: data.saleType,
          saleValue: data.saleValue.toString(),
          quantity: Number(data.quantity ?? 1),
          subTotal: Number(data.subTotal ?? 0),
          garageId: garageId ?? "1",
          createdBy: json.createdById.toString() ?? "1",
        });
      });
    }
    let orderCode = (await getCodeForOrder()) ?? "";
    let data = {
      code: orderCode,
      slug: orderCode.toLowerCase(),
      customerId: customerId,
      carId: carId,
      dateTime: json.dateTime ?? new Date(),
      customerRequest: json.customerRequest ?? "",
      customerNote: json.customerNote ?? "",
      note: json.note ?? "",
      priorityLevel: Number(json.priorityLevel ?? 1),
      orderCategoryId: json.orderCategoryId ?? "1",
      brandId: json.carBrandId,
      modelId: json.carNameId,
      yearId: json.carYearId,
      subTotal: Number(json.subTotal),
      total: Number(json.total),
      garageId: garageId,
      serviceAdvisorId: json.serviceAdvisorId ?? "1",
      createdById: json.createdById.toString() ?? "1",
      orderDetails: {
        createMany: {
          data: orderDetails,
        },
      },
    };
    // return data;
    const order = await prisma.order.create({
      data: data,
      include: {
        serviceAdvisor: true,
        car: true,
        customer: true,
        orderDetails: {
          select: {
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                images: true,
              },
            },
          },
        },
      },
    });
    return { order };
  } catch (error) {
    return { error };
  }
}

export async function updateOrder(id: string, json: any) {
  try {
    let customerId = "1";
    let carId = "1";
    if ((!json.customerId || json.customerId == "0") && json.phoneNumber) {
      // check and create customer
      // check customer via phone number
      let phoneNumber = json.phoneNumber;
      if (phoneNumber) {
        const customerFind = await prisma.customer.findFirst({
          where: { phoneNumber: phoneNumber },
        });
        if (customerFind) {
          customerId = customerFind.id;
        } else {
          let cusNew = await createCustomer(json);
          if (cusNew) {
            customerId = cusNew.customer?.id ?? "0";
          }
        }
      }
      // end check customer
    } else {
      customerId = json.customerId;
    }
    if (!json.carId) {
      // begin check isset car
      let numberPlates = json.numberPlates;
      if (numberPlates) {
        const carFind = await prisma.car.findFirst({
          where: { numberPlates: numberPlates },
        });
        if (carFind) {
          carId = carFind.id;
        } else {
          let jsonCar = json;
          jsonCar.customerId = customerId;
          let carNew = await createCar(jsonCar);
          if (carNew) {
            carId = carNew?.car?.id ?? " 0";
          }
        }
      }
      // end check car
    } else {
      carId = json.carId;
    }
    let orderDetails: any = [];
    if (json.detail) {
      json.detail.forEach(function (data: any) {
        orderDetails.push({
          productId: data.productId,
          note: data.note,
          price: Number(data.price ?? 0),
          priceSale: Number(data.priceSale ?? 0),
          saleType: data.saleType,
          saleValue: data.saleValue.toString(),
          quantity: Number(data.quantity ?? 1),
          subTotal: Number(data.subTotal ?? 0),
          garageId: json.garageId ?? "1",
          createdBy: json.createdBy ?? "1",
        });
      });
    }

    const order = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        code: (await codeGeneration(json.garageId)).toString(),
        customer: {
          connect: {
            id: customerId,
          },
        },
        car: {
          connect: {
            id: carId,
          },
        },
        dateTime: json.dateTime,
        customerRequest: json.customerRequest,
        customerNote: json.customerNote,
        note: json.note,
        priorityLevel: Number(json.priorityLevel),
        orderCategory: {
          connect: {
            id: json.orderCategoryId,
          },
        },
        brandId: json.carBrandId,
        modelId: json.carNameId,
        yearId: json.carYearId,
        step: Number(json.step),
        subTotal: Number(json.subTotal),
        total: Number(json.total),
        garage: {
          connect: {
            id: json.garageId,
          },
        },
        serviceAdvisor: {
          connect: {
            id: json.serviceAdvisorId,
          },
        },
        orderDetails: {
          deleteMany: {},
          createMany: {
            data: orderDetails,
          },
        },
      },
      include: {
        serviceAdvisor: true,
        car: true,
        customer: true,
        orderDetails: {
          select: {
            productId: true,
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                images: true,
              },
            },
          },
        },
      },
    });
    return { order };
  } catch (error) {
    return { error };
  }
}
export async function updateOrderStatus(id: string, status: string) {
  const order = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  return order;
}
export async function updateOrderStep(
  id: string,
  step: any,
  cancelReason: string
) {
  const order = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      step: Number(step),
      cancelReason,
    },
  });
  return order;
}
export async function codeGeneration(garageId: string) {
  let num = "1";
  const order = await prisma.order.findFirst({
    where: {
      garageId: garageId,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  if (!order) {
    return num.padStart(6, "0");
  } else {
    num = (parseInt(order.code) + 1).toString();
    return num.padStart(6, "0");
  }
}

export async function getCodeForOrder() {
  let str = randomString(9).toUpperCase();
  const c = await getOrderBySlug(str);
  if (!c) {
    return str;
  }
  await getCodeForOrder();
}
