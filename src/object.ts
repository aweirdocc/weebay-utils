import { flattenArray, mapArray, searchIndexForKey } from "./array";
import { isArray, isObject, isMap, isSet } from "./validate"

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
  });
}

/**
 * 将 entries 数组转换成对象
 * @param input 
 * @returns 
 */
export const entries2obj = (input: any[][]): Record<string, any> => {
  const result: Record<string, any> = {};

  input?.forEach((item) => {
    const [key, value] = item;

    if (isArray(value)) {
      result[key] = entries2obj(value);
    } else {
      result[key] = value;
    }
  })

  return result
}

/**
 * 获取所有的 key
 * @param val 输入值
 * @param isDeep 是否递归深层属性
 * @returns 
 */
export const getKeys = (val: object | any[], isDeep: boolean = true): any[] => {
  if (isArray(val)) {
    return (val as []).map((value, index) => [`${index}`, value]);
  }

  if (isObject(val)) {
    return Object.entries(val).map(([key, value]) => {
      if (isDeep && isObject(value)) {
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

export const helperGetter = (obj: object, key: string): any[][] => {
  const objEntries = entries(obj);
  const indexs = getKeyIndex(obj, key);

  const result = indexs.map((indexList) => {
    let result = objEntries;

    indexList.forEach(indexVal => {
      if (result?.[indexVal] && key !== result[indexVal]) {
        result = result[indexVal]
      }
    })

    return result;
  });

  return result;
}

/**
 * 找出对象的属性值
 * @param obj 
 * @param key 'b' || 'a.b'
 * @returns 
 */
export const get = (obj: object, key: string): any => {
  const keys = key.split('.');
  let result: any;
  const beforeObj: Record<string, any> = {...obj};

  
  keys.forEach((itemKey, index) => {
    const getArr = helperGetter(beforeObj, itemKey);

    result = entries2obj(getArr)[itemKey];
  })

  return result;
}

export const set = (obj: object, key: string, newVal: any): boolean => {
  return false;
}

export const has = (obj: any, key: any): boolean => {

  if(isMap(obj) || isSet(obj)) {
    return obj.has(key);
  } else if (isArray(obj) || isObject(obj)) {
    const resultArr = mapArray(getKeys(obj), (itemKey) => {
      return itemKey === key ? true : false;
    });

    return flattenArray(resultArr).some(item => !!item);
  } 
  
  return false;
}