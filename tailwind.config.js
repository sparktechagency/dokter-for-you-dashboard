/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#1854f9',
                secondary: '#11D279',
                gray: '#4E4E4E',
                title: '#222222',
            },
        },
    },
    plugins: [],
};
