/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    darkMode: "class", // para toggle dark
    theme: { extend: {} },
    plugins: [],
    extend: {
        colors: {
            btc: {
            400: '#ffcc00',
            500: '#f7931a',
            600: '#e67e00',
            }
        }
    }
};

