export const SIZES = {
  s: 's',
  m: 'm',
  l: 'l',
} as const

export const COLORS = {
  default: 'default',
  muted: 'muted',
  accent: 'accent',
  highlight: 'highlight',
} as const

export const VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
} as const

export type Size = (typeof SIZES)[keyof typeof SIZES]
export type Color = (typeof COLORS)[keyof typeof COLORS]
export type Variant = (typeof VARIANTS)[keyof typeof VARIANTS]
