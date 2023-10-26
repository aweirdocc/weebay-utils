import { mapArray, searchIndexForKey } from './../src/array';
import { describe, it, expect } from 'vitest'

describe('array', () => {
  it('searchIndexForKey', () => {
    expect(searchIndexForKey(
      [1, 2, [3, 4, [5, 6], 7], 8],
      10
    )).toStrictEqual([]);

    expect(searchIndexForKey(
      [1, 2, [3, 4, [5, 6], 7], 8],
      5
    )).toStrictEqual([[2, 2, 0]]);

    expect(searchIndexForKey(
      [
        'a',
        ['b', ['c', 'd', ['e', ['f']]]]
      ],
      'f'
    )).toStrictEqual([[1, 1, 2, 1, 0]]);
  })

  it('mapArray', () => {
    expect(mapArray([1, 2, [3, [4]]], (item) => item * 2)).toStrictEqual([2, 4, [6, [8]]]);
  })
})