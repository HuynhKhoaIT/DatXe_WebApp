/**
 * External Dependencies.
 */
import axios from "axios";
/**
 * Internal Dependencies.
 */
import {
  GET_CARS_DLBD_ENDPOINT,
  GET_CAR_ENDPOINT,
  SET_CAR_DEFAULT,
} from "./constants/endpoints";
import { ICar } from "@/interfaces/car";
import { convertToPlatesNumber } from "./until";
import { getSession } from "@/lib/auth";
/**
 * Get getCars.
 *
 * @return {Promise<void>}
 */

export const getCars = async (token: string) => {
  // const session = await getServerSession(authOptions);
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(`${GET_CAR_ENDPOINT}`, config);
      return res.data.data as Promise<ICar[]>;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy thông tin xe");
  }
};

export const getCarsSsr = async () => {
  const session = await getSession();
  if (session?.user) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      };
      const res = await axios.get(`${GET_CAR_ENDPOINT}`, config);
      return res.data.data as Promise<ICar[]>;
    } catch (error) {
      console.error(error);
      throw new Error("Lỗi trong quá trình lấy thông tin xe");
    }
  }
};

export const getCar = async (token: string, carId: string) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(`${GET_CAR_ENDPOINT}/${carId}`, config);
      return res.data.data as Promise<ICar[]>;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy thông tin xe");
  }
};
export const getCarSsr = async (carId: number) => {
  const session = await getServerSession(authOptions);
  try {
    if (session?.user?.token) {
      const config = {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      };
      const res = await axios.get(`${GET_CAR_ENDPOINT}/${carId}`, config);
      return res.data.data as Promise<ICar[]>;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy thông tin xe");
  }
};

export const addCar = async (newCar: Object, token: String) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post(`${GET_CAR_ENDPOINT}`, newCar, config);
      return res.data.data as ICar;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình tạo thông tin xe");
  }
};

export const deleteCar = async (carId: string, token: string) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.delete(`${GET_CAR_ENDPOINT}/${carId}`, config);
      return res.data.data as ICar;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình xóa thông tin xe");
  }
};

export const updateCar = async (
  carId: string,
  updatedCarData: any,
  token: string
) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.put(
        `${GET_CAR_ENDPOINT}/${carId}`,
        updatedCarData,
        config
      );
      return res.data.data as ICar;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình cập nhật thông tin xe");
  }
};

export const setCarDefault = async (carId: string, token: String) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post(
        `${SET_CAR_DEFAULT}`,
        { carId: carId },
        config
      );
      return res.data.data as ICar;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình tạo xe mặc định");
  }
};

export const getCarFromDLBD = async (carId: number, token: string) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(`${GET_CAR_ENDPOINT}/${carId}`, config);
      return res.data.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình tạo xe mặc định");
  }
};

export async function getCarsFromDLBD(token: string) {
  const res = await fetch(GET_CARS_DLBD_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const data = await res.json();
  return data;
}

export async function getPlatesNumberFromImg(img: string) {
  const res = await fetch(
    "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBOzbQ6x2QGBERqj6a-aAPrAmtmcs6KUn0",
    {
      method: "POST",
      body: `{
        "requests":[
          {
            "image":{
              "content":
                  "${img}"
              
            },
            "features":[
              {
                "type":"DOCUMENT_TEXT_DETECTION",
                "maxResults":2
              }
            ]
          }
        ]
      }`,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  try {
    // return data;
    let rs = data.responses[0].textAnnotations[0].description;
    // return rs;
    return convertToPlatesNumber(rs);
  } catch (error) {
    return "";
  }
}
