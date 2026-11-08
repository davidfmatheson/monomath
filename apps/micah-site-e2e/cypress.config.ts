import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      ciWebServerCommand: 'npx nx run micah-site:serve-static',
      webServerCommands: {
        default: 'npx nx run micah-site:serve:development',
        production: 'npx nx run micah-site:serve:production',
        ci: 'npx nx run micah-site:serve-static',
      },
      cypressDir: 'src',
    }),
    baseUrl: 'http://localhost:4200',
    // Please ensure you use `cy.origin()` when navigating between domains and remove this option.
    // See https://docs.cypress.io/app/references/migration-guide#Changes-to-cyorigin
    injectDocumentDomain: true,
  },
});
