import { entries, getKeyIndex, getKeys, getValueByKey } from './../src/object';
import { describe, it, expect } from 'vitest'

describe('object', () => {
  it('entries', () => {
    expect(entries({ a: 1, b: 2 })).toStrictEqual([
      ['a', 1],
      ['b', 2],
    ])

    expect(entries({ a: 1, b: { c: 2, d: 3, e: { f: 4 } } })).toStrictEqual([
      ['a', 1],
      ['b',
        
          ['c', 2],
          ['d', 3],
          ['e', ['f', 4]]
        
      ],
    ]);
  })

  it('getKeys', () => {
    expect(getKeys({ a: 1, b: 2 })).toStrictEqual([
      'a',
      'b'
    ])

    expect(getKeys({ a: 1, b: { c: 2, d: 3, e: { f: 4 } } })).toStrictEqual([
      'a',
      ['b', ['c', 'd', ['e', ['f']]]]
    ])

    expect(getKeys({ a: 1, b: { c: 2}, d: { e: 3, f: {g: 4}, h: 5} })).toStrictEqual([
      'a',
      ['b', ['c']],
      ['d', ['e', ['f', ['g']], 'h']]
    ])

    expect(getKeys([1, 2, 3])).toStrictEqual([
      ['0', 1],
      ['1', 2],
      ['2', 3],
    ])


    expect(getKeyIndex({ a: 1, b: { c: 2, d: 3, e: { f: 4 } } }, 'f')).toStrictEqual([[1, 1, 2, 1, 0]])

    // expect(getValueByKey({ a: 1, b: { c: 2, d: 3, e: { f: 4 } } }, 'f')).toBe();
  })
})