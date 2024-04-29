import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'header',
  exposes: {
    './Component': 'apps/ctc-admin/remotes/header/src/app/remote-entry/entry.component.ts'
  },
};

export default config;
