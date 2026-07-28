import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

/** Next 16 flat ESLint yapılandırması. */
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'node_modules/**', 'public/docs/**', 'next-env.d.ts']),
  {
    rules: {
      // localStorage / cookie hydration için bilinçli setState-in-effect kullanıyoruz
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
