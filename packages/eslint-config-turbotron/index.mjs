import prettierConfig from 'eslint-config-prettier'

export default [
  prettierConfig,
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
]
