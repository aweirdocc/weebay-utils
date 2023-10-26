import { mapArray, searchIndexForKey } from "./array";
import { isArray, isObject } from "./validate"

/**
 * 返回一个[key, value]
 * @param val 
 * @returns 
 */
export const entries = (val: Record<string, any>): any[] => {
  if (!isObject(val)) {
    return [];
  }

  return Object.entries(val).map(([key, value]) => {
    if (isObject(value)) {
      return [key, entries(value)];
    } else {
      return [key, value];
    }
  })
}

/**
 * 获取所有的 key
 * @param val 
 * @returns 
 */
export const getKeys = (val: object | any[]): any[] => {
  if (isArray(val)) {
    return (val as []).map((value, index) => [`${index}`, value]);
  }

  if (isObject(val)) {
    return Object.entries(val).map(([key, value]) => {
      if (isObject(value)) {
        return [key, getKeys(value)];
      } else {
        return key;
      }
    });
  }

  return [];
}

/**
 * 在对象里找到一个 key 索引链
 * @param obj 
 * @param key 
 * @returns 
 */
export const getKeyIndex = (obj: object, key: string): number[][] => {
  const keys = getKeys(obj);

  return searchIndexForKey(keys, key)
}

/**
 * 找出对象的属性值
 * @param obj 
 * @param key 
 * @returns 
 */
export const getValueByKey = (obj: object, key: string): any[][] => {
  const objEntries = entries(obj);
  const indexs = getKeyIndex(obj, key);

  const result = indexs.map((indexList) => {
    let result = objEntries;

    indexList.forEach(indexVal => {
      if (result?.[indexVal]) {
        result = key === result[indexVal] ? result[indexVal+1] : result[indexVal];
      }
    })

    return result;
  });

  return result?.[0];
}