import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import ts from '@typescript-eslint/eslint-plugin'

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: { '@typescript-eslint': ts },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'max-len': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/attributes-order': 'off',
      'vue/html-self-closing': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 2,
          multiline: 1,
        },
      ],
      'vue/first-attribute-linebreak': ['error', { singleline: 'beside', multiline: 'below' }],
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: [],
        },
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        { singleline: 'never', multiline: 'always' },
      ],
      'vue/html-closing-bracket-spacing': [
        'error',
        { startTag: 'never', endTag: 'never', selfClosingTag: 'never' },
      ],
    },
  },
]
