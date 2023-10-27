import { isArray } from "./validate";

/**
 * 在一个数组中找到目标值的索引链
 * @param arr 
 * @param key 
 * @returns 
 */
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

/**
 * 深度循环遍历数组
 * @param arr 
 * @param cb 
 * @returns 
 */
export const mapArray = (arr: any[], cb: (arrItem: any, arrItemIndex: number) => void): any[] => {
  return arr.map((item, index) => {
    if (isArray(item)) {
      return mapArray(item, cb);
    }

    return cb(item, index);
  })
} 

/**
 * 数组深度拍平
 * @param arr 
 * @returns 
 */
export const flattenArray = (arr: any[]): any[] => {
  const flattenedArray: any[] = [];

  function flatten(arr: any[]) {
    for (const item of arr) {
      if (isArray(item)) {
        flatten(item);
      } else {
        flattenedArray.push(item);
      }
    }
  }

  flatten(arr);

  return flattenedArray;
}
