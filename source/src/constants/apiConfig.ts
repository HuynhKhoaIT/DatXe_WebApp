import { CHECK_PHONE_NUMBER } from "@/utils/constants/endpoints";
import { apiGuest, apiUrl } from ".";

const baseHeader = {
  "Content-Type": "application/json",
};

const multipartFormHeader = {
  "Content-Type": "multipart/form-data",
};

const apiConfig = {
  account: {
    login: {
      baseURL: `https://v2.dlbd.vn/api/login`,
      method: "POST",
      headers: baseHeader,
    },
    getAccountDlbd: {
      baseURL: `${apiUrl}api/account`,
      method: "GET",
      headers: baseHeader,
    },
    getProfile: {
      baseURL: `${apiUrl}api/client/account`,
      method: "GET",
      headers: baseHeader,
    },
    updateProfile: {
      baseURL: `${apiUrl}v1/account/update_admin`,
      method: "PUT",
      headers: baseHeader,
    },
    getAccount: {
      baseURL: `${apiUrl}api/client/account`,
      method: "GET",
      headers: baseHeader,
    },
    update: {
      baseURL: `${apiUrl}api/client/account`,
      method: "PUT",
      headers: baseHeader,
    },
  },
  user: {
    CheckPhone: {
      baseURL: `${CHECK_PHONE_NUMBER}/:phone`,
      method: "GET",
      headers: baseHeader,
    },
    CheckOtp: {
      baseURL: `${apiUrl}api/sms/check-otp`,
      method: "POST",
      headers: baseHeader,
    },
    GenOTP: {
      baseURL: `${apiUrl}api/sms/send-otp`,
      method: "POST",
      headers: baseHeader,
    },
    register: {
      baseURL: `${apiUrl}api/user/register`,
      method: "POST",
      headers: baseHeader,
    },
  },
  file: {
    upload: {
      baseURL: `${apiUrl}api/upload`,
      method: "POST",
      headers: multipartFormHeader,
    },
  },
  products: {
    getList: {
      baseURL: `${apiUrl}api/products`,
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      baseURL: `${apiUrl}api/products/:id`,
      method: "GET",
      headers: baseHeader,
    },
    getReviewById: {
      baseURL: `${apiUrl}api/reviews/product/:id`,
      method: "GET",
      headers: baseHeader,
    },
    getRelate: {
      baseURL: `${apiUrl}api/products/related-products/:id`,
      method: "GET",
      headers: baseHeader,
    },
    getProductHot: {
      baseURL: `${apiUrl}api/products`,
      method: "GET",
      headers: baseHeader,
    },
    getServiceHot: {
      baseURL: `${apiUrl}api/products`,
      method: "GET",
      headers: baseHeader,
    },
  },
  category: {
    getList: {
      baseURL: `${apiUrl}api/admin/product-category`,
      method: "GET",
      headers: baseHeader,
    },
    orderCategory: {
      baseURL: `${apiUrl}api/order-category`,
      method: "GET",
      headers: baseHeader,
    },
  },
  posts: {
    getList: {
      baseURL: `${apiUrl}api/posts`,
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      baseURL: `${apiUrl}api/posts/:id`,
      method: "GET",
      headers: baseHeader,
    },
  },
  car: {
    getList: {
      baseURL: `${apiUrl}api/client/cars`,
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      baseURL: `${apiUrl}api/client/cars/:id`,
      method: "GET",
      headers: baseHeader,
    },
    delete: {
      baseURL: `${apiUrl}api/client/cars/:id`,
      method: "DELETE",
      headers: baseHeader,
    },
    update: {
      baseURL: `${apiUrl}api/client/cars/:id`,
      method: "PUT",
      headers: baseHeader,
    },
    create: {
      baseURL: `${apiUrl}api/client/cars`,
      method: "POST",
      headers: baseHeader,
    },
    setDefaultCar: {
      baseURL: `${apiUrl}api/client/cars/set-default`,
      method: "POST",
      headers: baseHeader,
    },
    getBrands: {
      baseURL: `${apiUrl}api/car-model`,
      method: "GET",
      headers: baseHeader,
    },
  },

  amentity: {
    getList: {
      baseURL: `${apiUrl}api/admin/amentity`,
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      baseURL: `${apiUrl}api/admin/amentity/:id`,
      method: "GET",
      headers: baseHeader,
    },
    create: {
      baseURL: `${apiUrl}api/admin/amentity`,
      method: "POST",
      headers: baseHeader,
    },
    update: {
      baseURL: `${apiUrl}api/admin/amentity/:id`,
      method: "PUT",
      headers: baseHeader,
    },
    // getBrandCar:{
    //     baseURL: `${apiUrl}api/cars/:id`,
    //     method: 'GET',
    //     headers: baseHeader,
    // }
  },
  garage: {
    getList: {
      baseURL: `${apiUrl}api/client/cars`,
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      baseURL: `${apiUrl}api/client/cars/:id`,
      method: "GET",
      headers: baseHeader,
    },
    getReviews: {
      baseURL: `${apiUrl}api/reviews/garage/:id`,
      method: "GET",
      headers: baseHeader,
    },
  },
  banner: {
    getList: {
      baseURL: `${apiUrl}api/slide-banner`,
      method: "GET",
      headers: baseHeader,
    },
  },
  expert: {
    getList: {
      baseURL: `${apiUrl}api/garage`,
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      baseURL: `${apiUrl}api/garage/:id`,
      method: "GET",
      headers: baseHeader,
    },
    create: {
      baseURL: `${apiUrl}api/garage`,
      method: "POST",
      headers: baseHeader,
    },
    update: {
      baseURL: `${apiUrl}api/garage/:id`,
      method: "PUT",
      headers: baseHeader,
    },
  },
  order: {
    getList: {
      baseURL: `${apiUrl}api/orders`,
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      baseURL: `${apiUrl}api/orders/:id`,
      method: "GET",
      headers: baseHeader,
    },
    getOrderDLBD: {
      baseURL: `https://v2.dlbd.vn/api/v3/app/order-detail/:id`,
      method: "GET",
      headers: baseHeader,
    },
  },
  notifications: {
    getList: {
      baseURL: `${apiUrl}api/notification`,
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      baseURL: `${apiUrl}api/notification/:id`,
      method: "GET",
      headers: baseHeader,
    },
  },
  admin: {
    ttdk: {
      getList: {
        baseURL: `${apiUrl}api/admin/booking-ttdk`,
        method: "GET",
        headers: baseHeader,
      },
      delete: {
        baseURL: `${apiUrl}api/admin/booking-ttdk/:id`,
        method: "DELETE",
        headers: baseHeader,
      },
      getById: {
        baseURL: `${apiUrl}api/admin/booking-ttdk/:id`,
        method: "GET",
        headers: baseHeader,
      },
      udpate: {
        baseURL: `${apiUrl}api/admin/booking-ttdk/:id`,
        method: "PUT",
        headers: baseHeader,
      },
    },
    products: {
      getList: {
        baseURL: `${apiUrl}api/admin/products`,
        method: "GET",
        headers: baseHeader,
      },
      getListDlbd: {
        baseURL: `${apiUrl}api/admin/products/dlbd`,
        method: "GET",
        headers: baseHeader,
      },
      getById: {
        baseURL: `${apiUrl}api/admin/products/:id`,
        method: "GET",
        headers: baseHeader,
      },
      create: {
        baseURL: `${apiUrl}api/admin/products`,
        method: "POST",
        headers: baseHeader,
      },
      update: {
        baseURL: `${apiUrl}api/admin/products/:id`,
        method: "PUT",
        headers: baseHeader,
      },
      delete: {
        baseURL: `${apiUrl}api/admin/products/:id`,
        method: "DELETE",
        headers: baseHeader,
      },
      productHot: {
        baseURL: `${apiUrl}api/admin/home-page`,
        method: "GET",
        headers: baseHeader,
      },
      homePagedeleteItem: {
        baseURL: `${apiUrl}api/admin/home-page/:id`,
        method: "DELETE",
        headers: baseHeader,
      },
    },
    car: {
      getList: {
        baseURL: `${apiUrl}api/admin/car`,
        method: "GET",
        headers: baseHeader,
      },
      autoComplete: {
        baseURL: `${apiUrl}api/admin/car/get-by-plates`,
        method: "GET",
        headers: baseHeader,
      },
      getById: {
        baseURL: `${apiUrl}api/admin/car/:id`,
        method: "GET",
        headers: baseHeader,
      },
      create: {
        baseURL: `${apiUrl}api/admin/car`,
        method: "POST",
        headers: baseHeader,
      },
      update: {
        baseURL: `${apiUrl}api/admin/car/:id`,
        method: "PUT",
        headers: baseHeader,
      },
      delete: {
        baseURL: `${apiUrl}api/admin/car/:id`,
        method: "DELETE",
        headers: baseHeader,
      },
    },
    posts: {
      getList: {
        baseURL: `${apiUrl}api/admin/posts`,
        method: "GET",
        headers: baseHeader,
      },
      getById: {
        baseURL: `${apiUrl}api/admin/posts/:id`,
        method: "GET",
        headers: baseHeader,
      },
      create: {
        baseURL: `${apiUrl}api/admin/posts`,
        method: "POST",
        headers: baseHeader,
      },
      update: {
        baseURL: `${apiUrl}api/admin/posts/:id`,
        method: "PUT",
        headers: baseHeader,
      },
      delete: {
        baseURL: `${apiUrl}api/admin/posts/:id`,
        method: "DELETE",
        headers: baseHeader,
      },
    },
    productCategory: {
      getList: {
        baseURL: `${apiUrl}api/admin/product-category`,
        method: "GET",
        headers: baseHeader,
      },
      getById: {
        baseURL: `${apiUrl}api/admin/product-category/:id`,
        method: "GET",
        headers: baseHeader,
      },
      create: {
        baseURL: `${apiUrl}api/admin/product-category`,
        method: "POST",
        headers: baseHeader,
      },
      update: {
        baseURL: `${apiUrl}api/admin/product-category/:id`,
        method: "PUT",
        headers: baseHeader,
      },
      delete: {
        baseURL: `${apiUrl}api/admin/product-category/:id`,
        method: "DELETE",
        headers: baseHeader,
      },
    },
    customer: {
      getList: {
        baseURL: `${apiUrl}api/admin/customer`,
        method: "GET",
        headers: baseHeader,
      },
      autoComplete: {
        baseURL: `${apiUrl}api/admin/customer/autocomplete`,
        method: "GET",
        headers: baseHeader,
      },
      getListDlbd: {
        baseURL: `${apiUrl}api/admin/customer/dlbd`,
        method: "GET",
        headers: baseHeader,
      },
      getById: {
        baseURL: `${apiUrl}api/admin/customer/:id`,
        method: "GET",
        headers: baseHeader,
      },
      create: {
        baseURL: `${apiUrl}api/admin/customer`,
        method: "POST",
        headers: baseHeader,
      },
      update: {
        baseURL: `${apiUrl}api/admin/customer/:id`,
        method: "PUT",
        headers: baseHeader,
      },
      delete: {
        baseURL: `${apiUrl}api/admin/customer/:id`,
        method: "DELETE",
        headers: baseHeader,
      },
    },
    finance: {
      getList: {
        baseURL: `${apiUrl}api/admin/finance/income`,
        method: "GET",
        headers: baseHeader,
      },
    },
    order: {
      getList: {
        baseURL: `${apiUrl}api/admin/orders`,
        method: "GET",
        headers: baseHeader,
      },
      getById: {
        baseURL: `${apiUrl}api/admin/orders/:id`,
        method: "GET",
        headers: baseHeader,
      },
      create: {
        baseURL: `${apiUrl}api/admin/orders`,
        method: "POST",
        headers: baseHeader,
      },
      update: {
        baseURL: `${apiUrl}api/admin/orders/:id`,
        method: "PUT",
        headers: baseHeader,
      },
      updateStep: {
        baseURL: `${apiUrl}api/admin/orders/step`,
        method: "POST",
        headers: baseHeader,
      },
      asyncDlbd: {
        baseURL: `${apiUrl}api/admin/orders/asyncDLBD`,
        method: "POST",
        headers: baseHeader,
      },
      delete: {
        baseURL: `${apiUrl}api/admin/orders/:id`,
        method: "DELETE",
        headers: baseHeader,
      },
      dashboard: {
        baseURL: `${apiUrl}api/admin/orders/dashboard`,
        method: "GET",
        headers: baseHeader,
      },
    },
    garage: {
      getList: {
        baseURL: `${apiUrl}api/admin/garage`,
        method: "GET",
        headers: baseHeader,
      },
      getById: {
        baseURL: `${apiUrl}api/admin/garage/:id`,
        method: "GET",
        headers: baseHeader,
      },
      create: {
        baseURL: `${apiUrl}api/admin/garage`,
        method: "POST",
        headers: baseHeader,
      },
      update: {
        baseURL: `${apiUrl}api/admin/garage/:id`,
        method: "PUT",
        headers: baseHeader,
      },
      delete: {
        baseURL: `${apiUrl}api/admin/garage/:id`,
        method: "DELETE",
        headers: baseHeader,
      },
      myGarage: {
        baseURL: `${apiUrl}api/admin/garage/my-garage`,
        method: "GET",
        headers: baseHeader,
      },
    },
    marketing: {
      getList: {
        baseURL: `${apiUrl}api/admin/marketing-campaign`,
        method: "GET",
        headers: baseHeader,
      },
      getById: {
        baseURL: `${apiUrl}api/admin/marketing-campaign/:id`,
        method: "GET",
        headers: baseHeader,
      },
      create: {
        baseURL: `${apiUrl}api/admin/marketing-campaign`,
        method: "POST",
        headers: baseHeader,
      },
      update: {
        baseURL: `${apiUrl}api/admin/marketing-campaign/:id`,
        method: "PUT",
        headers: baseHeader,
      },
      delete: {
        baseURL: `${apiUrl}api/admin/marketing-campaign/:id`,
        method: "DELETE",
        headers: baseHeader,
      },
    },
  },
  nation: {
    provinceList: {
      baseURL: `${apiGuest}/provinces`,
      method: "GET",
      headers: baseHeader,
    },
    districtList: {
      baseURL: `${apiGuest}/get-districts/:provinceId`,
      method: "GET",
      headers: baseHeader,
    },
    wardList: {
      baseURL: `${apiGuest}/get-wards/:districtId`,
      method: "GET",
      headers: baseHeader,
    },
  },
};

export default apiConfig;
