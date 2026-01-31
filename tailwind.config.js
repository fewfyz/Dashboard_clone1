/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Apple System Colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#007aff', // iOS Blue
          600: '#0056b3',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Teal Theme
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00b4b4', // Brand Color
          600: '#009999',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Apple Gray Scale
        gray: {
          50: '#f5f5f7',
          100: '#e8e8ed',
          200: '#d2d2d7',
          300: '#aeaeb2',
          400: '#8e8e93',
          500: '#636366',
          600: '#48484a',
          700: '#3a3a3c',
          800: '#2c2c2e',
          900: '#1c1c1e',
        },
        // Semantic Colors
        success: '#34c759',
        warning: '#ff9500',
        error: '#ff3b30',
        // Dashboard specific
        dashboard: {
          bg: '#c5e8e8',
          card: '#ffffff',
          sidebar: 'rgba(255, 255, 255, 0.72)',
          accent: '#00b4b4',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Helvetica Neue',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        // Apple Typography Scale
        'xs': ['11px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'sm': ['13px', { lineHeight: '1.4', letterSpacing: '0' }],
        'base': ['15px', { lineHeight: '1.5', letterSpacing: '0' }],
        'lg': ['17px', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'xl': ['20px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        '2xl': ['24px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '3xl': ['28px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '4xl': ['34px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '5xl': ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'xl': '0 12px 40px rgba(0, 0, 0, 0.16)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'button': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.12)',
      },
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
    screens: {
      // Apple Device Breakpoints
      'xs': '320px',     // iPhone SE
      'sm': '375px',     // iPhone 13/14/15
      'md': '430px',     // iPhone Pro Max
      'lg': '768px',     // iPad mini/Air
      'xl': '1024px',    // iPad Pro
      '2xl': '1366px',   // MacBook Air
      '3xl': '1920px',   // iMac / Studio Display
    },
  },
  plugins: [],
}
