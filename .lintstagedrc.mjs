import path from 'path'
import process from 'process'

/**
 * @param {string[]} filenames
 */
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

/**
 * @param {string[]} filenames
 */
const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`

export default {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, buildPrettierCommand],
  '*.{json,css,html,md,mdx}': [buildPrettierCommand],
}
