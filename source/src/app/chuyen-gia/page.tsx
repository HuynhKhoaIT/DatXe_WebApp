import React from "react";
import { getGarages } from "@/utils/garage";
import { GarageItem } from "../components/elements/garage/GarageItem";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
export default async function Expert() {
  const garageData = await getGarages();

  // const experts = callApi(apiConfig.car)
  return (
    <div className="shop-area car-area list bg pt-50 pb-50">
      <div className="container">
        <div className="d-flex flex-wrap gap-2">
          {garageData.map((item, index) => (
            <div style={{ width: "270px" }}>
              <GarageItem garage={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
