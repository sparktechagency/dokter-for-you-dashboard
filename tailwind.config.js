/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#2884FF',
                gray: '#4E4E4E',
                title: '#222222',
            },
        },
    },
    plugins: [],
};
