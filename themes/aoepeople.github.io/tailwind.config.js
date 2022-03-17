module.exports = {
  content: ["../../public/**/*.html"],
  theme: {
    extend: {
      borderRadius: {
        button: '36px',
        card: '8px'
      },
      colors: {
        // button-primary
        'aoe-orange': '#ff890e', // buttons
        'aoe-orange-highlight': '#ff9528', // button hover
        'aoe-orange-muted': '#d06a00', // button shade

        // button-secondary
        'aoe-dark-blue': '#173d7a', // buttons, headlines
        'aoe-dark-blue-highlight': '#1c4a94', // button hover
        'aoe-dark-blue-muted': '#0F284F', // button shade

        'aoe-light-blue': '#029df7', // text links and highlights

        'aoe-gray-light': '#f1f5f9', // section background
        'aoe-gray': '#e1e8ee', // section background
        'aoe-gray-medium': '#b4c1ce',
        'aoe-gray-dark': '#575757' // default text color
      },
      backgroundColor: {
        'aoe-dark-blue': '#173d7a', // buttons, headlines
      },
      borderColor: {
        'aoe-passive': 'rgb(23, 61, 122 / 30% )',
        'aoe-active': '#173d7a',
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      boxShadow: {
        section: 'linear-gradient(180deg,rgba(226,230,233,.51),rgba(226,230,233,0) 94.46%)',
        card: '0 4px 0 hsl(0deg 0% 100% / 46%), 0 15px 35px rgb(216 225 233 / 80%)',
        header: '0 15px 35px rgb(185 199 210 / 40%)',
        'button-primary': '0 3px #d06a00',
        'button-secondary': '0 3px #0f284f'
      },
      stroke: {
        'aoe-dark-blue': '#173d7a'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
