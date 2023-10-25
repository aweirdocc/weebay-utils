import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'

const plugins = [
  alias({
    entries: [
      { find: /^node:(.+)$/, replacement: '$1' },
    ],
  }),
  resolve({
    preferBuiltins: true,
  }),
  commonjs(),
  esbuild({
    target: 'node14',
  }),
]

const input = 'src/index.ts'

export default [
  {
    input,
    output: [
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
        format: 'esm',
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
        format: 'cjs',
      },
    ],
    external: [],
    plugins,
  },
  {
    input,
    output: {
      file: input.replace('src/', 'dist/').replace('.ts', '.d.ts'),
      format: 'esm',
    },
    external: [],
    plugins: [
      dts({ respectExternal: true }),
    ],
  },
]


