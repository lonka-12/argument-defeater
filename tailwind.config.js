// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'move-and-scale': {
          '0%': {
            top: '50%',
            transform: 'translate(-50%, -50%) scale(0.75)',
          },
          '100%': {
            top: '90%',
            transform: 'translate(-50%, 0%) scale(1)',
          },
        },
      },
      animation: {
        'move-and-scale': 'move-and-scale 0.8s ease-out forwards',
      },
    },
  },
}