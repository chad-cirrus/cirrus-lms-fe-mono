import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'sidebar',
  exposes: {
    './Component': 'apps/ctc-admin/remotes/sidebar/src/app/remote-entry/entry.component.ts'
  },
};

export default config;
