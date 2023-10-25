import { isArray, isFunction } from "./validate";

export const searchIndexForKey = (arr: any[], key: any): any[] => {
  const result = [];

  for (let i = 0; i < arr.length; i++) {

    if (arr[i] === key) {
      result.push([i]);
    } else if (isArray(arr[i])) {
      const subResult = searchIndexForKey(arr[i], key);

      for (const path of subResult) {
        result.push([i].concat(path));
      }
    }
    
  }

  return result;
}

export const mapArray = (arr: any[], cb: (arrItem: any, arrItemIndex: number) => void): any[] => {
  return arr.map((item, index) => {
    if (isArray(item)) {
      return mapArray(item, cb);
    }

    return cb(item, index);
  })
} 