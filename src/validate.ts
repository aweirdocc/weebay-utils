const kindOf = ((cache: Record<string, any>) => {
  return function (val: unknown) {
    const type = Object.prototype.toString.call(val);

    return cache[type] || (cache[type] = type.slice(8, -1).toLowerCase());
  };
})(Object.create(null));

export const kindOfTest = (type: string) => {
  type = type.toLowerCase();

  return function isKindOf(val: unknown): boolean {
    return kindOf(val) === type;
  };
};

/**
 * 校验 Array 类型
 */
export const isArray = (val: unknown): boolean => {
  return Array.isArray(val);
};

/**
 * 校验 Undefined 类型
 */
export const isUndefined = (val: unknown): boolean => {
  return typeof val === 'undefined';
};

/**
 * 校验 NaN 类型
 * @param val 
 */
export const isNaN = (val: unknown): boolean => {
  return Number.isNaN(val);
}

/**
 * 校验 String 类型
 */
export const isString = (val: unknown): boolean => {
  return typeof val === 'string';
};

/**
 * 校验 Number 类型
 */
export const isNumber = (val: unknown): boolean => {
  return typeof val === 'number';
};

/**
 * 校验 Function 类型
 */
export const isFunction = (val: unknown): boolean => {
  return typeof val === 'function';
};

/**
 * 校验 Object 类型
 */
export const isObject = (val: unknown): boolean => {
  return val !== null && typeof val === 'object';
};

/**
 * 校验原始类型
 */
export const isPrimitiveType = (val: unknown): boolean => {
  return (
    typeof val === 'number' ||
    typeof val === 'string' ||
    typeof val === 'boolean' ||
    typeof val === 'symbol' ||
    val === null ||
    typeof val === 'undefined'
);
};

/**
 * 校验 Map 类型
 */
export const isMap = kindOfTest('Map');

/**
 * 校验 Set 类型
 */
export const isSet = kindOfTest('Set');

/**
 * 校验 Date 类型
 */
export const isDate = kindOfTest('Date');

/**
 * 校验 File 类型
 */
export const isFile = kindOfTest('File');

/**
 * 校验 Blob 类型
 */
export const isBlob = kindOfTest('Blob');

/**
 * 校验是否为一个普通的对象
 * @param val 
 * @returns 
 */
export const isPlainObject = (val: unknown): boolean => {
  if (typeof val !== 'object' || val === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(val);
  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in val) &&
    !(Symbol.iterator in val)
  );
};

/**
 * 是否为空值
 * @param value 
 * @returns 
 */
export const isEmpty = (value: unknown): boolean => {
  const _type = kindOf(value);

  if (isUndefined(value) || value == null) return true;

  switch (_type) {
    case 'array':
    case 'string':
      return !(value as string).length;
    case 'object':
      return !Object.keys(value).length;
    case 'map':
    case 'set':
      return !(value as Set<any>).size;
    default:
      break;
  }

  return false;
};

/**
 * 是否为身份证号: 支持（1/2）代，15位或18位
 * @param {string} str 身份证号
 * @param {number} type 1:15位，2:18位，默认0 同时匹配15位和18位
 * @returns {boolean}
 */
export const isIdCard = (str: string, type:number = 0): boolean => {
  // 1代身份证
  const reg1 = /^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$/;
  // 2代身份证
  const reg2 =
    /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
  const reg =
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;

  switch (type) {
    case 1:
      return reg1.test(str);
    case 2:
      return reg2.test(str);
    default:
      return reg.test(str);
  }
};

/**
 * 是否是手机号
 * @param {string} str
 * @returns {boolean}
 */
export const isTelNumber = (str:string | number): boolean => {
  const reg =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  return reg.test(`${str}`);
};

/**
 * 校验是否是URL
 * @param {string} str
 * @returns {boolean}
 */
export const isUrl = (str:string): boolean => {
  const reg =
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
  return reg.test(str);
};

/**
 * @desc 判断字符串是否是十六进制的颜色值
 * @param {string} value 需要判断的数据
 * @returns {boolean} 校验是否是十六进制的颜色值
 */
export const isColor = (value:string): boolean => {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value);
};

/**
 * 是否是邮箱
 * @param {string} value
 * @returns {boolean}
 */
export const isEmail = (value:string): boolean => {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(value);
};

/**
 * 是否是移动端
 */
export const isMobile = ():boolean => {
  if (
    navigator.userAgent.match(
      /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
    )
  ) {
    return true;
  }
  
  return false;
};


const compare = (v1: any, v2: any): boolean => {
  return v1 === v2;
}

/**
 * 传入的两个值是否相同
 * @param val1 
 * @param val2 
 * @param isDeep 是否深度检查
 * @returns 
 */
export const isEqual = (val1: unknown, val2: unknown, isDeep: boolean = true): boolean => {
  if (isPrimitiveType(val1) && isPrimitiveType(val2)) {
    return compare(val1, val2);
  }

  if (val1 && val2) {
    if (isDate(val1)) {
      return compare(+val1, +val2)
    }
  }

  return false;
}


