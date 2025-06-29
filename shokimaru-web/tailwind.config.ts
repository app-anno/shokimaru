import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 翔葵丸のブランドカラー - 洗練された海のデザイン
        primary: {
          DEFAULT: '#4a8db5', // メインカラー（落ち着いた青緑）
          50: '#f0f7fb',
          100: '#dae9f3',
          200: '#b9d4e8',
          300: '#89b6d8',
          400: '#5194c0',
          500: '#4a8db5',
          600: '#3c7399',
          700: '#345e7d',
          800: '#304f67',
          900: '#2b4357',
        },
        secondary: {
          DEFAULT: '#64acc8', // 明るい青緑
          50: '#f2f9fc',
          100: '#e2f1f7',
          200: '#c9e4f0',
          300: '#a3d0e4',
          400: '#76b6d4',
          500: '#64acc8',
          600: '#4889a9',
          700: '#3f708c',
          800: '#385d73',
          900: '#324e60',
        },
        accent: {
          DEFAULT: '#ff8c42', // 夕焼けオレンジ
          light: '#ffaa6b',
          dark: '#e66d1f',
        },
        ocean: {
          DEFAULT: '#2e5f7a', // 深海ブルー
          light: '#5a8fb0',
          dark: '#1a3d52',
        },
        gray: {
          50: '#f8fafb',
          100: '#f1f5f7',
          200: '#e5eaed',
          300: '#d1d9de',
          400: '#a8b5bd',
          500: '#7e8f99',
          600: '#5e6d77',
          700: '#49555d',
          800: '#3a434a',
          900: '#2e353a',
        },
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        background: '#f8fafb',
        foreground: '#1e2936',
      },
      fontFamily: {
        sans: ["Noto Sans JP", "sans-serif"],
      },
      animation: {
        'slide-in-up': 'slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-down': 'slideInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'zoom-in': 'zoomIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'flip-y': 'flipY 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        flipY: {
          '0%': { transform: 'perspective(1000px) rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'perspective(1000px) rotateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;