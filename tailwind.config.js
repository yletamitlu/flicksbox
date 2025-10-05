export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        quincy: ['Quincy CF', 'sans-serif'],
      },
      fontSize: {
        xxs: ['12px', '18px'],
        xs: ['14px', '21px'],
        s: ['16px', '24px'],
        m: ['18px', '27px'],
        l: ['20px', '30px'],
        xl: ['32px', '36px'],
        xxl: ['40px', '54px'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        l: '54px',
        m: '30px',
        s: '24px',
        xs: '21px',
      },
      borderWidth: {
        s: '1px',
        m: '2px',
      },
      borderRadius: {
        xs: '8px',
        small: '12px',
        m: '16px',
        ml: '20px',
        lg: '24px',
      },
      boxShadow: {
        coloured: '0px 4px 8px 0px rgba(86, 125, 244, 0.3)',
        black: '0px 4px 10px 0px rgba(0, 0, 0, 0.13)',
      },
      spacing: {
        xxxs: '4px',
        xxs: '8px',
        xs: '12px',
        s: '16px',
        m: '24px',
        l: '32px',
        xl: '40px',
        xxl: '64px',
        xxxl: '80px',
      },
      keyframes: {
        skeleton: {
          from: {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        skeleton: 'skeleton 2s ease-in-out infinite',
      },
      colors: {
        theme: {
          bg: 'var(--theme-bg)',
          text: 'var(--theme-text)',
          card: 'var(--theme-card)',
          accent: 'var(--theme-accent)',
          secondary: 'var(--theme-secondary)',
          muted: 'var(--theme-muted)',
          highlight: 'var(--theme-highlight)',
        },
      },
    },
  },
  plugins: [],
}
