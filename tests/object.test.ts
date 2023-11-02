import { entries, getKeyIndex, getKeys, get, has, entries2obj, helperGetter } from './../src/object';
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
        [
          ['c', 2],
          ['d', 3],
          ['e', 
            [
              ['f', 4]
            ]
          ]
        ]
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

    expect(getKeys([1, 2, 3])).toStrictEqual([
      ['0', 1],
      ['1', 2],
      ['2', 3],
    ])
  })

  it('getKeyIndex', () => {
    expect(getKeyIndex({ a: 1, b: { c: 2, d: 3, e: { f: 4 } } }, 'f')).toStrictEqual([[1,1,2,1,0]])
  })

  it('entries2obj', () => {
    expect(entries2obj([])).toStrictEqual({});
    expect(entries2obj([
      ['c', 2],
      ['d', 3],
      ['e', 
        [
          ['f', 4]
        ]
      ]
    ])).toStrictEqual({ c: 2, d: 3, e: { f: 4 }});

    expect(entries2obj([[ 'f', 4 ], ['g', 5]])).toStrictEqual({f: 4, g: 5});

    expect(entries2obj([['e', [[ 'f', 4 ], ['g', 5]]]])).toStrictEqual({e: { f: 4, g: 5 }});
  })

  it('get', () => {
    expect(get({ a: 1, b: { c: 2, d: 3, e: { f: 4 } } }, 'f')).toStrictEqual(4);
    expect(get({ a: 1, b: { c: 2, d: 3, e: { f: 4, g: 5 } } }, 'e.g')).toStrictEqual(5);
    expect(get({ a: 1, b: { c: 2, d: 3, e: { f: 4, g: 5 } } }, 'e')).toStrictEqual({ f: 4, g: 5 });
    expect(get({ a: 1, b: { c: 2, d: 3, e: { f: 4, g: 5 } } }, 'dd')).toBeUndefined();

    expect(helperGetter({ a: 1, b: { c: 2, d: 3, e: { f: 4, g: 5 } } }, 'f')).toStrictEqual([['f', 4]]);
    expect(helperGetter({ a: 1, b: { c: 2, d: 3, e: { f: 4, g: 5 } } }, 'e')).toStrictEqual([['e', [[ 'f', 4 ], ['g', 5]]]]);
  })

  it('has', () => {
      const map = new Map();
      const set = new Set();

      map.set('a', 1);
      set.add('a');

      expect(has({ a: 1, b: { c: 2, d: 3, e: { f: 4 }}}, 'ff')).toBeFalsy();
      expect(has({ a: 1, b: { c: 2, d: 3, e: { f: 4 }}}, 'f')).toBeTruthy();
      expect(has([1, 2, 3, 4, 5, 6], 'f')).toBeFalsy();
      expect(has([1, 2, 3, 4, 5, 6], 5)).toBeTruthy();

      expect(has(map, 5)).toBeFalsy();
      expect(has(set, 5)).toBeFalsy();
      expect(has(map, 'a')).toBeTruthy();
      expect(has(set, 'a')).toBeTruthy();
      expect(has(set, 'b')).toBeFalsy();
  })
})