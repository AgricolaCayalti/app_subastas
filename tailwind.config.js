export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            'short': { 'raw': '(max-height: 740px)' },
        },
        extend: {
            colors: {
                /* primary: '#183A21',      // Tu color primario
                terciary: '#BF5708',    // Tu color terciario
                // El resto de colores ya están en Tailwind por defecto
                // Pero puedes agregar los tuyos si quieres:
                secondary: '#018737',
                gray: '#757575',
                lighgray: '#E6E6E6',
                extra: '#624012',
                semiblack: '#2A2D3A',
                error: '#ff0000',
                lighterror: '#ffc8c8', */
            },
            backgroundImage: {
                /* 'login-bg': "url('/background-login.png')",
                'main-bg': "url('/background-main.png')",
                'modal-bg': "url('/background-option2.png')", */
            },
        },
    },
    plugins: [
        require('tailwindcss-safe-area'), // <-- Añade esta línea
    ],
}