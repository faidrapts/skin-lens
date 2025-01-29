// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",  // Paths to your files where Tailwind CSS will be used
    ],
    theme: {
      extend: {
        colors: {
          // Add custom colors if needed
          customBlue: '#1e40af',
          customGray: '#f4f4f4',
        },
        spacing: {
          // Customize spacing (margins, padding, etc.)
          128: '32rem',  // Adds custom spacing like `mt-128`, `px-128`
        },
      },
    },
    plugins: [
      // Add Tailwind plugins if needed, for example for forms or typography
    ],
  }
  