import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        shakespeare: {
          50: '#ebfdff',
          100: '#cef9ff',
          200: '#a2f1ff',
          300: '#63e4fd',
          400: '#1ccdf4',
          500: '#00beeb',
          600: '#038cb7',
          700: '#0a7094',
          800: '#125a78',
          900: '#144b65',
          950: '#063146',
        },
      },
    },
  },
}
