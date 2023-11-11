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
 * 循环遍历数组
 * @param arr 
 * @param cb 
 * @param isDeep 是否深度遍历，默认为否
 * @returns 
 */
export const mapArray = (arr: any[], cb: (arrItem: any, arrItemIndex: number) => void, isDeep: boolean = false): any[] => {
  return arr.map((item, index) => {
    if (isDeep && isArray(item)) {
      return mapArray(item, cb, isDeep);
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
