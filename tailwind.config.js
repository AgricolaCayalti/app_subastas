export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            'short': { 'raw': '(max-height: 740px)' },
            // ... otros breakpoints si los tienes
        },
        extend: {
            colors: {
                primary: '#tu-color-primary',
                terciary: '#tu-color-terciary',
                // white y gray ya vienen en Tailwind por defecto
            },
            backgroundImage: {
                'login-bg': "url('/background-login.png')",
            },
        },
    },
    plugins: [],
}