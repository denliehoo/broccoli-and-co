import { defineConfig } from 'cypress';

// https://nextjs.org/docs/pages/building-your-application/testing/cypress
export default defineConfig({
  e2e: {
    setupNodeEvents() {},
    supportFile: false,
  },
});
