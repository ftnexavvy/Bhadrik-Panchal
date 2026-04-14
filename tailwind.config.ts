import type { Config } from "tailwindcss";

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                'mobile': '320px',
                'sm': '640px',
                'md': '768px',
                'lg': '1025px',
                'xl': '1280px',
                '2xl': '1536px',
                '4xl': '2048px',
                // Special handling for small laptop viewports (e.g. 1280x720 with UI)
                'h720': { 'raw': '(max-height: 750px) and (min-width: 1024px)' },
            },
            fontSize: {
                '10xl': '10rem',
                '11xl': '12rem',
                '12xl': '14rem',
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                dm: ["var(--font-dm)", "sans-serif"],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
} satisfies Config;
