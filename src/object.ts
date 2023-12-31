import { flattenArray, mapArray, searchIndexForKey } from "./array";
import { isArray, isObject, isMap, isSet, isNull } from "./validate"

type simpleObject = Record<string, any> | any[];


/**
 * 克隆
 * @param input 
 * @returns 
 */
export const clone = (input: any): any => {
  if (!isObject(input) || isNull(input)) return input;

  const result: any = isArray(input) ? [] : {};

  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      result[key] = clone(input[key]);
    }
  }

  return result;
}

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
  let result: Record<string, any> = {};

  if (!input.length) return result;

  input?.forEach((item) => {
    const [key, value] = item;

    if (isArray(value)) {
      result[key] = entries2obj(value);
    } else {
      result[key] = value;
    }
  })

  // 如果值是一个数组，则将重构一个数组
  const isArrayObj = Object.keys(result).every((key, index) => (key && key === `${index}`))
  if (isArrayObj) {
    result = mapArray(getKeys(result, false), key => result[key]);
  }

  return result
}

/**
 * 获取所有的 key
 * @param val 输入值
 * @param isDeep 是否递归深层属性
 * @returns 
 */
export const getKeys = (val: simpleObject, isDeep: boolean = true): any[] => {
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

/**
 * 从对象中找到响应 key 的一个 entries 数组
 * @param obj 输入对象
 * @param key 搜索的 key 值
 * @returns 
 */
const helperGetter = (obj: simpleObject, key: string): any[][] => {
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
 * @param obj [] || {}
 * @param key 'b' || 'a.b'
 * @returns 
 */
export const get = (obj: simpleObject, key: string): any => {
  let result: any;
  const regex = /(.*?)\[(\d+)\]/;
  const keys = key.split('.');
  const beforeObj: Record<string, any> = { ...obj };


  keys.forEach((itemKey, index) => {
    let subKey; // [] 里的索引
    const match = itemKey.match(regex);

    if (match) {
      [, itemKey, subKey] = match;
    }

    const getArr = helperGetter(beforeObj, itemKey);

    result = subKey ? entries2obj(getArr)[itemKey][subKey] : entries2obj(getArr)[itemKey];
  })

  return result;
}

export const set = (obj: simpleObject, key: string, newVal: any): boolean => {
  // const objEntries: any[][] = entries(obj);
  // const keys: any[] = key.split('.');
  // const stepArr: any[] = [];
  // const backupObj: any[][] = clone(objEntries);

  // keys.forEach((itemKey, index) => {
  //   const searchArr = index ? backupObj[stepArr[index]] : backupObj;
  //   // 检查是否存在对应的 key
  //   const hasKey = searchArr.some(([key]) => key === itemKey);

  //   if (hasKey) {
  //     // 
  //   } else {
  //     objEntries.push([itemKey, index === keys.length ? newVal : []]);
  //     stepArr.push(objEntries.length - 1);
  //   }
  // })

  return false;
}

export const has = (obj: any, key: any): boolean => {
  if (isMap(obj) || isSet(obj)) {
    return obj.has(key);
  } else if (isObject(obj)) {
    const resultArr = mapArray(getKeys(obj), (itemKey) => {
      return itemKey === key ? true : false;
    }, true);

    return flattenArray(resultArr).some(item => !!item);
  }

  return false;
}