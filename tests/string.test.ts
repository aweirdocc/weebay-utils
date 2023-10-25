import { describe, it, expect } from 'vitest'
import { camelCase2Delimiter, delimiter2CamelCase } from '../src/string'

describe('string', () => {
  it('to', () => {
    expect(camelCase2Delimiter('HelloWorld')).toBe('hello-world')
    expect(camelCase2Delimiter('RHelloWorld')).toBe('r-hello-world')
    expect(delimiter2CamelCase('hello-world')).toBe('helloWorld')
  })
})