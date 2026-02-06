/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#dca72e",
                "primary-hover": "#eec04b",
                "background-light": "#f8f7f6",
                "background-dark": "#211c12",
                "card-dark": "#2a2418",
                "text-muted": "#9ca3af",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"],
                "sans": ["Manrope", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "full": "9999px"
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #dca72e 0%, #f3d178 50%, #dca72e 100%)',
                'card-gradient': 'radial-gradient(circle at center top, rgba(69, 60, 38, 0.4) 0%, rgba(33, 28, 18, 0) 70%)',
            }
        },
    },
    plugins: [],
}
