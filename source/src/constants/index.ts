import BookingTTDK from "@/app/admin/(admin)/booking-ttdk/page";

export const apiUrl = process.env.REACT_APP_API;
export const envGoogleMapAPIKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
export const DEFAULT_SIZE_LIMIT = 12;
export const DEFAULT_SIZE_LIMIT_20 = 20;

export const DATE_DISPLAY_FORMAT = "hh:mm A DD/MM/YYYY";
export const DATE_SHORT_MONTH_FORMAT = "DD MMM YYYY";
export const DATE_SHORT_MONTH_TIME_FORMAT = "DD MMM YYYY HH:mm";
export const TIME_FORMAT_DISPLAY = "HH:mm";
export const DATE_FORMAT_DISPLAY = "DD/MM/YYYY";
export const DEFAULT_FORMAT = "DD/MM/YYYY HH:mm:ss";

export const STATUS_PUBLIC = "PUBLIC";
export const STATUS_DRAFT = "DRAFT";
export const STATUS_PENDING = "PENDING";
export const STATUS_DELETE = "DELETE";

export const IS_PRODUCT = "true";
export const IS_SERVICE = "false";
export const MALE = "MALE";
export const FEMALE = "FEMALE";
export const COMPANY = "COMPANY";
export const OTHER = "OTHER";

// role

export const ROLE_ADMIN = "ADMIN";
export const ROLE_EXPERT = "ADMINGARAGE";
export const ROLE_CUSTOMER = "CUSTOMER";

export const ORDER_PENDING = "0";
export const ORDER_CANCEL = "-1";
export const ORDER_ACCEPT = "1";
export const ORDER_QUOTE = "2";
export const ORDER_REPAIR = "3";
export const ORDER_DONE = "4";
export const ORDER_FINISH = "5";

export const MARKETING_CANCEL = "0";
export const MARKETING_PENDING = "1";
export const MARKETING_COMING = "2";
export const MARKETING_ALL = "3";
export const QUERY_KEY = {
  products: "products",
  allProducts: "allProducts",
  productHome: "productHome",
  serviceHome: "serviceHome",
  allServices: "allServices",
  account: "account",
  productDetail: "productDetail",
  productListReview: "productListReview",
  categories: "categories",
  amenities: "amenities",
  banner: "banner",
  newsList: "newsList",
  marketings: "marketings",
  ordersAdmin: "ordersAdmin",
  revenue: "revenue",
  users: "users",
  user: "user",
  news: "news",
  notiList: "notiList",
  blogs: "blogs",
  orders: "orders",
  bookingTTDK: "bookingTTDK",
  cars: "cars",
  reviewsExpert: "reviewsExpert",
  customers: "customers",
  productsByCategory: "productsByCategory",
  productsRelate: "productsRelate",
  productsUserPage: "productsUserPage",
  experts: "experts",
  qrCode: "qrCode",
  systemExperts: "systemExperts",
  marketing: "marketing",
  search: "search",
  profile: "profile",
  myGarage: "myGarage",
  optionsProvince: "optionsProvince",
  optionsDistrict: "optionsDistrict",
  optionsWard: "optionsWard",
  optionsultilities: "optionsultilities",
  optionsBrandCar: "optionsBrandCar",
  optionsModelCar: "optionsModelCar",
  optionsYearCar: "optionsYearCar",

  optionsNumberPlate: "optionsNumberPlate",
  optionsCategory: "optionsCategory",

  optionsCustomer: "optionsCustomer",
  carsDlbd: "carsDlbd",
  productsDlbd: "productsDlbd",
  customersDlbd: "customersDlbd",
  categoriesDlbd: "categoriesDlbd",

  // detail
  expertDetail: "expertDetail",
  categoryDetail: "categoryDetail",
  carDetail: "carDetail",
  customerDetail: "customerDetail",
  newsDetail: "newsDetail",
  orderDetail: "orderDetail",
  orderDLBDDetail: "orderDLBDDetail",
  orderDLBD: "orderDLBD",

  // system-car
  brandCar: "brandCar",
  modelCar: "modalCar",
  yearCar: "yearCar",
  brandCarDetail: "brandCarDetail",
  modelCarDetail: "modelCarDetail",
  yearCarDetail: "yearCarDetail",
};

export const ORDER_CANCEL_1 = "Sai lịch hẹn";
export const ORDER_CANCEL_2 = "Khách từ chối";
export const ORDER_CANCEL_3 = "Khách hàng không phản hồi";
export const ORDER_CANCEL_4 = "Hết hàng";
export const ORDER_CANCEL_5 = "Giá cao";
export const ORDER_CANCEL_6 = "Dùng sản phẩm của đối thủ";
export const ORDER_CANCEL_7 = "Nguyên nhân khác";

export const CARBRAND = "Hãng xe";
export const CARNAME = "Dòng xe";
export const CARYEAR = "Năm sản xuất";
export const appName = "datxe";

export const storageKeys = {
  USER_ACCESS_TOKEN: `${appName}-user-access-token`,
  ADDRESS_DEFAULT: `${appName}-address-default`,
  CART_DATA: `${appName}-cart-data`,
};
export const AppConstants = {
  apiRootUrl: process.env.REACT_APP_API,
  contentRootUrl:
    "https://datlichbaoduong.vcos.cloudstorage.com.vn/dat-xe.com/",
};

export const NOTIFICATION_SYSTEM_KIND = 0;
export const NOTIFICATION_ORDER_KIND = 1;
export const NOTIFICATION_MARKETING_KIND = 2;

export const MY_CAR_TITLE = "Xe của tôi";
export const MY_CAR_DETAIL_TITLE = "Chi tiết xe";
export const MY_CAR_CREATE_TITLE = "Thêm xe mới";
export const MY_CAR_EDIT_TITLE = "Sửa thông tin xe";

export const PROFILE_TITLE = "Hồ sơ";
export const ORDERS_TITLE = "Đơn hàng";
export const ORDERS_DETAIL_TITLE = "Thông tin đơn hàng";

export const NOTI_TITLE = "Thông báo";

export const titleHeaderKeys = {
  MY_CAR_TITLE,
  MY_CAR_DETAIL_TITLE,
  MY_CAR_CREATE_TITLE,
  MY_CAR_EDIT_TITLE,
  PROFILE_TITLE,
  ORDERS_TITLE,
  ORDERS_DETAIL_TITLE,
  NOTI_TITLE,
};
