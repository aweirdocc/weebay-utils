import { describe, it, expect } from 'vitest'
import { isString, isNumber, isUndefined, isArray, isObject, isEmpty, isDate, isMap, isSet, isEmail, isUrl, isColor, isIdCard, isTelNumber } from '../src/validate'


describe('is', () => {
  it('checking some types ', () => {
    expect(isString('')).toEqual(true)
    expect(isNumber(12)).toEqual(true)
    expect(isUndefined(undefined)).toEqual(true)
    expect(isArray([])).toEqual(true)
    expect(isObject({})).toEqual(true)
    expect(isDate(new Date())).toEqual(true)
    expect(isMap(new Map())).toEqual(true)
    expect(isSet(new Set())).toEqual(true)

    expect(isEmpty({})).toEqual(true)
  })

  it('checking others ', () => {
    expect(isEmail('a@gmail.com')).toEqual(true)
    expect(isEmail('787.com')).toEqual(false)

    expect(isColor('#666666')).toEqual(true)

    expect(isIdCard('610112198411251451')).toEqual(true)
    expect(isIdCard('610405152622251516')).toEqual(false)
    expect(isIdCard('61040515262225')).toEqual(false)

    expect(isTelNumber('13348485959')).toEqual(true)
    expect(isTelNumber('191484845959')).toEqual(false)
    expect(isTelNumber('11148484595')).toEqual(false)

    expect(isUrl('www.1.com')).toEqual(true)
    expect(isUrl('1.com')).toEqual(true)
    expect(isUrl('http://1.com')).toEqual(true)
  })
})
