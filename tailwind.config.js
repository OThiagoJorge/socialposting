/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@aws-amplify/ui-react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
        colors: {
          marrs: '#0A7E8C'
        },
      },
    },  
  plugins: [],
}