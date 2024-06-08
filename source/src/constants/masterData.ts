import { Label } from "recharts";
import {
  STATUS_PUBLIC,
  STATUS_DRAFT,
  STATUS_PENDING,
  STATUS_DELETE,
  IS_PRODUCT,
  IS_SERVICE,
  MALE,
  FEMALE,
  COMPANY,
  OTHER,
  ORDER_ACCEPT,
  ORDER_QUOTE,
  ORDER_REPAIR,
  ORDER_DONE,
  ORDER_FINISH,
  ORDER_CANCEL,
  MARKETING_CANCEL,
  MARKETING_ALL,
  MARKETING_COMING,
  MARKETING_PENDING,
  ORDER_PENDING,
  ORDER_CANCEL_1,
  ORDER_CANCEL_2,
  ORDER_CANCEL_3,
  ORDER_CANCEL_4,
  ORDER_CANCEL_5,
  ORDER_CANCEL_6,
  ORDER_CANCEL_7,
  titleHeaderKeys,
} from "./index";

export const statusOptions = [
  { value: STATUS_PUBLIC, label: "Hoạt động", color: "green" },
  { value: STATUS_PENDING, label: "Tạm dừng", color: "orange" },
  { value: STATUS_DRAFT, label: "Nháp", color: "yellow" },
  // { value: STATUS_DELETE, label: 'Xoá', color: 'red' },
];

export const kindProductOptions = [
  { value: IS_PRODUCT, label: "Sản phẩm", color: "green" },
  { value: IS_SERVICE, label: "Dịch vụ", color: "blue" },
];

export const sexOptions = [
  { value: MALE, label: "Nam", color: "green" },
  { value: FEMALE, label: "Nữ", color: "orange" },
  { value: COMPANY, label: "Công ty", color: "orange" },
  { value: OTHER, label: "Khác", color: "orange" },
];

export const stepOrderOptions = [
  { value: ORDER_PENDING, label: "Đang chờ", color: "pink" },
  { value: ORDER_ACCEPT, label: "Tiếp nhận", color: "blue" },
  // { value: ORDER_QUOTE, label: 'Báo giá', color: 'yellow' },
  // { value: ORDER_REPAIR, label: 'Đang sửa chữa', color: 'orange' },
  { value: ORDER_DONE, label: "Hoàn thành", color: "green" },
  // { value: ORDER_FINISH, label: 'Xuất Xưởng', color: 'cyan' },
  { value: ORDER_CANCEL, label: "Đã huỷ", color: "red" },
];

export const kindMarketingOptions = [
  { value: MARKETING_ALL, label: "Tất cả", color: "green" },
  { value: MARKETING_COMING, label: "Sắp diễn ra", color: "orange" },
  { value: MARKETING_PENDING, label: "Đang diễn ra", color: "blue" },
  { value: MARKETING_CANCEL, label: "Đã kết thúc", color: "red" },
];

export const FieldTypes = {
  STRING: "STRING_TYPE",
  NUMBER: "NUMBER_TYPE",
  SELECT: "SELECT",
  AUTOCOMPLETE: "AUTOCOMPLETE",
  DATE: "DATE",
  DATE_RANGE: "DATE_RANGE",
};

export const OptionsCancelOrder = [
  { value: ORDER_CANCEL_1, label: "Sai lịch hẹn", color: "pink" },
  { value: ORDER_CANCEL_2, label: "Khách từ chối", color: "blue" },
  {
    value: ORDER_CANCEL_3,
    label: "Khách hàng không phản hồi",
    color: "yellow",
  },
  { value: ORDER_CANCEL_4, label: "Hết hàng", color: "orange" },
  { value: ORDER_CANCEL_5, label: "Giá cao", color: "green" },
  { value: ORDER_CANCEL_6, label: "Dùng sản phẩm của đối thủ", color: "cyan" },
  { value: ORDER_CANCEL_7, label: "Nguyên nhân khác", color: "red" },
];

export const kindProduct = [
  {
    id: "1",
    value: "true",
    name: "Sản phẩm",
  },
  {
    id: "2",
    value: "false",
    name: "Dịch  vụ",
  },
];

export const brandData = [
  {
    id: "12742",
    name: "VinFast",
  },
  {
    id: "25",
    name: "Toyota",
  },
  {
    id: "2",
    name: "BMW",
  },
  {
    id: "2192",
    name: "mercedes",
  },
  {
    id: "6841",
    name: "Audi",
  },
  {
    id: "5265",
    name: "Ford",
  },
  {
    id: "5007",
    name: "Honda",
  },
  {
    id: "3172",
    name: "Mazda",
  },
  {
    id: "3987",
    name: "KIA",
  },
];

export const titleHeader = [
  {
    value: "danh-sach-xe",
    label: titleHeaderKeys.MY_CAR_TITLE,
    detail: titleHeaderKeys.MY_CAR_DETAIL_TITLE,
    create: titleHeaderKeys.MY_CAR_CREATE_TITLE,
    edit: titleHeaderKeys.MY_CAR_EDIT_TITLE,
  },
  {
    value: "ho-so",
    label: titleHeaderKeys.PROFILE_TITLE,
  },
  {
    value: "danh-sach-don-hang",
    label: titleHeaderKeys.ORDERS_TITLE,
    detail: titleHeaderKeys.ORDERS_DETAIL_TITLE,
  },
  {
    value: "thong-bao",
    label: titleHeaderKeys.NOTI_TITLE,
  },
];
