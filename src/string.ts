type delimiterStr = '_' | '-' | '$' | '^' | '/';

/**
 * 驼峰转接自定义符号
 * @param input 
 * @returns 
 */
export const camelCase2Delimiter = (input: string, delimiter: delimiterStr = '-'): string => {
  return input
    .replace(/([A-Z])/g, (match, letter) => `${delimiter}${letter.toLowerCase()}`)
    .replace(new RegExp(`^${delimiter}|${delimiter}$`, 'g'), '');
}


/**
 * 自定义符号（下划线）转驼峰
 * @param input 
 * @param delimiter 
 * @returns 
 */
export const delimiter2CamelCase = (input: string, delimiter: delimiterStr = '-'): string => {
  return input.replace(new RegExp(`${delimiter}(.)`, 'g'), (match, letter) => letter.toUpperCase());
}