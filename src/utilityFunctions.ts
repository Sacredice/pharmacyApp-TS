import { coordsType } from "./context/LocationContext";

export const nextShiftTimestamp = (): number => {
  const now = new Date();
  const nowArray = now.toISOString().split("T")[1].split(".")[0];
  const hourNow = Number(nowArray.split(":")[0]);
  const minNow = Number(nowArray.split(":")[1]);

  if ((hourNow < 5) || (hourNow === 5 && minNow < 30)) {
      const minDiff = 30 < minNow ? 90 - minNow : 30 - minNow;
      const hourDiff = 30 < minNow ? 4 - hourNow : 5 - hourNow;
      const nextShift = (now.getTime() + (hourDiff * 60 * 60 * 1000) + (minDiff * 60 * 1000) - (119 * 1000));
      console.log("Today's shift change not happened yet(before 8:30 TR timezone)", nextShift);
      return nextShift;
  } else {
      const minDiff = minNow < 30 ? minNow - 30 + 60 : minNow - 30;
      const hourDiff = minNow < 30 ? hourNow - 6 : hourNow - 5;
      now.setDate(now.getDate() + 1)
      const nextShift = (now.getTime() - (hourDiff * 60 * 60 * 1000) - (minDiff * 60 * 1000) - (119 * 1000));
      console.log("Today's shift has changed next one is tomorrow at 8:30", nextShift);
      return nextShift;
  }
}

export function dynamicSort<T>(property: keyof T | string) {
  let sortOrder = 1;
  if (typeof property === "string" && property[0] === "-") {
      sortOrder = -1;
      property = property.slice(1);
  }
  return function (a: T, b: T) {
      let result = (a[property as keyof T] < b[property as keyof T]) ? -1 : (a[property as keyof T] > b[property as keyof T]) ? 1 : 0;
      return result * sortOrder;
  }
}

export interface dataType {
  name: string,
  dist: string,
  address: string,
  phone: string,
  loc: string,
  [key: string]: any,
}

export const getThreeClosest = (userLocation: coordsType, data: dataType[]) => {
  if (!userLocation) {
      console.log("data");
      return data;
  } else {
      const distancePropertyAdded = data.map(pharmacyObj => {
          const location = pharmacyObj.loc.split(",");
          pharmacyObj.distance = ((Number(location[0]) - userLocation.lat) ** 2)
              + ((Number(location[1]) - userLocation.lon) ** 2);
          return pharmacyObj;
      });

      distancePropertyAdded.sort(dynamicSort("distance"));
      return distancePropertyAdded.slice(0, 3);
  }
};
