import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        background: "#FFFFFF",
        foreground: "#111827", // gray-900
        primary: "#3B82F6",    // blue-500
        secondary: "#10B981",  // emerald-500
        accent: "#F59E0B",     // amber-500
        muted: "#F3F4F6",      // gray-100
        border: "#E5E7EB",     // gray-200
      },
      boxShadow: {
        sm: 'none',
        DEFAULT: 'none',
        md: 'none',
        lg: 'none',
        xl: 'none',
        '2xl': 'none',
        inner: 'none',
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        flatlight: {
          "primary": "#3B82F6",
          "secondary": "#10B981",
          "accent": "#F59E0B",
          "neutral": "#111827",
          "base-100": "#ffffff",
          "base-200": "#f3f4f6", // Muted
          "base-300": "#e5e7eb", // Border
        }
      }
    ]
  }
};
export default config;
