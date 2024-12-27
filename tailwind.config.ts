import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: [
    { pattern: /bg-(red|green|yellow|orange)-(100|200|300|400|500)/ },
    // Add other dynamic class patterns
  ],
  theme: {
    extend: {}
  },

  plugins: []
} satisfies Config;
